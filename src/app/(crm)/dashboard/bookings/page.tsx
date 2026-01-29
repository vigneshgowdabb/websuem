'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar as CalendarIcon, List, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookingCalendar } from '@/components/crm/BookingCalendar'
import { BookingCard } from '@/components/crm/BookingCard'
import { EmptyState } from '@/components/crm/EmptyState'
import { getBookings, updateBookingStatus } from '@/lib/actions/bookings'
import type { Booking, BookingStatus } from '@/types/database'

export default function BookingsPage() {
    const router = useRouter()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState<'calendar' | 'list'>('calendar')
    const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all')
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    useEffect(() => {
        let cancelled = false

        async function loadBookings() {
            setLoading(true)
            const filters = statusFilter !== 'all' ? { status: statusFilter } : {}
            const result = await getBookings({ ...filters, limit: 100 })
            if (cancelled) return
            if (result.data) {
                setBookings(result.data)
            }
            setLoading(false)
        }

        loadBookings()

        return () => {
            cancelled = true
        }
    }, [statusFilter, refreshTrigger])

    const refreshBookings = useCallback(() => {
        setRefreshTrigger(prev => prev + 1)
    }, [])

    const handleStatusChange = useCallback(async (bookingId: string, status: BookingStatus) => {
        const result = await updateBookingStatus(bookingId, status)
        if (!result.error) {
            refreshBookings()
        }
    }, [refreshBookings])

    // Get upcoming bookings (next 7 days)
    const now = new Date()
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    const upcomingBookings = bookings
        .filter(b => {
            const bookingDate = new Date(b.start_time)
            return b.status === 'scheduled' && bookingDate >= now && bookingDate <= nextWeek
        })
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
        .slice(0, 5)

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-deep-purple">Bookings</h2>
                    <p className="text-gray-500">View and manage scheduled calls.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Tabs value={view} onValueChange={(v) => setView(v as 'calendar' | 'list')}>
                        <TabsList>
                            <TabsTrigger value="calendar">
                                <CalendarIcon className="w-4 h-4 mr-2" />
                                Calendar
                            </TabsTrigger>
                            <TabsTrigger value="list">
                                <List className="w-4 h-4 mr-2" />
                                List
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Button
                        className="bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 font-bold"
                        onClick={() => router.push('/dashboard/bookings/schedule')}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Booking
                    </Button>
                </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 mb-6">
                {['all', 'scheduled', 'completed', 'cancelled', 'no_show'].map((status) => (
                    <Button
                        key={status}
                        variant={statusFilter === status ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setStatusFilter(status as BookingStatus | 'all')}
                        className={statusFilter === status ? 'bg-deep-purple text-white' : ''}
                    >
                        {status === 'all' ? 'All' : status.replace('_', ' ')}
                    </Button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-96">
                    <div className="text-gray-400">Loading bookings...</div>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main View */}
                    <div className="lg:col-span-2">
                        {view === 'calendar' ? (
                            <BookingCalendar
                                bookings={bookings}
                                onSelectBooking={(booking) => {
                                    // Could open a detail modal
                                    console.log('Selected booking:', booking)
                                }}
                                onSelectSlot={() => {
                                    // Navigate to schedule page
                                    router.push('/dashboard/bookings/schedule')
                                }}
                            />
                        ) : (
                            <div className="space-y-4">
                                {bookings.length === 0 ? (
                                    <EmptyState
                                        icon={CalendarIcon}
                                        title="No bookings found"
                                        description="Schedule your first meeting to get started."
                                        actionLabel="Schedule Meeting"
                                        onAction={() => router.push('/dashboard/bookings/schedule')}
                                    />
                                ) : (
                                    bookings.map((booking) => (
                                        <BookingCard
                                            key={booking.id}
                                            booking={booking}
                                            onStatusChange={(status) => handleStatusChange(booking.id, status)}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {/* Upcoming This Week Sidebar */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-lg font-heading">Upcoming This Week</h3>

                        {upcomingBookings.length === 0 ? (
                            <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                                <p className="text-gray-400 text-sm">No upcoming bookings</p>
                                <Button
                                    variant="link"
                                    className="text-vibrant-yellow mt-2"
                                    onClick={() => router.push('/dashboard/bookings/schedule')}
                                >
                                    Schedule a meeting
                                </Button>
                            </div>
                        ) : (
                            upcomingBookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onStatusChange={(status) => handleStatusChange(booking.id, status)}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
