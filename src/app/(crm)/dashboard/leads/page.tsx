'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Download, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { AddLeadDialog } from '@/components/crm/AddLeadDialog'
import { StatusBadge } from '@/components/crm/StatusBadge'
import { getLeads, updateLeadStatus, deleteLead } from '@/lib/actions/leads'
import type { Lead, LeadStatus, ServiceType, LeadSource } from '@/types/database'
import { format } from 'date-fns'

const STATUS_OPTIONS: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']
const SOURCE_OPTIONS: LeadSource[] = ['website', 'referral', 'social', 'search', 'other']
const SERVICE_OPTIONS: ServiceType[] = ['website', 'social', 'automation', 'branding', 'multiple', 'other']

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export default function LeadsPage() {
    const router = useRouter()
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<LeadStatus | null>(null)
    const [sourceFilter, setSourceFilter] = useState<LeadSource | null>(null)
    const [serviceFilter, setServiceFilter] = useState<ServiceType | null>(null)

    // Pagination State
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const limit = 20

    const debouncedSearch = useDebounce(searchQuery, 300)

    // Track previous filter values to detect changes
    const prevFiltersRef = useRef({ debouncedSearch, statusFilter, sourceFilter, serviceFilter })

    useEffect(() => {
        let cancelled = false

        async function loadLeads() {
            // Check if filters changed (not just page)
            const prev = prevFiltersRef.current
            const filtersChanged =
                prev.debouncedSearch !== debouncedSearch ||
                prev.statusFilter !== statusFilter ||
                prev.sourceFilter !== sourceFilter ||
                prev.serviceFilter !== serviceFilter

            // Update ref
            prevFiltersRef.current = { debouncedSearch, statusFilter, sourceFilter, serviceFilter }

            // If filters changed, reset to page 1
            const pageToFetch = filtersChanged ? 1 : page

            setLoading(true)
            setError(null)

            const filters: Record<string, unknown> = {
                page: pageToFetch,
                limit,
            }

            if (debouncedSearch) filters.search = debouncedSearch
            if (statusFilter) filters.status = statusFilter
            if (sourceFilter) filters.source = sourceFilter
            if (serviceFilter) filters.service = serviceFilter

            const result = await getLeads(filters)

            if (cancelled) return

            if (result.error) {
                setError(result.error)
                setLeads([])
            } else if (result.data) {
                setLeads(result.data)
                setTotalPages(result.totalPages || 1)
                setTotalCount(result.count || 0)
                // Update page state if we reset to page 1
                if (filtersChanged && page !== 1) {
                    setPage(1)
                }
            }

            setLoading(false)
        }

        loadLeads()

        return () => {
            cancelled = true
        }
    }, [debouncedSearch, statusFilter, sourceFilter, serviceFilter, page, refreshTrigger])

    const refreshLeads = useCallback(() => {
        setRefreshTrigger(prev => prev + 1)
    }, [])

    const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
        const result = await updateLeadStatus(leadId, newStatus)
        if (!result.error) {
            refreshLeads()
        }
    }

    const handleDelete = async (leadId: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return
        const result = await deleteLead(leadId)
        if (!result.error) {
            refreshLeads()
        }
    }

    const handleExport = () => {
        const csvContent = [
            ['Name', 'Email', 'Company', 'Service', 'Status', 'Source', 'Created'],
            ...leads.map(lead => [
                lead.name,
                lead.email,
                lead.company || '',
                lead.service_interested || '',
                lead.status,
                lead.source || '',
                format(new Date(lead.created_at), 'yyyy-MM-dd'),
            ])
        ].map(row => row.join(',')).join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `leads-${format(new Date(), 'yyyy-MM-dd')}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    const clearFilters = () => {
        setSearchQuery('')
        setStatusFilter(null)
        setSourceFilter(null)
        setServiceFilter(null)
    }

    const hasActiveFilters = statusFilter || sourceFilter || serviceFilter || searchQuery

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-deep-purple">Leads</h2>
                    <p className="text-gray-500">Manage and track your potential clients.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={handleExport}
                        disabled={leads.length === 0}
                    >
                        <Download className="w-4 h-4" /> Export
                    </Button>
                    <AddLeadDialog onSuccess={refreshLeads} />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-vibrant-yellow focus:ring-1 focus:ring-vibrant-yellow"
                        />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Status Filter */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`flex items-center gap-2 ${statusFilter ? 'bg-vibrant-yellow/10 border-vibrant-yellow' : ''}`}
                                >
                                    Status
                                    <ChevronDown className="w-3 h-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {STATUS_OPTIONS.map((status) => (
                                    <DropdownMenuCheckboxItem
                                        key={status}
                                        checked={statusFilter === status}
                                        onCheckedChange={(checked) => setStatusFilter(checked ? status : null)}
                                        className="capitalize"
                                    >
                                        {status}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Source Filter */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`flex items-center gap-2 ${sourceFilter ? 'bg-vibrant-yellow/10 border-vibrant-yellow' : ''}`}
                                >
                                    Source
                                    <ChevronDown className="w-3 h-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {SOURCE_OPTIONS.map((source) => (
                                    <DropdownMenuCheckboxItem
                                        key={source}
                                        checked={sourceFilter === source}
                                        onCheckedChange={(checked) => setSourceFilter(checked ? source : null)}
                                        className="capitalize"
                                    >
                                        {source}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Service Filter */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={`flex items-center gap-2 ${serviceFilter ? 'bg-vibrant-yellow/10 border-vibrant-yellow' : ''}`}
                                >
                                    Service
                                    <ChevronDown className="w-3 h-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Filter by Service</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {SERVICE_OPTIONS.map((service) => (
                                    <DropdownMenuCheckboxItem
                                        key={service}
                                        checked={serviceFilter === service}
                                        onCheckedChange={(checked) => setServiceFilter(checked ? service : null)}
                                        className="capitalize"
                                    >
                                        {service}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-4 h-4 mr-1" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto min-h-[300px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-full py-20 text-gray-400">
                            Loading leads...
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Source</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                            {hasActiveFilters
                                                ? 'No leads match your filters.'
                                                : 'No leads found in the database.'}
                                        </td>
                                    </tr>
                                ) : (
                                    leads.map((lead) => (
                                        <tr
                                            key={lead.id}
                                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-deep-purple">{lead.name}</div>
                                                <div className="text-xs text-gray-400">{lead.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {lead.company || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                                                    {lead.service_interested || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        onClick={(e) => e.stopPropagation()}
                                                        asChild
                                                    >
                                                        <button>
                                                            <StatusBadge status={lead.status} />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="start">
                                                        {STATUS_OPTIONS.map((status) => (
                                                            <DropdownMenuCheckboxItem
                                                                key={status}
                                                                checked={lead.status === status}
                                                                onCheckedChange={() => handleStatusChange(lead.id, status)}
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="capitalize"
                                                            >
                                                                {status}
                                                            </DropdownMenuCheckboxItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                                                {lead.source || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {format(new Date(lead.created_at), 'MMM d, yyyy')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        onClick={(e) => e.stopPropagation()}
                                                        asChild
                                                    >
                                                        <Button variant="ghost" size="sm">
                                                            ...
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuCheckboxItem
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                router.push(`/dashboard/leads/${lead.id}`)
                                                            }}
                                                        >
                                                            View Details
                                                        </DropdownMenuCheckboxItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuCheckboxItem
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleDelete(lead.id)
                                                            }}
                                                            className="text-red-600"
                                                        >
                                                            Delete
                                                        </DropdownMenuCheckboxItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <div>
                        Showing {leads.length} of {totalCount} leads
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            Previous
                        </Button>
                        <span className="flex items-center px-3">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
