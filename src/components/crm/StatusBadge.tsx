'use client'

import { cn } from '@/lib/utils'

type StatusVariant =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'won'
  | 'lost'
  | 'active'
  | 'completed'
  | 'inactive'
  | 'scheduled'
  | 'cancelled'
  | 'no_show'
  | 'planning'
  | 'in_progress'
  | 'review'
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'bounced'
  | 'failed'
  | 'pending'
  | 'default'

const statusStyles: Record<StatusVariant, string> = {
  // Lead statuses
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-purple-100 text-purple-700',
  proposal: 'bg-orange-100 text-orange-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
  // Client statuses
  active: 'bg-green-100 text-green-700',
  completed: 'bg-blue-100 text-blue-700',
  inactive: 'bg-gray-100 text-gray-700',
  // Booking statuses
  scheduled: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
  no_show: 'bg-orange-100 text-orange-700',
  // Project statuses
  planning: 'bg-purple-100 text-purple-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  review: 'bg-orange-100 text-orange-700',
  // Email statuses
  pending: 'bg-gray-100 text-gray-700',
  sent: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
  opened: 'bg-teal-100 text-teal-700',
  bounced: 'bg-red-100 text-red-700',
  failed: 'bg-red-100 text-red-700',
  // Default
  default: 'bg-gray-100 text-gray-700',
}

const statusLabels: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  proposal: 'Proposal',
  won: 'Won',
  lost: 'Lost',
  active: 'Active',
  completed: 'Completed',
  inactive: 'Inactive',
  scheduled: 'Scheduled',
  cancelled: 'Cancelled',
  no_show: 'No Show',
  planning: 'Planning',
  in_progress: 'In Progress',
  review: 'Review',
  pending: 'Pending',
  sent: 'Sent',
  delivered: 'Delivered',
  opened: 'Opened',
  bounced: 'Bounced',
  failed: 'Failed',
}

interface StatusBadgeProps {
  status: string
  className?: string
  showDot?: boolean
}

export function StatusBadge({ status, className, showDot = false }: StatusBadgeProps) {
  const variant = (status as StatusVariant) in statusStyles
    ? (status as StatusVariant)
    : 'default'

  const label = statusLabels[status] || status.replace(/_/g, ' ')

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        statusStyles[variant],
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'active' || variant === 'won' || variant === 'delivered'
              ? 'bg-green-500'
              : variant === 'lost' || variant === 'cancelled' || variant === 'failed' || variant === 'bounced'
              ? 'bg-red-500'
              : 'bg-current'
          )}
        />
      )}
      {label}
    </span>
  )
}
