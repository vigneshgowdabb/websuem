import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

// Initialized inside handler

// Verify webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!secret) return true // Skip verification if no secret is set

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  } catch {
    return false
  }
}

interface CalComWebhookPayload {
  triggerEvent: string
  createdAt: string
  payload: {
    id: number
    uid: string
    title: string
    startTime: string
    endTime: string
    status: string
    attendees: Array<{
      name: string
      email: string
    }>
    organizer: {
      name: string
      email: string
    }
    eventType: {
      slug: string
      title: string
    }
    metadata?: Record<string, unknown>
    location?: string
  }
}

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  try {
    const body = await request.text()
    const signature = request.headers.get('x-cal-signature-256') || ''

    // Verify webhook signature if secret is configured
    if (process.env.CALCOM_WEBHOOK_SECRET) {
      const isValid = verifyWebhookSignature(
        body,
        signature,
        process.env.CALCOM_WEBHOOK_SECRET
      )

      if (!isValid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const event: CalComWebhookPayload = JSON.parse(body)
    const { triggerEvent, payload } = event

    console.log('Cal.com webhook received:', triggerEvent)

    switch (triggerEvent) {
      case 'BOOKING_CREATED': {
        // Check if booking already exists
        const { data: existing } = await supabase
          .from('bookings')
          .select('id')
          .eq('cal_booking_id', payload.uid)
          .single()

        if (existing) {
          return NextResponse.json({ message: 'Booking already exists' })
        }

        // Calculate duration in minutes
        const startTime = new Date(payload.startTime)
        const endTime = new Date(payload.endTime)
        const durationMinutes = Math.round(
          (endTime.getTime() - startTime.getTime()) / (1000 * 60)
        )

        // Get attendee info
        const attendee = payload.attendees?.[0]

        // Try to find matching lead by email
        let leadId = null
        if (attendee?.email) {
          const { data: lead } = await supabase
            .from('leads')
            .select('id')
            .eq('email', attendee.email)
            .single()
          leadId = lead?.id
        }

        // Map event type slug to booking type
        const typeMap: Record<string, string> = {
          '30min': 'discovery',
          '45min': 'proposal',
          '15min': 'followup',
          discovery: 'discovery',
          proposal: 'proposal',
          followup: 'followup',
        }
        const bookingType = typeMap[payload.eventType?.slug] || 'other'

        // Create booking record
        const { error } = await supabase.from('bookings').insert({
          cal_booking_id: payload.uid,
          lead_id: leadId,
          title: payload.title || payload.eventType?.title || 'Meeting',
          datetime: payload.startTime,
          duration_minutes: durationMinutes,
          type: bookingType,
          status: 'scheduled',
          meeting_link: payload.location,
          attendee_name: attendee?.name,
          attendee_email: attendee?.email,
          notes: payload.metadata ? JSON.stringify(payload.metadata) : null,
        })

        if (error) {
          console.error('Failed to create booking:', error)
          return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 }
          )
        }

        // Log activity if linked to a lead
        if (leadId) {
          await supabase.from('lead_activities').insert({
            lead_id: leadId,
            action: 'booking_created_via_calcom',
            details: {
              calBookingId: payload.uid,
              title: payload.title,
              datetime: payload.startTime,
            },
          })
        }

        break
      }

      case 'BOOKING_RESCHEDULED': {
        const startTime = new Date(payload.startTime)
        const endTime = new Date(payload.endTime)
        const durationMinutes = Math.round(
          (endTime.getTime() - startTime.getTime()) / (1000 * 60)
        )

        const { error } = await supabase
          .from('bookings')
          .update({
            datetime: payload.startTime,
            duration_minutes: durationMinutes,
            meeting_link: payload.location,
          })
          .eq('cal_booking_id', payload.uid)

        if (error) {
          console.error('Failed to update booking:', error)
        }

        break
      }

      case 'BOOKING_CANCELLED': {
        const { data: booking, error } = await supabase
          .from('bookings')
          .update({ status: 'cancelled' })
          .eq('cal_booking_id', payload.uid)
          .select('lead_id')
          .single()

        if (error) {
          console.error('Failed to cancel booking:', error)
        }

        // Log activity if linked to a lead
        if (booking?.lead_id) {
          await supabase.from('lead_activities').insert({
            lead_id: booking.lead_id,
            action: 'booking_cancelled_via_calcom',
            details: { calBookingId: payload.uid },
          })
        }

        break
      }

      default:
        console.log('Unhandled Cal.com event type:', triggerEvent)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cal.com webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
