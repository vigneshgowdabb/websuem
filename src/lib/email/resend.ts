import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is not set. Email functionality will be disabled.')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@websuem.com'
export const FROM_NAME = process.env.FROM_NAME || 'Websuem'

export interface SendEmailOptions {
  to: string
  toName?: string
  subject: string
  html: string
  text?: string
  replyTo?: string
}

export async function sendEmail(options: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    console.log('Email would be sent:', options)
    return { id: 'mock-id', error: null }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: options.toName ? `${options.toName} <${options.to}>` : options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    })

    if (error) {
      console.error('Resend error:', error)
      return { id: null, error: error.message }
    }

    return { id: data?.id, error: null }
  } catch (err) {
    console.error('Failed to send email:', err)
    return { id: null, error: 'Failed to send email' }
  }
}
