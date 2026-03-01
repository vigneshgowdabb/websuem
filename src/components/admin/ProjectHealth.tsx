'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';

export default function ProjectHealth() {
    const supabase = createClient();

    const { data: projects, isLoading } = useQuery({
        queryKey: ['admin_project_health'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('status')
                .neq('status', 'completed');
            if (error) throw error;
            return data;
        },
    });

    // Calculate dynamic percentages
    const calculateHealth = () => {
        const total = projects?.length || 0;
        if (!projects || total === 0) return [
            { label: 'Discovery', progress: 0, color: 'bg-[#D4AF37]', count: 0 },
            { label: 'Design', progress: 0, color: 'bg-purple-500', count: 0 },
            { label: 'Build', progress: 0, color: 'bg-pink-500', count: 0 },
            { label: 'Review', progress: 0, color: 'bg-blue-500', count: 0 },
            { label: 'Launch', progress: 0, color: 'bg-amber-500', count: 0 },
        ];

        const counts = projects.reduce((acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const getPercent = (status: string) => Math.round(((counts[status] || 0) / total) * 100);

        return [
            { label: 'Discovery', progress: getPercent('discovery'), color: 'bg-[#D4AF37]', count: counts['discovery'] || 0 },
            { label: 'Design', progress: getPercent('design'), color: 'bg-purple-500', count: counts['design'] || 0 },
            { label: 'Build', progress: getPercent('build'), color: 'bg-pink-500', count: counts['build'] || 0 },
            { label: 'Review', progress: getPercent('review'), color: 'bg-blue-500', count: counts['review'] || 0 },
            { label: 'Launch', progress: getPercent('launch'), color: 'bg-amber-500', count: counts['launch'] || 0 },
        ];
    };

    const healthData = calculateHealth();

    return (
        <div className='rounded-3xl bg-surface border border-border p-8'>
            <div className='flex items-center justify-between mb-8'>
                <h2 className='text-lg font-bold text-foreground'>Project Health</h2>
                {projects && projects.length > 0 && (
                    <span className='text-xs font-bold text-foreground/50 bg-foreground/5 px-2 py-1 rounded-md uppercase tracking-wider'>
                        {projects.length} Active
                    </span>
                )}
            </div>

            {isLoading ? (
                <div className='space-y-6 animate-pulse'>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className='h-2 bg-foreground/5 rounded-full w-full'></div>
                    ))}
                </div>
            ) : projects?.length === 0 ? (
                <div className='py-8 text-center'>
                    <p className='text-sm text-foreground/50'>No active projects in the pipeline.</p>
                </div>
            ) : (
                <div className='space-y-6'>
                    {healthData.map((p) => (
                        <div key={p.label}>
                            <div className='flex justify-between text-xs font-semibold mb-2'>
                                <span className='text-foreground/50'>{p.label} <span className="opacity-50 ml-1">({p.count})</span></span>
                                <span className='text-foreground'>{p.progress}%</span>
                            </div>
                            <div className='h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden'>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${p.progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={cn('h-full rounded-full', p.color)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className='mt-12 p-6 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-center'>
                <div className='text-sm font-bold text-[#D4AF37] mb-2'>Optimize Agency ROI</div>
                <p className='text-xs text-foreground/50 leading-relaxed'>
                    Real-time pipeline monitoring enabled. Phase distribution is calculated automatically.
                </p>
            </div>
        </div>
    );
}
