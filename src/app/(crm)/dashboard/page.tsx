import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";

export default async function DashboardPage() {
    const supabase = createClient();

    // Fetch Stats
    const { count: leadCount } = await supabase.from('leads').select('*', { count: 'exact', head: true });
    const { count: bookingCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true });

    // For demo purposes, we'll keep revenue hardcoded as we don't have a payments table yet
    const stats = [
        { name: "Total Leads", value: leadCount?.toString() || "0", change: "Real-time", icon: Users, color: "bg-lavender text-deep-purple" },
        { name: "Active Projects", value: "3", change: "Fixed", icon: TrendingUp, color: "bg-baltic-sea text-deep-purple" },
        { name: "Bookings", value: bookingCount?.toString() || "0", change: "Real-time", icon: Calendar, color: "bg-cream text-deep-purple" },
        { name: "Revenue", value: "$4,200", change: "+18%", icon: DollarSign, color: "bg-mint text-emerald-800" },
    ];

    // Fetch Recent Leads
    const { data: recentLeads } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold font-heading text-deep-purple">Overview</h2>
                <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                        </div>
                        <div className="text-3xl font-bold font-heading text-deep-purple mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-500 font-medium">{stat.name}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Leads */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg font-heading">Recent Leads</h3>
                        <span className="text-xs text-gray-400">Syncing from 'leads' table</span>
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
                                                <div className="font-bold text-deep-purple">{lead.name}</div>
                                                <div className="text-xs text-gray-400">{lead.email}</div>
                                            </td>
                                            <td className="py-4 text-sm text-gray-600 capitalize">{lead.service_interested || 'General'}</td>
                                            <td className="py-4">
                                                <span className={`inline-flex items-center px-2 py-1 text-xs font-bold rounded-full ${lead.status === 'new' ? 'bg-mint text-green-800' : 'bg-lavender text-deep-purple'
                                                    }`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-sm text-gray-500">
                                                {new Date(lead.created_at).toLocaleDateString()}
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
                    <h3 className="font-bold text-lg font-heading mb-6">Upcoming Calls</h3>
                    <div className="space-y-4">
                        {/* Static placeholder for now until we have real bookings */}
                        <div className="flex gap-4 p-4 rounded-xl border border-gray-50 hover:border-vibrant-yellow/50 transition-colors">
                            <div className="flex-shrink-0 w-12 text-center">
                                <div className="text-xs text-gray-400 uppercase font-bold">Today</div>
                                <div className="text-xl font-bold text-deep-purple">--</div>
                            </div>
                            <div>
                                <div className="font-bold text-deep-purple text-sm">No upcoming calls</div>
                                <div className="text-xs text-gray-500 mb-1">Bookings table is empty</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
