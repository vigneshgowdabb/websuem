'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { format } from 'date-fns'
import { ArrowLeft, Mail, Phone, Globe, Building2, Calendar, Trash2, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/crm/StatusBadge'
import { LeadActivityTimeline } from '@/components/crm/LeadActivityTimeline'
import { ConfirmDialog } from '@/components/crm/ConfirmDialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import {
    getLeadWithActivities,
    updateLeadStatus,
    deleteLead,
    convertLeadToClient,
} from '@/lib/actions/leads'
import { addLeadNote, type NoteType } from '@/lib/actions/notes'
import type { Lead, LeadStatus } from '@/types/database'

const STATUS_OPTIONS: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']

interface LeadWithActivities extends Omit<Lead, 'notes'> {
    notes: Array<{
        id: string
        content: string
        note_type: string
        created_at: string
    }>
    activities: Array<{
        id: string
        action: string
        details: Record<string, unknown>
        created_at: string
    }>
    bookings: Array<{
        id: string
        title: string
        start_time: string
        status: string
    }>
    emails: Array<{
        id: string
        subject: string
        status: string
        created_at: string
    }>
}

export default function LeadDetailPage() {
    const router = useRouter()
    const params = useParams()
    const leadId = params.id as string

    const [lead, setLead] = useState<LeadWithActivities | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [isConverting, setIsConverting] = useState(false)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    useEffect(() => {
        let cancelled = false

        async function loadLead() {
            setLoading(true)
            const result = await getLeadWithActivities(leadId)
            if (cancelled) return

            if (result.error) {
                setError(result.error)
            } else if (result.data) {
                setLead(result.data as LeadWithActivities)
            }
            setLoading(false)
        }

        loadLead()

        return () => {
            cancelled = true
        }
    }, [leadId, refreshTrigger])

    const refreshLead = useCallback(() => {
        setRefreshTrigger(prev => prev + 1)
    }, [])

    const handleStatusChange = async (status: LeadStatus) => {
        const result = await updateLeadStatus(leadId, status)
        if (!result.error) {
            refreshLead()
        }
    }

    const handleDelete = async () => {
        const result = await deleteLead(leadId)
        if (!result.error) {
            router.push('/dashboard/leads')
        }
    }

    const handleConvertToClient = async () => {
        setIsConverting(true)
        const result = await convertLeadToClient(leadId)
        if (!result.error) {
            router.push('/dashboard/clients')
        }
        setIsConverting(false)
    }

    const handleAddNote = async (content: string, type: NoteType) => {
        await addLeadNote(leadId, content, type)
        refreshLead()
    }

    // Combine notes and activities into timeline items
    const timelineItems = lead
        ? [
            ...(lead.notes || []).map((note) => ({
                id: `note-${note.id}`,
                type: 'note' as const,
                subtype: note.note_type || 'note',
                content: note.content,
                created_at: note.created_at,
            })),
            ...(lead.activities || []).map((activity) => ({
                id: `activity-${activity.id}`,
                type: 'activity' as const,
                subtype: activity.action,
                details: activity.details,
                created_at: activity.created_at,
            })),
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        : []

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-gray-400">Loading lead details...</div>
            </div>
        )
    }

    if (error || !lead) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error || 'Lead not found'}</p>
                <Button variant="outline" onClick={() => router.push('/dashboard/leads')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Leads
                </Button>
            </div>
        )
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => router.push('/dashboard/leads')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold font-heading text-deep-purple">
                                {lead.name}
                            </h1>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button>
                                        <StatusBadge status={lead.status} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {STATUS_OPTIONS.map((status) => (
                                        <DropdownMenuCheckboxItem
                                            key={status}
                                            checked={lead.status === status}
                                            onCheckedChange={() => handleStatusChange(status)}
                                            className="capitalize"
                                        >
                                            {status}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Created {format(new Date(lead.created_at), 'MMM d, yyyy')}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {lead.status !== 'won' && lead.status !== 'lost' && (
                        <Button
                            variant="outline"
                            onClick={handleConvertToClient}
                            disabled={isConverting}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                            <UserPlus className="w-4 h-4 mr-2" />
                            {isConverting ? 'Converting...' : 'Convert to Client'}
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Lead Info */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Contact Information */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <h3 className="font-bold text-deep-purple mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <a
                                    href={`mailto:${lead.email}`}
                                    className="text-vibrant-yellow hover:underline"
                                >
                                    {lead.email}
                                </a>
                            </div>
                            {lead.phone && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <a
                                        href={`tel:${lead.phone}`}
                                        className="text-gray-600 hover:text-deep-purple"
                                    >
                                        {lead.phone}
                                    </a>
                                </div>
                            )}
                            {lead.company && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Building2 className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">{lead.company}</span>
                                </div>
                            )}
                            {lead.website && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Globe className="w-4 h-4 text-gray-400" />
                                    <a
                                        href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-vibrant-yellow hover:underline truncate"
                                    >
                                        {lead.website}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lead Details */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <h3 className="font-bold text-deep-purple mb-4">Lead Details</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Service Interest</span>
                                <span className="font-medium capitalize">
                                    {lead.service_interested || '-'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Source</span>
                                <span className="font-medium capitalize">{lead.source || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Last Updated</span>
                                <span className="font-medium">
                                    {format(new Date(lead.updated_at), 'MMM d, yyyy')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    {lead.message && (
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h3 className="font-bold text-deep-purple mb-4">Initial Message</h3>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{lead.message}</p>
                        </div>
                    )}

                    {/* Upcoming Bookings */}
                    {lead.bookings && lead.bookings.length > 0 && (
                        <div className="bg-white rounded-xl border border-gray-100 p-6">
                            <h3 className="font-bold text-deep-purple mb-4">Meetings</h3>
                            <div className="space-y-3">
                                {lead.bookings.slice(0, 3).map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="flex items-center gap-3 text-sm"
                                    >
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <div className="flex-1">
                                            <p className="font-medium">{booking.title}</p>
                                            <p className="text-gray-400 text-xs">
                                                {format(new Date(booking.start_time), 'MMM d, h:mm a')}
                                            </p>
                                        </div>
                                        <StatusBadge status={booking.status} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Activity Timeline */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-bold text-deep-purple mb-6">Activity Timeline</h3>
                        <LeadActivityTimeline items={timelineItems} onAddNote={handleAddNote} />
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
                title="Delete Lead"
                description={`Are you sure you want to delete ${lead.name}? This action cannot be undone.`}
                confirmLabel="Delete"
                variant="destructive"
                onConfirm={handleDelete}
            />
        </div>
    )
}
