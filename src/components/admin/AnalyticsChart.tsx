'use client';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { format, subDays, parseISO } from 'date-fns';
import { useMemo } from 'react';

export default function AnalyticsChart() {
    const supabase = createClient();

    const { data: leads } = useQuery({
        queryKey: ['analytics_leads'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('leads')
                .select('created_at')
                .order('created_at', { ascending: true });
            if (error) throw error;
            return data;
        },
    });

    const chartData = useMemo(() => {
        if (!leads) return [];

        // Create a map of the last 14 days initialized with 0
        const last14Days = Array.from({ length: 14 }).reverse().map((_, i) => {
            const d = subDays(new Date(), i);
            return {
                date: format(d, 'MMM dd'),
                rawDate: format(d, 'yyyy-MM-dd'),
                Leads: 0,
            };
        });

        const countsByDate = leads.reduce((acc, lead) => {
            const dateStr = format(parseISO(lead.created_at), 'yyyy-MM-dd');
            acc[dateStr] = (acc[dateStr] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Populate the counts into our 14-day array
        return last14Days.map((day) => ({
            ...day,
            Leads: countsByDate[day.rawDate] || 0,
        }));
    }, [leads]);

    return (
        <div className='lg:col-span-3 rounded-3xl bg-surface border border-border p-8'>
            <div className='flex items-center justify-between mb-8'>
                <h2 className='text-lg font-bold text-foreground'>Lead Acquisition (Last 14 Days)</h2>
            </div>
            <div className='h-[300px] w-full'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#111111',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="Leads"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorLeads)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
