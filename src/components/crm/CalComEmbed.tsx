'use client'

import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { CALCOM_USERNAME } from '@/lib/calcom/config'

interface CalComEmbedProps {
  eventType?: string
  prefill?: {
    name?: string
    email?: string
    notes?: string
  }
  onBookingSuccessful?: (event: unknown) => void
}

export function CalComEmbed({
  eventType = '30min',
  prefill,
  onBookingSuccessful,
}: CalComEmbedProps) {
  useEffect(() => {
    async function initCal() {
      const cal = await getCalApi()

      // Set up event listeners
      cal('on', {
        action: 'bookingSuccessful',
        callback: (e) => {
          if (onBookingSuccessful) {
            onBookingSuccessful(e)
          }
        },
      })

      // Configure UI
      cal('ui', {
        styles: { branding: { brandColor: '#FFD84D' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    }

    initCal()
  }, [onBookingSuccessful])

  if (!CALCOM_USERNAME) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-gray-500">Cal.com is not configured.</p>
          <p className="text-sm text-gray-400 mt-2">
            Set CALCOM_USERNAME in your environment variables.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Cal
      calLink={`${CALCOM_USERNAME}/${eventType}`}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{
        layout: 'month_view',
        name: prefill?.name || '',
        email: prefill?.email || '',
        notes: prefill?.notes || '',
      }}
    />
  )
}

// Inline booking button that opens a modal
export function CalComButton({
  eventType = '30min',
  prefill,
  children,
}: CalComEmbedProps & { children: React.ReactNode }) {
  useEffect(() => {
    async function initCal() {
      const cal = await getCalApi()
      cal('ui', {
        styles: { branding: { brandColor: '#FFD84D' } },
      })
    }
    initCal()
  }, [])

  if (!CALCOM_USERNAME) {
    return null
  }

  return (
    <button
      data-cal-link={`${CALCOM_USERNAME}/${eventType}`}
      data-cal-config={JSON.stringify({
        layout: 'month_view',
        name: prefill?.name || '',
        email: prefill?.email || '',
        notes: prefill?.notes || '',
      })}
    >
      {children}
    </button>
  )
}
