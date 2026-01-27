import { z } from 'zod'

export const leadStatusSchema = z.enum([
  'new',
  'contacted',
  'qualified',
  'proposal',
  'won',
  'lost',
])

export const serviceTypeSchema = z.enum([
  'website',
  'social',
  'automation',
  'branding',
  'multiple',
  'other',
])

export const leadSourceSchema = z.enum([
  'website',
  'referral',
  'social',
  'search',
  'other',
])

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  service_interested: serviceTypeSchema.optional(),
  message: z.string().optional(),
  source: leadSourceSchema,
  status: leadStatusSchema,
  notes: z.string().optional(),
})

export const leadUpdateSchema = leadSchema.partial().extend({
  id: z.string().uuid(),
})

export const leadFilterSchema = z.object({
  search: z.string().optional(),
  status: leadStatusSchema.optional(),
  source: leadSourceSchema.optional(),
  service: serviceTypeSchema.optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  sortBy: z.enum(['created_at', 'name', 'company', 'status']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.number().default(1),
  limit: z.number().default(20),
})

export type LeadInput = z.infer<typeof leadSchema>
export type LeadUpdate = z.infer<typeof leadUpdateSchema>
export type LeadFilter = z.infer<typeof leadFilterSchema>
