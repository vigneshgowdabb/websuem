import { z } from 'zod'

export const emailStatusSchema = z.enum([
  'pending',
  'sent',
  'delivered',
  'opened',
  'clicked',
  'bounced',
  'failed',
])

export const emailTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Body is required'),
  variables: z.array(z.string()),
  category: z.string(),
  is_active: z.boolean(),
})

export const emailTemplateUpdateSchema = emailTemplateSchema.partial().extend({
  id: z.string().uuid(),
})

export const sendEmailSchema = z.object({
  to: z.string().email('Invalid email address'),
  toName: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Body is required'),
  lead_id: z.string().uuid().optional(),
  client_id: z.string().uuid().optional(),
  template_id: z.string().uuid().optional(),
})

export const sendTemplatedEmailSchema = z.object({
  template_id: z.string().uuid('Invalid template ID'),
  to: z.string().email('Invalid email address'),
  toName: z.string().optional(),
  variables: z.record(z.string(), z.string()).default({}),
  lead_id: z.string().uuid().optional(),
  client_id: z.string().uuid().optional(),
})

export const emailLogFilterSchema = z.object({
  search: z.string().optional(),
  status: emailStatusSchema.optional(),
  lead_id: z.string().uuid().optional(),
  client_id: z.string().uuid().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  sortBy: z.enum(['created_at', 'sent_at', 'recipient_email']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.number().default(1),
  limit: z.number().default(20),
})

export type EmailTemplateInput = z.infer<typeof emailTemplateSchema>
export type EmailTemplateUpdate = z.infer<typeof emailTemplateUpdateSchema>
export type SendEmailInput = z.infer<typeof sendEmailSchema>
export type SendTemplatedEmailInput = z.infer<typeof sendTemplatedEmailSchema>
export type EmailLogFilter = z.infer<typeof emailLogFilterSchema>
