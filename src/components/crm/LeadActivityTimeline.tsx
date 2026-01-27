'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckSquare,
  Activity,
  Send,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NoteType } from '@/lib/actions/notes'

interface TimelineItem {
  id: string
  type: 'note' | 'activity'
  subtype: string
  content?: string | null
  details?: Record<string, unknown>
  created_at: string
  user_id?: string
}

interface LeadActivityTimelineProps {
  items: TimelineItem[]
  onAddNote?: (content: string, type: NoteType) => Promise<void>
}

const noteTypeIcons: Record<string, typeof MessageSquare> = {
  note: MessageSquare,
  call: Phone,
  email: Mail,
  meeting: Calendar,
  task: CheckSquare,
}

const activityLabels: Record<string, string> = {
  lead_created: 'Lead created',
  lead_updated: 'Lead updated',
  status_changed: 'Status changed',
  email_sent: 'Email sent',
  booking_created: 'Meeting scheduled',
  booking_created_via_calcom: 'Meeting booked via Cal.com',
  booking_cancelled: 'Meeting cancelled',
  booking_cancelled_via_calcom: 'Meeting cancelled',
  converted_to_client: 'Converted to client',
  note_added: 'Note added',
  call_added: 'Call logged',
}

export function LeadActivityTimeline({
  items,
  onAddNote,
}: LeadActivityTimelineProps) {
  const [newNote, setNewNote] = useState('')
  const [noteType, setNoteType] = useState<NoteType>('note')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!newNote.trim() || !onAddNote) return

    setIsSubmitting(true)
    await onAddNote(newNote, noteType)
    setNewNote('')
    setNoteType('note')
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6">
      {/* Add note form */}
      {onAddNote && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Select
              value={noteType}
              onValueChange={(value) => setNoteType(value as NoteType)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="note">Note</SelectItem>
                <SelectItem value="call">Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="task">Task</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder={`Add a ${noteType}...`}
            rows={3}
            className="mb-3"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!newNote.trim() || isSubmitting}
              size="sm"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />

        <div className="space-y-4">
          {items.map((item) => {
            const Icon =
              item.type === 'note'
                ? noteTypeIcons[item.subtype] || MessageSquare
                : Activity

            return (
              <div key={item.id} className="relative flex gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    'relative z-10 flex items-center justify-center w-10 h-10 rounded-full',
                    item.type === 'note'
                      ? 'bg-white border-2 border-gray-200'
                      : 'bg-gray-100'
                  )}
                >
                  <Icon className="w-4 h-4 text-gray-500" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-deep-purple capitalize">
                        {item.type === 'note'
                          ? item.subtype
                          : activityLabels[item.subtype] || item.subtype}
                      </p>
                      <time className="text-xs text-gray-400">
                        {format(new Date(item.created_at), 'MMM d, h:mm a')}
                      </time>
                    </div>
                    {item.content && (
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {item.content}
                      </p>
                    )}
                    {item.details && Object.keys(item.details).length > 0 && (
                      <div className="mt-2 text-xs text-gray-400">
                        {Boolean(item.details.newStatus) && (
                          <span>New status: {String(item.details.newStatus)}</span>
                        )}
                        {Boolean(item.details.subject) && (
                          <span>Subject: {String(item.details.subject)}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No activity yet
        </div>
      )}
    </div>
  )
}
