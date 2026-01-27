'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type NoteType = 'note' | 'call' | 'email' | 'meeting' | 'task'

export interface LeadNote {
  id: string
  lead_id: string
  user_id?: string
  content: string
  type: NoteType
  created_at: string
  updated_at: string
}

export interface LeadActivity {
  id: string
  lead_id: string
  user_id?: string
  action: string
  details: Record<string, unknown>
  created_at: string
}

export async function addLeadNote(
  leadId: string,
  content: string,
  type: NoteType = 'note'
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('lead_notes')
    .insert({
      lead_id: leadId,
      user_id: user?.id || null,
      content,
      type,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Log the activity
  await logActivity(leadId, `${type}_added`, { noteId: data.id, type })

  revalidatePath(`/dashboard/leads/${leadId}`)
  return { data: data as LeadNote }
}

export async function updateLeadNote(
  noteId: string,
  content: string
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('lead_notes')
    .update({ content })
    .eq('id', noteId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/dashboard/leads/${data.lead_id}`)
  return { data: data as LeadNote }
}

export async function deleteLeadNote(noteId: string, leadId: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('lead_notes').delete().eq('id', noteId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/dashboard/leads/${leadId}`)
  return { success: true }
}

export async function getLeadNotes(leadId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('lead_notes')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) {
    return { error: error.message, data: null }
  }

  return { data: data as LeadNote[] }
}

export async function logActivity(
  leadId: string,
  action: string,
  details: Record<string, unknown> = {}
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase.from('lead_activities').insert({
    lead_id: leadId,
    user_id: user?.id || null,
    action,
    details,
  })

  if (error) {
    console.error('Failed to log activity:', error)
  }
}

export async function getLeadActivities(leadId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('lead_activities')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) {
    return { error: error.message, data: null }
  }

  return { data: data as LeadActivity[] }
}

export async function getActivityTimeline(leadId: string) {
  const supabase = await createClient()

  // Get notes
  const { data: notes } = await supabase
    .from('lead_notes')
    .select('*')
    .eq('lead_id', leadId)

  // Get activities
  const { data: activities } = await supabase
    .from('lead_activities')
    .select('*')
    .eq('lead_id', leadId)

  // Combine and sort by date
  const timeline = [
    ...(notes || []).map((n) => ({
      id: n.id,
      type: 'note' as const,
      subtype: n.type,
      content: n.content,
      created_at: n.created_at,
      user_id: n.user_id,
    })),
    ...(activities || []).map((a) => ({
      id: a.id,
      type: 'activity' as const,
      subtype: a.action,
      content: null,
      details: a.details,
      created_at: a.created_at,
      user_id: a.user_id,
    })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return { data: timeline }
}
