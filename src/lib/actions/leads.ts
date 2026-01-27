'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { LeadInput, LeadUpdate, LeadFilter } from '@/lib/validations/lead'
import { leadSchema, leadUpdateSchema } from '@/lib/validations/lead'
import type { Lead, LeadStatus } from '@/types/database'

export async function getLeads(filters?: Partial<LeadFilter>) {
  const supabase = await createClient()

  let query = supabase.from('leads').select('*', { count: 'exact' })

  // Apply search filter
  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`
    )
  }

  // Apply status filter
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  // Apply source filter
  if (filters?.source) {
    query = query.eq('source', filters.source)
  }

  // Apply service filter
  if (filters?.service) {
    query = query.eq('service_interested', filters.service)
  }

  // Apply date range filter
  if (filters?.dateFrom) {
    query = query.gte('created_at', filters.dateFrom)
  }
  if (filters?.dateTo) {
    query = query.lte('created_at', filters.dateTo)
  }

  // Apply sorting
  const sortBy = filters?.sortBy || 'created_at'
  const sortOrder = filters?.sortOrder || 'desc'
  query = query.order(sortBy, { ascending: sortOrder === 'asc' })

  // Apply pagination
  const page = filters?.page || 1
  const limit = filters?.limit || 20
  const offset = (page - 1) * limit
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    return { error: error.message, data: null, count: 0 }
  }

  return {
    data: data as Lead[],
    count: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function getLead(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  return { data: data as Lead }
}

export async function getLeadWithActivities(id: string) {
  const supabase = await createClient()

  // Get lead
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (leadError) {
    return { error: leadError.message, data: null }
  }

  // Get notes
  const { data: notes } = await supabase
    .from('lead_notes')
    .select('*')
    .eq('lead_id', id)
    .order('created_at', { ascending: false })

  // Get activities
  const { data: activities } = await supabase
    .from('lead_activities')
    .select('*')
    .eq('lead_id', id)
    .order('created_at', { ascending: false })

  // Get bookings
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .eq('lead_id', id)
    .order('datetime', { ascending: false })

  // Get emails
  const { data: emails } = await supabase
    .from('email_logs')
    .select('*')
    .eq('lead_id', id)
    .order('created_at', { ascending: false })

  return {
    data: {
      ...lead,
      notes: notes || [],
      activities: activities || [],
      bookings: bookings || [],
      emails: emails || [],
    },
  }
}

export async function createLead(input: LeadInput) {
  const supabase = await createClient()

  const parsed = leadSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { data, error } = await supabase
    .from('leads')
    .insert(parsed.data)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Log activity
  await logLeadActivity(data.id, 'lead_created', { lead: data })

  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard')
  return { data: data as Lead }
}

export async function updateLead(input: LeadUpdate) {
  const supabase = await createClient()

  const parsed = leadUpdateSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { id, ...updateData } = parsed.data

  const { data, error } = await supabase
    .from('leads')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Log activity
  await logLeadActivity(id, 'lead_updated', { changes: updateData })

  revalidatePath('/dashboard/leads')
  revalidatePath(`/dashboard/leads/${id}`)
  return { data: data as Lead }
}

export async function deleteLead(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('leads').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Log activity
  await logLeadActivity(id, 'status_changed', { newStatus: status })

  revalidatePath('/dashboard/leads')
  revalidatePath(`/dashboard/leads/${id}`)
  return { data: data as Lead }
}

export async function convertLeadToClient(
  leadId: string,
  clientData?: { company_name?: string; notes?: string }
) {
  const supabase = await createClient()

  // Get lead
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single()

  if (leadError || !lead) {
    return { error: 'Lead not found' }
  }

  // Create client from lead
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .insert({
      lead_id: leadId,
      company_name: clientData?.company_name || lead.company || lead.name,
      contact_name: lead.name,
      email: lead.email,
      phone: lead.phone,
      website: lead.website,
      notes: clientData?.notes || lead.notes,
      status: 'active',
    })
    .select()
    .single()

  if (clientError) {
    return { error: clientError.message }
  }

  // Update lead status to won
  await supabase.from('leads').update({ status: 'won' }).eq('id', leadId)

  // Log activity
  await logLeadActivity(leadId, 'converted_to_client', { clientId: client.id })

  revalidatePath('/dashboard/leads')
  revalidatePath('/dashboard/clients')
  revalidatePath(`/dashboard/leads/${leadId}`)
  return { data: client }
}

export async function getLeadStats() {
  const supabase = await createClient()

  const { data, error } = await supabase.from('leads').select('status')

  if (error) {
    return { error: error.message }
  }

  const stats = {
    total: data.length,
    new: data.filter((l) => l.status === 'new').length,
    contacted: data.filter((l) => l.status === 'contacted').length,
    qualified: data.filter((l) => l.status === 'qualified').length,
    proposal: data.filter((l) => l.status === 'proposal').length,
    won: data.filter((l) => l.status === 'won').length,
    lost: data.filter((l) => l.status === 'lost').length,
  }

  return { data: stats }
}

async function logLeadActivity(
  leadId: string,
  action: string,
  details: Record<string, unknown>
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  await supabase.from('lead_activities').insert({
    lead_id: leadId,
    user_id: user?.id || null,
    action,
    details,
  })
}
