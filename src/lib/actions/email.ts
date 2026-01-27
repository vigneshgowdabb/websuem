'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { sendEmail as sendResendEmail } from '@/lib/email/resend'
import { interpolateTemplate, wrapInEmailLayout } from '@/lib/email/templates'
import type {
  SendEmailInput,
  SendTemplatedEmailInput,
  EmailTemplateInput,
  EmailTemplateUpdate,
  EmailLogFilter,
} from '@/lib/validations/email'
import {
  sendEmailSchema,
  sendTemplatedEmailSchema,
  emailTemplateSchema,
  emailTemplateUpdateSchema,
} from '@/lib/validations/email'

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  variables: string[]
  category: string
  is_active: boolean
  created_by?: string
  created_at: string
  updated_at: string
}

export interface EmailLog {
  id: string
  lead_id?: string
  client_id?: string
  template_id?: string
  sent_by?: string
  recipient_email: string
  recipient_name?: string
  subject: string
  body: string
  status: string
  resend_id?: string
  metadata?: Record<string, unknown>
  sent_at?: string
  opened_at?: string
  clicked_at?: string
  created_at: string
}

export async function sendEmail(input: SendEmailInput) {
  const supabase = await createClient()

  const parsed = sendEmailSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { to, toName, subject, body, lead_id, client_id, template_id } = parsed.data
  const wrappedBody = wrapInEmailLayout(body)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Create email log entry
  const { data: emailLog, error: logError } = await supabase
    .from('email_logs')
    .insert({
      lead_id,
      client_id,
      template_id,
      sent_by: user?.id || null,
      recipient_email: to,
      recipient_name: toName,
      subject,
      body: wrappedBody,
      status: 'pending',
    })
    .select()
    .single()

  if (logError) {
    return { error: logError.message }
  }

  // Send via Resend
  const { id: resendId, error: sendError } = await sendResendEmail({
    to,
    toName,
    subject,
    html: wrappedBody,
  })

  // Update log with result
  if (sendError) {
    await supabase
      .from('email_logs')
      .update({ status: 'failed', metadata: { error: sendError } })
      .eq('id', emailLog.id)
    return { error: sendError }
  }

  await supabase
    .from('email_logs')
    .update({
      status: 'sent',
      resend_id: resendId,
      sent_at: new Date().toISOString(),
    })
    .eq('id', emailLog.id)

  // Log activity if lead is linked
  if (lead_id) {
    await supabase.from('lead_activities').insert({
      lead_id,
      user_id: user?.id || null,
      action: 'email_sent',
      details: { emailId: emailLog.id, subject },
    })
  }

  revalidatePath('/dashboard/email')
  if (lead_id) revalidatePath(`/dashboard/leads/${lead_id}`)
  if (client_id) revalidatePath(`/dashboard/clients/${client_id}`)

  return { data: emailLog as EmailLog }
}

export async function sendTemplatedEmail(input: SendTemplatedEmailInput) {
  const supabase = await createClient()

  const parsed = sendTemplatedEmailSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { template_id, to, toName, variables, lead_id, client_id } = parsed.data

  // Fetch template
  const { data: template, error: templateError } = await supabase
    .from('email_templates')
    .select('*')
    .eq('id', template_id)
    .single()

  if (templateError || !template) {
    return { error: 'Template not found' }
  }

  // Interpolate variables
  const subject = interpolateTemplate(template.subject, variables)
  const body = interpolateTemplate(template.body, variables)

  // Send using the regular send function
  return sendEmail({
    to,
    toName,
    subject,
    body,
    lead_id,
    client_id,
    template_id,
  })
}

export async function getEmailTemplates(activeOnly = false) {
  const supabase = await createClient()

  let query = supabase.from('email_templates').select('*').order('name')

  if (activeOnly) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query

  if (error) {
    return { error: error.message, data: null }
  }

  return { data: data as EmailTemplate[] }
}

export async function getEmailTemplate(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('email_templates')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  return { data: data as EmailTemplate }
}

export async function createEmailTemplate(input: EmailTemplateInput) {
  const supabase = await createClient()

  const parsed = emailTemplateSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('email_templates')
    .insert({
      ...parsed.data,
      created_by: user?.id || null,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/email/templates')
  return { data: data as EmailTemplate }
}

export async function updateEmailTemplate(input: EmailTemplateUpdate) {
  const supabase = await createClient()

  const parsed = emailTemplateUpdateSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { id, ...updateData } = parsed.data

  const { data, error } = await supabase
    .from('email_templates')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/email/templates')
  return { data: data as EmailTemplate }
}

export async function deleteEmailTemplate(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('email_templates').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/email/templates')
  return { success: true }
}

export async function getEmailLogs(filters?: Partial<EmailLogFilter>) {
  const supabase = await createClient()

  let query = supabase.from('email_logs').select('*', { count: 'exact' })

  // Apply search filter
  if (filters?.search) {
    query = query.or(
      `recipient_email.ilike.%${filters.search}%,recipient_name.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`
    )
  }

  // Apply status filter
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  // Apply lead filter
  if (filters?.lead_id) {
    query = query.eq('lead_id', filters.lead_id)
  }

  // Apply client filter
  if (filters?.client_id) {
    query = query.eq('client_id', filters.client_id)
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
    data: data as EmailLog[],
    count: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function getEmailStats() {
  const supabase = await createClient()

  const { data, error } = await supabase.from('email_logs').select('status')

  if (error) {
    return { error: error.message }
  }

  const stats = {
    total: data.length,
    sent: data.filter((e) => e.status === 'sent').length,
    delivered: data.filter((e) => e.status === 'delivered').length,
    opened: data.filter((e) => e.status === 'opened').length,
    clicked: data.filter((e) => e.status === 'clicked').length,
    bounced: data.filter((e) => e.status === 'bounced').length,
    failed: data.filter((e) => e.status === 'failed').length,
  }

  return { data: stats }
}
