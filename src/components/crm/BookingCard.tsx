'use client'

import { format } from 'date-fns'
import { StatusBadge } from './StatusBadge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Calendar,
  Clock,
  Video,
  MoreHorizontal,
  Check,
  X,
  UserX,
  ExternalLink,
} from 'lucide-react'
import type { Booking, BookingStatus } from '@/types/database'
import { cn } from '@/lib/utils'

interface BookingCardProps {
  booking: Booking
  onStatusChange?: (status: BookingStatus) => void
  onClick?: () => void
}

const typeLabels: Record<string, string> = {
  discovery: 'Discovery Call',
  proposal: 'Proposal Review',
  followup: 'Follow-up',
  other: 'Meeting',
}

export function BookingCard({ booking, onStatusChange, onClick }: BookingCardProps) {
  const startTime = new Date(booking.start_time)
  const endTime = new Date(booking.end_time)
  const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000)

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500 capitalize">
            {booking.type ? typeLabels[booking.type] || 'Meeting' : 'Meeting'}
          </span>
          <StatusBadge status={booking.status} />
        </div>
        {onStatusChange && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStatusChange('completed')}>
                <Check className="mr-2 h-4 w-4 text-green-600" />
                Mark Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange('cancelled')}>
                <X className="mr-2 h-4 w-4 text-red-600" />
                Cancel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange('no_show')}>
                <UserX className="mr-2 h-4 w-4 text-orange-600" />
                No Show
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusChange('scheduled')}>
                <Calendar className="mr-2 h-4 w-4" />
                Reset to Scheduled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <h3 className="font-semibold text-deep-purple mb-2">{booking.title}</h3>

      {booking.lead && (
        <p className="text-sm text-gray-600 mb-3">
          {booking.lead.name}
          {booking.lead.email && (
            <span className="text-gray-400 ml-1">({booking.lead.email})</span>
          )}
        </p>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {format(startTime, 'MMM d, yyyy')}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {format(startTime, 'h:mm a')} ({durationMinutes}m)
        </span>
      </div>

      {booking.meeting_link && (
        <a
          href={booking.meeting_link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 text-sm text-vibrant-yellow hover:underline"
        >
          <Video className="w-4 h-4" />
          Join Meeting
          <ExternalLink className="w-3 h-3" />
        </a>
      )}

      {booking.notes && (
        <p className="text-sm text-gray-400 mt-3 pt-3 border-t truncate">
          {booking.notes}
        </p>
      )}
    </div>
  )
}
