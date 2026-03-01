'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

// 1. Define Validation Schema (Zod)
const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  service_interest: z.enum(['Web Development', 'AI Automation', 'Brand Identity', 'Other']),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type LeadState = {
  success: boolean;
  message: string;
}

export async function createLead(prevState: LeadState | null, formData: FormData): Promise<LeadState> {
  // 2. Extract Data from FormData
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    service_interest: formData.get('service_interest'),
    message: formData.get('message'),
  }

  // 3. Validate Data
  const validatedFields = leadSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors.name?.[0] || 
               validatedFields.error.flatten().fieldErrors.email?.[0] || 
               validatedFields.error.flatten().fieldErrors.message?.[0] || 
               "Invalid form data",
    }
  }

  const { name, email, service_interest, message } = validatedFields.data

  try {
    const supabase = await createClient()

    // 4. Insert into Supabase 'leads' table
    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          name, 
          email, 
          service_interest, 
          message,
          status: 'new' // Initial status as defined in schema
        }
      ])

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, message: "Failed to submit request. Please try again." }
    }

    // 5. Trigger Claude Flow Lead Notification Swarm (simulated via shell)
    try {
      const { exec } = await import('child_process')
      const message = `[LEAD_ALERT] New prospect: ${name} (${email}) interested in ${service_interest}`
      exec(`npx @claude-flow/cli@v3alpha hive-mind notify --message "${message}" --priority high`)
    } catch (swarmErr) {
      console.error('Swarm notification failed:', swarmErr)
    }

    // 6. Real Email Notification via Resend
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'Websuem | New Lead <onboarding@resend.dev>', // Use your verified domain in production
        to: 'hello@websuem.com', 
        subject: `🚀 New Lead: ${name} (${service_interest})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #0A0A0A; color: #fff; border-radius: 12px;">
            <h2 style="color: #2563EB;">New Websuem Lead</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Interest:</strong> ${service_interest}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #111; padding: 15px; border-radius: 8px; border: 1px solid #333;">
              ${message}
            </div>
            <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">View this lead in the CRM: <a href="http://websuem.com/admin" style="color: #2563EB;">websuem.com/admin</a></p>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr)
    }

    // 7. Success
    return { success: true, message: "Your message has been received! We'll be in touch shortly." }

  } catch (err) {
    console.error('Submission error:', err)
    return { success: false, message: "An unexpected error occurred." }
  }
}
