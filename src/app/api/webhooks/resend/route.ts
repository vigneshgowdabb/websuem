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

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  try {
    const body = await request.text()
    const signature = request.headers.get('svix-signature') || ''

    // Verify webhook signature if secret is configured
    if (process.env.RESEND_WEBHOOK_SECRET) {
      const isValid = verifyWebhookSignature(
        body,
        signature,
        process.env.RESEND_WEBHOOK_SECRET
      )

      if (!isValid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const event = JSON.parse(body)
    const { type, data } = event

    // Map Resend event types to our status
    const statusMap: Record<string, string> = {
      'email.sent': 'sent',
      'email.delivered': 'delivered',
      'email.opened': 'opened',
      'email.clicked': 'clicked',
      'email.bounced': 'bounced',
      'email.complained': 'failed',
    }

    const newStatus = statusMap[type]
    if (!newStatus) {
      return NextResponse.json({ message: 'Event type not handled' })
    }

    // Update email log by resend_id
    const emailId = data.email_id
    if (emailId) {
      const updateData: Record<string, unknown> = { status: newStatus }

      if (type === 'email.opened') {
        updateData.opened_at = new Date().toISOString()
      }
      if (type === 'email.clicked') {
        updateData.clicked_at = new Date().toISOString()
      }

      await supabase
        .from('email_logs')
        .update(updateData)
        .eq('resend_id', emailId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
