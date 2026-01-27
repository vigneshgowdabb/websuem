'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { StatusBadge } from './StatusBadge'
import { format } from 'date-fns'
import {
  Mail,
  Phone,
  Globe,
  Building2,
  Calendar,
  UserPlus,
  Edit,
  ExternalLink,
} from 'lucide-react'
import type { Lead } from '@/types/database'

interface LeadDetailSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onEdit?: () => void
  onEmail?: () => void
  onConvert?: () => void
  onSchedule?: () => void
}

export function LeadDetailSheet({
  open,
  onOpenChange,
  lead,
  onEdit,
  onEmail,
  onConvert,
  onSchedule,
}: LeadDetailSheetProps) {
  if (!lead) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl">{lead.name}</SheetTitle>
              <StatusBadge status={lead.status} className="mt-2" />
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Contact Info
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{lead.email}</span>
              </a>
              {lead.phone && (
                <a
                  href={`tel:${lead.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{lead.phone}</span>
                </a>
              )}
              {lead.website && (
                <a
                  href={lead.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-sm truncate">{lead.website}</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 ml-auto" />
                </a>
              )}
              {lead.company && (
                <div className="flex items-center gap-3 p-3">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{lead.company}</span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Details
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400">Service Interested</p>
                <p className="font-medium capitalize">
                  {lead.service_interested?.replace('_', ' ') || '-'}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Source</p>
                <p className="font-medium capitalize">{lead.source || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400">Created</p>
                <p className="font-medium">
                  {format(new Date(lead.created_at), 'MMM d, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Updated</p>
                <p className="font-medium">
                  {format(new Date(lead.updated_at), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          {lead.message && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Message
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 rounded-lg p-3">
                {lead.message}
              </p>
            </div>
          )}

          {/* Notes */}
          {lead.notes && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Notes
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 rounded-lg p-3">
                {lead.notes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {onEdit && (
                <Button variant="outline" onClick={onEdit} className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
              {onEmail && (
                <Button variant="outline" onClick={onEmail} className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              )}
              {onSchedule && (
                <Button variant="outline" onClick={onSchedule} className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              )}
              {onConvert && lead.status !== 'won' && (
                <Button onClick={onConvert} className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Convert
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
