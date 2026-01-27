// Email template helpers

export interface EmailTemplateVariables {
  [key: string]: string
}

export function interpolateTemplate(
  template: string,
  variables: EmailTemplateVariables
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match
  })
}

export function extractVariables(template: string): string[] {
  const matches = template.match(/\{\{(\w+)\}\}/g) || []
  return [...new Set(matches.map((m) => m.replace(/\{\{|\}\}/g, '')))]
}

// Pre-built email templates for common scenarios
export const defaultTemplates = {
  welcomeLead: {
    name: 'Welcome New Lead',
    subject: 'Thanks for reaching out, {{name}}!',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1A1235;">Hi {{name}},</h2>
        <p>Thank you for contacting Websuem! We received your inquiry about {{service}}.</p>
        <p>We'll review your request and get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our <a href="https://websuem.com/portfolio" style="color: #FFD84D;">portfolio</a> to see our recent work.</p>
        <p>Best regards,<br>The Websuem Team</p>
      </div>
    `,
    variables: ['name', 'service'],
    category: 'lead',
  },
  bookingConfirmation: {
    name: 'Booking Confirmation',
    subject: 'Your meeting is confirmed - {{date}}',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1A1235;">Hi {{name}},</h2>
        <p>Your <strong>{{type}}</strong> meeting has been confirmed!</p>
        <div style="background: #F5F0FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Date:</strong> {{date}}</p>
          <p style="margin: 0;"><strong>Time:</strong> {{time}}</p>
          <p style="margin: 0;"><strong>Duration:</strong> {{duration}} minutes</p>
        </div>
        <p>Join the meeting: <a href="{{meeting_link}}" style="color: #FFD84D;">{{meeting_link}}</a></p>
        <p>Looking forward to speaking with you!</p>
        <p>Best regards,<br>The Websuem Team</p>
      </div>
    `,
    variables: ['name', 'type', 'date', 'time', 'duration', 'meeting_link'],
    category: 'booking',
  },
  followUp: {
    name: 'Follow Up',
    subject: 'Following up on our conversation',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1A1235;">Hi {{name}},</h2>
        <p>I wanted to follow up on our recent conversation about {{topic}}.</p>
        <p>{{custom_message}}</p>
        <p>Please let me know if you have any questions or would like to schedule another call.</p>
        <p>Best regards,<br>The Websuem Team</p>
      </div>
    `,
    variables: ['name', 'topic', 'custom_message'],
    category: 'followup',
  },
  proposalSent: {
    name: 'Proposal Sent',
    subject: 'Your custom proposal from Websuem',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1A1235;">Hi {{name}},</h2>
        <p>Thank you for considering Websuem for your {{service}} project.</p>
        <p>Please find our proposal summary below:</p>
        <div style="background: #F5F0FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Project:</strong> {{service}}</p>
          <p style="margin: 0;"><strong>Timeline:</strong> {{timeline}}</p>
          <p style="margin: 0;"><strong>Investment:</strong> {{price}}</p>
        </div>
        <p>The detailed proposal has been attached to this email.</p>
        <p>Please don't hesitate to reach out if you have any questions!</p>
        <p>Best regards,<br>The Websuem Team</p>
      </div>
    `,
    variables: ['name', 'service', 'timeline', 'price'],
    category: 'proposal',
  },
}

// Wrapper function to get styled HTML email
export function wrapInEmailLayout(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color: #1A1235; padding: 24px; text-align: center;">
                  <span style="color: #FFD84D; font-size: 24px; font-weight: bold;">W</span>
                  <span style="color: white; font-size: 20px; font-weight: bold; margin-left: 8px;">Websuem</span>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding: 32px;">
                  ${content}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">
                    © ${new Date().getFullYear()} Websuem. All rights reserved.
                  </p>
                  <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px;">
                    <a href="https://websuem.com" style="color: #9ca3af;">websuem.com</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}
