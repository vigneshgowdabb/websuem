'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StatusBadge } from './StatusBadge'
import type { Lead, LeadStatus } from '@/types/database'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface LeadPipelineProps {
  leads: Lead[]
  onStatusChange?: (leadId: string, newStatus: LeadStatus) => void
}

const pipelineStages: { status: LeadStatus; label: string; color: string }[] = [
  { status: 'new', label: 'New', color: 'bg-blue-500' },
  { status: 'contacted', label: 'Contacted', color: 'bg-yellow-500' },
  { status: 'qualified', label: 'Qualified', color: 'bg-purple-500' },
  { status: 'proposal', label: 'Proposal', color: 'bg-orange-500' },
  { status: 'won', label: 'Won', color: 'bg-green-500' },
  { status: 'lost', label: 'Lost', color: 'bg-red-500' },
]

export function LeadPipeline({ leads, onStatusChange }: LeadPipelineProps) {
  const router = useRouter()
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null)

  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter((lead) => lead.status === status)
  }

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (status: LeadStatus) => {
    if (draggedLead && draggedLead.status !== status) {
      onStatusChange?.(draggedLead.id, status)
    }
    setDraggedLead(null)
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {pipelineStages.map((stage) => {
        const stageLeads = getLeadsByStatus(stage.status)
        return (
          <div
            key={stage.status}
            className="flex-shrink-0 w-72"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(stage.status)}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={cn('w-3 h-3 rounded-full', stage.color)} />
              <h3 className="font-semibold text-deep-purple">{stage.label}</h3>
              <span className="text-sm text-gray-500 ml-auto">
                {stageLeads.length}
              </span>
            </div>
            <div
              className={cn(
                'space-y-3 min-h-[200px] p-2 rounded-lg transition-colors',
                draggedLead && 'bg-lavender/50'
              )}
            >
              {stageLeads.map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={() => handleDragStart(lead)}
                  onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                  className={cn(
                    'bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all',
                    draggedLead?.id === lead.id && 'opacity-50'
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-deep-purple truncate flex-1">
                      {lead.name}
                    </p>
                    <StatusBadge status={lead.status} className="ml-2" />
                  </div>
                  <p className="text-sm text-gray-500 truncate">{lead.email}</p>
                  {lead.company && (
                    <p className="text-sm text-gray-400 truncate mt-1">
                      {lead.company}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {format(new Date(lead.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
              {stageLeads.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-400">
                  No leads
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
