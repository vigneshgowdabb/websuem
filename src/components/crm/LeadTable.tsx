'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { StatusBadge } from './StatusBadge'
import { MoreHorizontal, Eye, Edit, Trash2, UserPlus, Mail } from 'lucide-react'
import type { Lead } from '@/types/database'
import { format } from 'date-fns'

interface LeadTableProps {
  leads: Lead[]
  onEdit?: (lead: Lead) => void
  onDelete?: (lead: Lead) => void
  onConvert?: (lead: Lead) => void
  onEmail?: (lead: Lead) => void
}

export function LeadTable({
  leads,
  onEdit,
  onDelete,
  onConvert,
  onEmail,
}: LeadTableProps) {
  const router = useRouter()
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])

  const toggleSelect = (id: string) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(leads.map((l) => l.id))
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input
                type="checkbox"
                checked={selectedLeads.length === leads.length && leads.length > 0}
                onChange={toggleSelectAll}
                className="h-4 w-4 rounded border-gray-300"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow
              key={lead.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedLeads.includes(lead.id)}
                  onChange={() => toggleSelect(lead.id)}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-deep-purple">{lead.name}</p>
                  <p className="text-sm text-gray-500">{lead.email}</p>
                </div>
              </TableCell>
              <TableCell className="text-gray-600">
                {lead.company || '-'}
              </TableCell>
              <TableCell className="text-gray-600 capitalize">
                {lead.service_interested?.replace('_', ' ') || '-'}
              </TableCell>
              <TableCell>
                <StatusBadge status={lead.status} />
              </TableCell>
              <TableCell className="text-gray-600 capitalize">
                {lead.source || '-'}
              </TableCell>
              <TableCell className="text-gray-500 text-sm">
                {format(new Date(lead.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    {onEdit && (
                      <DropdownMenuItem onClick={() => onEdit(lead)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    {onEmail && (
                      <DropdownMenuItem onClick={() => onEmail(lead)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                    )}
                    {onConvert && lead.status !== 'won' && (
                      <DropdownMenuItem onClick={() => onConvert(lead)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Convert to Client
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    {onDelete && (
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(lead)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
