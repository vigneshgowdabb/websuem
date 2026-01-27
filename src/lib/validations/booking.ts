import { z } from 'zod'

export const bookingTypeSchema = z.enum([
  'discovery',
  'proposal',
  'followup',
  'other',
])

export const bookingStatusSchema = z.enum([
  'scheduled',
  'completed',
  'cancelled',
  'no_show',
])

export const bookingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  lead_id: z.string().uuid().optional(),
  datetime: z.string().datetime('Invalid datetime'),
  duration_minutes: z.number().min(15).max(480).default(30),
  type: bookingTypeSchema.default('discovery'),
  status: bookingStatusSchema.default('scheduled'),
  meeting_link: z.string().url('Invalid URL').optional().or(z.literal('')),
  notes: z.string().optional(),
  attendee_name: z.string().optional(),
  attendee_email: z.string().email().optional().or(z.literal('')),
  cal_booking_id: z.string().optional(),
})

export const bookingUpdateSchema = bookingSchema.partial().extend({
  id: z.string().uuid(),
})

export const bookingFilterSchema = z.object({
  search: z.string().optional(),
  status: bookingStatusSchema.optional(),
  type: bookingTypeSchema.optional(),
  lead_id: z.string().uuid().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  sortBy: z.enum(['datetime', 'title', 'status']).default('datetime'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  page: z.number().default(1),
  limit: z.number().default(20),
})

export type BookingInput = z.infer<typeof bookingSchema>
export type BookingUpdate = z.infer<typeof bookingUpdateSchema>
export type BookingFilter = z.infer<typeof bookingFilterSchema>
