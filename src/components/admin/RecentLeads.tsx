'use client';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Lead } from '@/app/admin/DashboardClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';

interface RecentLeadsProps {
    initialLeads: Lead[];
}

export default function RecentLeads({ initialLeads }: RecentLeadsProps) {
    const supabase = createClient();
    const queryClient = useQueryClient();

    // Fetch leads with React Query
    const { data: leads } = useQuery({
        queryKey: ['admin_leads'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) throw error;
            return data as Lead[];
        },
        initialData: initialLeads,
    });

    // Setup Realtime Subscriptions
    useEffect(() => {
        const channel = supabase
            .channel('realtime_leads')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'leads' },
                () => {
                    // Invalidate and refetch when a lead is updated/inserted
                    queryClient.invalidateQueries({ queryKey: ['admin_leads'] });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, queryClient]);

    const displayLeads = leads || [];
    return (
        <div className='lg:col-span-2 rounded-3xl bg-surface border border-border p-8'>
            <div className='flex items-center justify-between mb-8'>
                <h2 className='text-lg font-bold text-foreground'>Recent Leads</h2>
                <button className='text-sm text-blue-500 font-semibold hover:text-blue-400'>View All</button>
            </div>
            <div className='space-y-4'>
                {displayLeads.length === 0 ? (
                    <div className='text-center py-12 text-foreground/50'>No leads found yet.</div>
                ) : (
                    displayLeads.map((lead) => (
                        <div key={lead.id} className='flex items-center justify-between p-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors group'>
                            <div className='flex items-center gap-4'>
                                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white'>
                                    {lead.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className='text-sm font-semibold text-foreground group-hover:text-blue-500 transition-colors'>{lead.name}</div>
                                    <div className='text-xs text-foreground/50'>{lead.email} • {lead.service_interest || 'N/A'}</div>
                                </div>
                            </div>
                            <div className='flex items-center gap-6'>
                                <div className='text-right'>
                                    <div className={cn(
                                        'text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border',
                                        lead.status === 'new' ? 'border-blue-500/20 text-blue-400' :
                                            lead.status === 'contacted' ? 'border-amber-500/20 text-amber-400' :
                                                'border-emerald-500/20 text-emerald-400'
                                    )}>
                                        {lead.status}
                                    </div>
                                    <div className='text-[10px] text-foreground/60 mt-1 uppercase tracking-tighter'>
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <button className='text-foreground/60 hover:text-foreground'>
                                    <MoreVertical className='w-4 h-4' />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
