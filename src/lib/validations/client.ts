import { z } from 'zod'

export const clientStatusSchema = z.enum(['active', 'completed', 'inactive'])

export const clientSchema = z.object({
  company_name: z.string().min(2, 'Company name must be at least 2 characters'),
  contact_name: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  address: z.string().optional(),
  status: clientStatusSchema,
  notes: z.string().optional(),
  lead_id: z.string().uuid().optional(),
})

export const clientUpdateSchema = clientSchema.partial().extend({
  id: z.string().uuid(),
})

export const clientFilterSchema = z.object({
  search: z.string().optional(),
  status: clientStatusSchema.optional(),
  sortBy: z.enum(['created_at', 'company_name', 'total_revenue']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.number().default(1),
  limit: z.number().default(20),
})

export type ClientInput = z.infer<typeof clientSchema>
export type ClientUpdate = z.infer<typeof clientUpdateSchema>
export type ClientFilter = z.infer<typeof clientFilterSchema>
