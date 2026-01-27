import { z } from 'zod'
import { serviceTypeSchema } from './lead'

export const projectStatusSchema = z.enum([
  'planning',
  'in_progress',
  'review',
  'completed',
  'cancelled',
])

export const projectSchema = z.object({
  client_id: z.string().uuid('Invalid client ID'),
  name: z.string().min(1, 'Project name is required'),
  service_type: serviceTypeSchema.optional(),
  status: projectStatusSchema.default('planning'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  value: z.number().min(0).optional(),
  notes: z.string().optional(),
})

export const projectUpdateSchema = projectSchema.partial().extend({
  id: z.string().uuid(),
})

export const projectFilterSchema = z.object({
  client_id: z.string().uuid().optional(),
  status: projectStatusSchema.optional(),
  service_type: serviceTypeSchema.optional(),
  sortBy: z.enum(['created_at', 'name', 'value', 'start_date']).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.number().default(1),
  limit: z.number().default(20),
})

export type ProjectInput = z.infer<typeof projectSchema>
export type ProjectUpdate = z.infer<typeof projectUpdateSchema>
export type ProjectFilter = z.infer<typeof projectFilterSchema>
