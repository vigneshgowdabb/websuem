// Cal.com Configuration

export const CALCOM_USERNAME = process.env.NEXT_PUBLIC_CALCOM_USERNAME || ''
export const CALCOM_API_KEY = process.env.CALCOM_API_KEY || ''

// Default event types
export const eventTypes = {
  discovery: '30min',
  proposal: '45min',
  followup: '15min',
}

// Build Cal.com embed URL
export function getCalUrl(eventType?: string) {
  const baseUrl = `https://cal.com/${CALCOM_USERNAME}`
  if (eventType) {
    return `${baseUrl}/${eventType}`
  }
  return baseUrl
}

// Build prefilled URL with attendee info
export function getPrefilledCalUrl(
  eventType: string,
  attendee?: {
    name?: string
    email?: string
    notes?: string
  }
) {
  const url = new URL(getCalUrl(eventType))

  if (attendee?.name) {
    url.searchParams.set('name', attendee.name)
  }
  if (attendee?.email) {
    url.searchParams.set('email', attendee.email)
  }
  if (attendee?.notes) {
    url.searchParams.set('notes', attendee.notes)
  }

  return url.toString()
}

// Cal.com API client for fetching bookings
export async function fetchCalComBookings() {
  if (!CALCOM_API_KEY) {
    console.warn('CALCOM_API_KEY not set')
    return []
  }

  try {
    const response = await fetch('https://api.cal.com/v1/bookings', {
      headers: {
        Authorization: `Bearer ${CALCOM_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Cal.com bookings')
    }

    const data = await response.json()
    return data.bookings || []
  } catch (error) {
    console.error('Cal.com API error:', error)
    return []
  }
}
