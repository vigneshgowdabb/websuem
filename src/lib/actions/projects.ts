'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ProjectInput, ProjectUpdate, ProjectFilter } from '@/lib/validations/project'
import { projectSchema, projectUpdateSchema } from '@/lib/validations/project'
import type { Project } from '@/types/database'

export async function getProjects(filters?: Partial<ProjectFilter>) {
  const supabase = await createClient()

  let query = supabase.from('projects').select('*, client:clients(*)', { count: 'exact' })

  // Apply client filter
  if (filters?.client_id) {
    query = query.eq('client_id', filters.client_id)
  }

  // Apply status filter
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  // Apply service type filter
  if (filters?.service_type) {
    query = query.eq('service_type', filters.service_type)
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
    data: data as Project[],
    count: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function getProject(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*, client:clients(*)')
    .eq('id', id)
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  return { data: data as Project }
}

export async function createProject(input: ProjectInput) {
  const supabase = await createClient()

  const parsed = projectSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { data, error } = await supabase
    .from('projects')
    .insert(parsed.data)
    .select('*, client:clients(*)')
    .single()

  if (error) {
    return { error: error.message }
  }

  // Update client revenue if project has value
  if (data.value && data.status === 'completed') {
    await updateClientRevenueFromProject(data.client_id, data.value)
  }

  revalidatePath(`/dashboard/clients/${data.client_id}`)
  return { data: data as Project }
}

export async function updateProject(input: ProjectUpdate) {
  const supabase = await createClient()

  const parsed = projectUpdateSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { id, ...updateData } = parsed.data

  // Get old project to check status change
  const { data: oldProject } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  const { data, error } = await supabase
    .from('projects')
    .update(updateData)
    .eq('id', id)
    .select('*, client:clients(*)')
    .single()

  if (error) {
    return { error: error.message }
  }

  // Update client revenue if project is newly completed
  if (
    data.value &&
    data.status === 'completed' &&
    oldProject?.status !== 'completed'
  ) {
    await updateClientRevenueFromProject(data.client_id, data.value)
  }

  revalidatePath(`/dashboard/clients/${data.client_id}`)
  return { data: data as Project }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()

  // Get project to know which client to revalidate
  const { data: project } = await supabase
    .from('projects')
    .select('client_id')
    .eq('id', id)
    .single()

  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  if (project?.client_id) {
    revalidatePath(`/dashboard/clients/${project.client_id}`)
  }
  return { success: true }
}

export async function getProjectStats() {
  const supabase = await createClient()

  const { data, error } = await supabase.from('projects').select('status, value')

  if (error) {
    return { error: error.message }
  }

  const stats = {
    total: data.length,
    planning: data.filter((p) => p.status === 'planning').length,
    inProgress: data.filter((p) => p.status === 'in_progress').length,
    review: data.filter((p) => p.status === 'review').length,
    completed: data.filter((p) => p.status === 'completed').length,
    cancelled: data.filter((p) => p.status === 'cancelled').length,
    totalValue: data.reduce((sum, p) => sum + (p.value || 0), 0),
    completedValue: data
      .filter((p) => p.status === 'completed')
      .reduce((sum, p) => sum + (p.value || 0), 0),
  }

  return { data: stats }
}

async function updateClientRevenueFromProject(clientId: string, amount: number) {
  const supabase = await createClient()

  const { data: client } = await supabase
    .from('clients')
    .select('total_revenue')
    .eq('id', clientId)
    .single()

  if (client) {
    await supabase
      .from('clients')
      .update({ total_revenue: (client.total_revenue || 0) + amount })
      .eq('id', clientId)
  }
}
