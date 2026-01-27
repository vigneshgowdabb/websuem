'use server'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ClientInput, ClientUpdate, ClientFilter } from '@/lib/validations/client'
import { clientSchema, clientUpdateSchema } from '@/lib/validations/client'
import type { Client, Project } from '@/types/database'

export async function getClients(filters?: Partial<ClientFilter>) {
  const supabase = await createSupabaseClient()

  let query = supabase.from('clients').select('*', { count: 'exact' })

  // Apply search filter
  if (filters?.search) {
    query = query.or(
      `company_name.ilike.%${filters.search}%,contact_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
    )
  }

  // Apply status filter
  if (filters?.status) {
    query = query.eq('status', filters.status)
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
    data: data as Client[],
    count: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function getClient(id: string) {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  return { data: data as Client }
}

export async function getClientWithProjects(id: string) {
  const supabase = await createSupabaseClient()

  // Get client
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (clientError) {
    return { error: clientError.message, data: null }
  }

  // Get projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', id)
    .order('created_at', { ascending: false })

  // Get email logs
  const { data: emails } = await supabase
    .from('email_logs')
    .select('*')
    .eq('client_id', id)
    .order('created_at', { ascending: false })

  // Get related lead if exists
  let lead = null
  if (client.lead_id) {
    const { data: leadData } = await supabase
      .from('leads')
      .select('*')
      .eq('id', client.lead_id)
      .single()
    lead = leadData
  }

  return {
    data: {
      ...client,
      projects: (projects || []) as Project[],
      emails: emails || [],
      lead,
    },
  }
}

export async function createClient(input: ClientInput) {
  const supabase = await createSupabaseClient()

  const parsed = clientSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { data, error } = await supabase
    .from('clients')
    .insert(parsed.data)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/clients')
  revalidatePath('/dashboard')
  return { data: data as Client }
}

export async function updateClient(input: ClientUpdate) {
  const supabase = await createSupabaseClient()

  const parsed = clientUpdateSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { id, ...updateData } = parsed.data

  const { data, error } = await supabase
    .from('clients')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/clients')
  revalidatePath(`/dashboard/clients/${id}`)
  return { data: data as Client }
}

export async function deleteClient(id: string) {
  const supabase = await createSupabaseClient()

  const { error } = await supabase.from('clients').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/clients')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateClientRevenue(id: string, amount: number) {
  const supabase = await createSupabaseClient()

  // Get current revenue
  const { data: client, error: fetchError } = await supabase
    .from('clients')
    .select('total_revenue')
    .eq('id', id)
    .single()

  if (fetchError) {
    return { error: fetchError.message }
  }

  const newRevenue = (client.total_revenue || 0) + amount

  const { data, error } = await supabase
    .from('clients')
    .update({ total_revenue: newRevenue })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/clients')
  revalidatePath(`/dashboard/clients/${id}`)
  return { data: data as Client }
}

export async function getClientStats() {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase.from('clients').select('status, total_revenue')

  if (error) {
    return { error: error.message }
  }

  const stats = {
    total: data.length,
    active: data.filter((c) => c.status === 'active').length,
    completed: data.filter((c) => c.status === 'completed').length,
    inactive: data.filter((c) => c.status === 'inactive').length,
    totalRevenue: data.reduce((sum, c) => sum + (c.total_revenue || 0), 0),
  }

  return { data: stats }
}
