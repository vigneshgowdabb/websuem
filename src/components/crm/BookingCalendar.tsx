'use client'

import { useState, useMemo, useCallback } from 'react'
import { Calendar, dateFnsLocalizer, Views, type View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import type { Booking } from '@/types/database'
import { cn } from '@/lib/utils'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = { 'en-US': enUS }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
})

interface BookingCalendarProps {
  bookings: Booking[]
  onSelectBooking?: (booking: Booking) => void
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void
}

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  booking: Booking
  status: string
}

const statusColors: Record<string, { bg: string; border: string }> = {
  scheduled: { bg: 'bg-blue-100', border: 'border-blue-400' },
  completed: { bg: 'bg-green-100', border: 'border-green-400' },
  cancelled: { bg: 'bg-red-100', border: 'border-red-400' },
  no_show: { bg: 'bg-orange-100', border: 'border-orange-400' },
}

export function BookingCalendar({
  bookings,
  onSelectBooking,
  onSelectSlot,
}: BookingCalendarProps) {
  const [currentView, setCurrentView] = useState<View>(Views.WEEK)
  const [currentDate, setCurrentDate] = useState(new Date())

  const events: CalendarEvent[] = useMemo(() => {
    return bookings.map((booking) => {
      const start = new Date(booking.start_time)
      const end = new Date(booking.end_time)
      return {
        id: booking.id,
        title: booking.title,
        start,
        end,
        booking,
        status: booking.status,
      }
    })
  }, [bookings])

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
      if (onSelectBooking) {
        onSelectBooking(event.booking)
      }
    },
    [onSelectBooking]
  )

  const handleSelectSlot = useCallback(
    (slotInfo: { start: Date; end: Date }) => {
      if (onSelectSlot) {
        onSelectSlot(slotInfo)
      }
    },
    [onSelectSlot]
  )

  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    const colors = statusColors[event.status] || statusColors.scheduled
    return {
      className: cn(
        'rounded-md border-l-4 px-2 py-1',
        colors.bg,
        colors.border
      ),
    }
  }, [])

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <style>{`
        .rbc-calendar {
          font-family: inherit;
        }
        .rbc-header {
          padding: 12px;
          font-weight: 600;
          background-color: #f9fafb;
        }
        .rbc-today {
          background-color: #fff7e6;
        }
        .rbc-event {
          border: none !important;
          background-color: transparent !important;
        }
        .rbc-event-content {
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rbc-toolbar button {
          color: #1A1235;
          border-color: #e5e7eb;
        }
        .rbc-toolbar button:hover {
          background-color: #f5f0ff;
          border-color: #1A1235;
        }
        .rbc-toolbar button.rbc-active {
          background-color: #FFD84D;
          border-color: #FFD84D;
          color: #1A1235;
        }
        .rbc-toolbar button.rbc-active:hover {
          background-color: #ffc61a;
        }
        .rbc-off-range-bg {
          background-color: #f9fafb;
        }
        .rbc-time-slot {
          min-height: 30px;
        }
      `}</style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        view={currentView}
        onView={setCurrentView}
        date={currentDate}
        onNavigate={setCurrentDate}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        defaultView={Views.WEEK}
        min={new Date(2024, 0, 1, 8, 0)}
        max={new Date(2024, 0, 1, 20, 0)}
      />
    </div>
  )
}
