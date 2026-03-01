'use client';
import { motion } from 'framer-motion';
import { Users, Briefcase, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';

export default function StatsGrid({ totalLeads: initialTotalLeads }: { totalLeads: number }) {
    const supabase = createClient();

    // Fetch total leads
    const { data: totalCount } = useQuery({
        queryKey: ['admin_leads_count'],
        queryFn: async () => {
            const { count, error } = await supabase
                .from('leads')
                .select('*', { count: 'exact', head: true });
            if (error) throw error;
            return count || 0;
        },
        initialData: initialTotalLeads,
    });

    // Fetch total active projects
    const { data: activeProjectsCount } = useQuery({
        queryKey: ['admin_projects_count'],
        queryFn: async () => {
            const { count, error } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true })
                .neq('status', 'completed');
            if (error) throw error;
            return count || 0;
        },
    });

    // Fetch total revenue (sum of paid invoices)
    const { data: totalRevenue } = useQuery({
        queryKey: ['admin_total_revenue'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('invoices')
                .select('amount')
                .eq('status', 'paid');
            if (error) throw error;
            const sum = data?.reduce((acc, inv) => acc + (inv.amount || 0), 0) || 0;
            return sum;
        },
    });

    const currentTotalLeads = totalCount || 0;
    const currentActiveProjects = activeProjectsCount || 0;
    const currentRevenue = totalRevenue || 0;

    // Calculate a basic dynamic conversion rate based on active projects / total leads
    const conversionRate = currentTotalLeads > 0
        ? ((currentActiveProjects / currentTotalLeads) * 100).toFixed(1) + '%'
        : '0%';

    const stats = [
        { name: 'Total Revenue', value: `$${currentRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, change: 'Live', trend: 'up', icon: DollarSign },
        { name: 'Active Projects', value: currentActiveProjects.toString(), change: 'Live', trend: 'up', icon: Briefcase },
        { name: 'Total Leads', value: currentTotalLeads.toString(), change: 'Live', trend: 'up', icon: Users },
        { name: 'Conversion Rate', value: conversionRate, change: 'Live', trend: 'up', icon: TrendingUp },
    ];

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='p-6 rounded-3xl bg-surface border border-border group hover:border-[#D4AF37]/30 transition-all'
                >
                    <div className='flex items-start justify-between mb-4'>
                        <div className='p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]'>
                            <stat.icon className='w-5 h-5' />
                        </div>
                        <div className={cn(
                            'flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full',
                            stat.trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'
                        )}>
                            {stat.trend === 'up' ? <ArrowUpRight className='w-3 h-3' /> : <ArrowDownRight className='w-3 h-3' />}
                            {stat.change}
                        </div>
                    </div>
                    <div className='text-2xl font-bold text-foreground'>{stat.value}</div>
                    <div className='text-sm text-foreground/50 mt-1'>{stat.name}</div>
                </motion.div>
            ))}
        </div>
    );
}
