import { createClient } from "@/lib/supabase/server"
import { StatusBadge } from "@/components/crm/StatusBadge"
import { format } from "date-fns"
import { Search, Filter } from "lucide-react"

import { AddClientDialog } from "@/components/crm/AddClientDialog"

export default async function ClientsPage() {
    const supabase = await createClient()

    const { data: clients } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-deep-purple">Clients</h2>
                    <p className="text-gray-500">Manage your client relationships and projects.</p>
                </div>
                <AddClientDialog />
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vibrant-yellow/50"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                </button>
            </div>

            {/* Clients Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500">Client Info</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500">Company</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500">Revenue</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500">Joined</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {clients?.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                        No clients found.
                                    </td>
                                </tr>
                            ) : (
                                clients?.map((client) => (
                                    <tr key={client.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-deep-purple">{client.name}</div>
                                            <div className="text-xs text-gray-400">{client.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {client.company || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={client.status || 'active'} />
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                            {formatCurrency(client.total_revenue || 0)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {format(new Date(client.created_at), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-deep-purple transition-colors">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
