import { Users, Calendar, DollarSign, Building2 } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { StatsCard } from "@/components/crm/StatsCard"
import { StatusBadge } from "@/components/crm/StatusBadge"
import { BookingCard } from "@/components/crm/BookingCard"
import Link from "next/link"
import { format } from "date-fns"

export default async function DashboardPage() {
    const supabase = await createClient()

    // Fetch Stats
    const { count: leadCount } = await supabase.from('leads').select('*', { count: 'exact', head: true })
    const { count: clientCount } = await supabase.from('clients').select('*', { count: 'exact', head: true })
    const { count: bookingCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true })

    // Fetch total revenue from clients
    const { data: clientsRevenue } = await supabase.from('clients').select('total_revenue')
    const totalRevenue = clientsRevenue?.reduce((sum, c) => sum + (c.total_revenue || 0), 0) || 0

    // Fetch Recent Leads
    const { data: recentLeads } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

    // Fetch Upcoming Bookings
    const now = new Date().toISOString()
    const { data: upcomingBookings } = await supabase
        .from('bookings')
        .select('*, lead:leads(*)')
        .gte('start_time', now)
        .eq('status', 'scheduled')
        .order('start_time', { ascending: true })
        .limit(3)

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold font-heading text-deep-purple">Overview</h2>
                <p className="text-gray-500">Welcome back! Here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Leads"
                    value={leadCount || 0}
                    icon={<Users className="w-5 h-5 text-deep-purple" />}
                />
                <StatsCard
                    title="Clients"
                    value={clientCount || 0}
                    icon={<Building2 className="w-5 h-5 text-deep-purple" />}
                />
                <StatsCard
                    title="Bookings"
                    value={bookingCount || 0}
                    icon={<Calendar className="w-5 h-5 text-deep-purple" />}
                />
                <StatsCard
                    title="Revenue"
                    value={formatCurrency(totalRevenue)}
                    icon={<DollarSign className="w-5 h-5 text-deep-purple" />}
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Leads */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg font-heading">Recent Leads</h3>
                        <Link
                            href="/dashboard/leads"
                            className="text-sm text-vibrant-yellow hover:underline"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="pb-3 text-sm font-semibold text-gray-500">Name</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-500">Service</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-500">Status</th>
                                    <th className="pb-3 text-sm font-semibold text-gray-500">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentLeads?.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-400">
                                            No leads found. Waiting for submissions...
                                        </td>
                                    </tr>
                                ) : (
                                    recentLeads?.map((lead) => (
                                        <tr key={lead.id} className="group hover:bg-gray-50 transition-colors">
                                            <td className="py-4">
                                                <Link href={`/dashboard/leads/${lead.id}`}>
                                                    <div className="font-bold text-deep-purple">{lead.name}</div>
                                                    <div className="text-xs text-gray-400">{lead.email}</div>
                                                </Link>
                                            </td>
                                            <td className="py-4 text-sm text-gray-600 capitalize">
                                                {lead.service_interested?.replace('_', ' ') || 'General'}
                                            </td>
                                            <td className="py-4">
                                                <StatusBadge status={lead.status} />
                                            </td>
                                            <td className="py-4 text-sm text-gray-500">
                                                {format(new Date(lead.created_at), 'MMM d, yyyy')}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upcoming Bookings */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg font-heading">Upcoming Calls</h3>
                        <Link
                            href="/dashboard/bookings"
                            className="text-sm text-vibrant-yellow hover:underline"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {upcomingBookings?.length === 0 ? (
                            <div className="flex gap-4 p-4 rounded-xl border border-gray-50 text-center">
                                <div className="flex-1">
                                    <div className="text-sm text-gray-400">No upcoming calls</div>
                                    <Link
                                        href="/dashboard/bookings/schedule"
                                        className="text-xs text-vibrant-yellow hover:underline"
                                    >
                                        Schedule a meeting
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            upcomingBookings?.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
