'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    CheckCircle2,
    Circle,
    Clock,
    FileText,
    Download,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';

export default function ClientPortalClient({ userName, activeProject, invoices }: { userName: string, activeProject: any, invoices: any[] }) {
    // Translate DB status to timeline array
    const timelinePhases = ['discovery', 'design', 'build', 'review', 'launch', 'completed'];
    const currentIndex = activeProject ? timelinePhases.indexOf(activeProject.status) : -1;

    const timeline = timelinePhases.map((phase, index) => {
        let status = 'pending';
        if (index < currentIndex || activeProject?.status === 'completed') status = 'completed';
        else if (index === currentIndex) status = 'active';

        return {
            step: phase.charAt(0).toUpperCase() + phase.slice(1),
            status
        };
    });

    return (
        <div className='space-y-8 max-w-6xl'>
            {/* Welcome Header */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold text-foreground tracking-tight'>Welcome back{userName}</h1>
                    <p className='text-foreground/50 text-sm mt-1'>Here is the latest status of your project at Websuem.</p>
                </div>
                <div className='flex gap-2'>
                    <Link href="/portal/deliverables" className='px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-xl text-sm font-semibold text-foreground hover:bg-foreground/10 transition-colors'>
                        View Assets
                    </Link>
                    <Link href="/contact" className='px-4 py-2 bg-[#D4AF37] rounded-xl text-sm font-semibold text-background hover:bg-[#B8972D] transition-colors'>
                        Contact Support
                    </Link>
                </div>
            </div>

            {/* Main Project Card */}
            <div className='p-8 rounded-3xl bg-surface border border-border'>
                {!activeProject ? (
                    <div className='text-center py-12'>
                        <div className='w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <span className='text-2xl'>✨</span>
                        </div>
                        <h2 className='text-xl font-bold text-foreground mb-2'>Let's get started</h2>
                        <p className='text-foreground/50 text-sm max-w-md mx-auto'>
                            Your onboarding is complete. The Websuem team is reviewing your requirements and will set up your project tracker shortly.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className='flex items-center justify-between mb-8'>
                            <div>
                                <div className='text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-1'>Current Project</div>
                                <h2 className='text-2xl font-bold text-foreground'>{activeProject.name}</h2>
                            </div>
                            <div className='text-right'>
                                <div className='text-sm font-semibold text-foreground capitalize'>{activeProject.status} Phase</div>
                                <div className='text-xs text-foreground/50 mt-1'>
                                    Updated {activeProject.last_update ? format(parseISO(activeProject.last_update), 'MMM dd, h:mm a') : 'Recently'}
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className='mb-12'>
                            <div className='flex justify-between text-sm font-semibold mb-4'>
                                <span className='text-foreground/60'>Project Progress</span>
                                <span className='text-foreground'>{activeProject.progress}%</span>
                            </div>
                            <div className='h-2.5 w-full bg-foreground/5 rounded-full overflow-hidden'>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${activeProject.progress}%` }}
                                    className='h-full bg-gradient-to-r from-[#D4AF37] to-amber-200 rounded-full'
                                />
                            </div>
                        </div>

                        {/* Timeline Steps */}
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
                            {timeline.map((item, idx) => (
                                <div key={item.step} className='flex flex-col items-center text-center'>
                                    <div className={cn(
                                        'w-10 h-10 rounded-full flex items-center justify-center mb-3 border',
                                        item.status === 'completed' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/50 text-[#D4AF37]' :
                                            item.status === 'active' ? 'bg-foreground/10 border-foreground/20 text-foreground animate-pulse' :
                                                'bg-transparent border-border text-foreground/30'
                                    )}>
                                        {item.status === 'completed' ? <CheckCircle2 className='w-5 h-5' /> :
                                            item.status === 'active' ? <Clock className='w-5 h-5' /> :
                                                <Circle className='w-5 h-5' />}
                                    </div>
                                    <div className={cn(
                                        'text-[10px] font-bold uppercase tracking-widest',
                                        item.status === 'completed' ? 'text-[#D4AF37]' :
                                            item.status === 'active' ? 'text-foreground' :
                                                'text-foreground/30'
                                    )}>
                                        {item.step}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Recent Invoices */}
                <div className='p-8 rounded-3xl bg-surface border border-border flex flex-col'>
                    <h3 className='text-lg font-bold text-foreground mb-8'>Recent Invoices</h3>
                    <div className='space-y-4 flex-1'>
                        {invoices.length === 0 ? (
                            <div className='text-center py-8 text-sm text-foreground/50'>
                                No recent invoices attached.
                            </div>
                        ) : (
                            invoices.map((inv) => (
                                <div key={inv.id} className='flex items-center justify-between p-4 rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors group'>
                                    <div className='flex items-center gap-4'>
                                        <div className='p-2 rounded-xl bg-foreground/5 text-foreground/60'>
                                            <FileText className='w-5 h-5' />
                                        </div>
                                        <div>
                                            <div className='text-sm font-semibold text-foreground'>{inv.invoice_number}</div>
                                            <div className='text-xs text-foreground/50'>Due {format(parseISO(inv.due_date), 'MMM dd, yyyy')}</div>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-6'>
                                        <div className='text-right'>
                                            <div className='text-sm font-bold text-foreground'>${inv.amount.toLocaleString()}</div>
                                            <div className={cn(
                                                'text-[10px] font-bold uppercase tracking-widest',
                                                inv.status === 'paid' ? 'text-emerald-500' :
                                                    inv.status === 'overdue' ? 'text-rose-500' : 'text-amber-500'
                                            )}>
                                                {inv.status}
                                            </div>
                                        </div>
                                        {inv.pdf_url && (
                                            <a href={inv.pdf_url} target="_blank" rel="noopener noreferrer" className='text-foreground/40 hover:text-foreground'>
                                                <Download className='w-4 h-4' />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <Link href="/portal/invoices" className='w-full mt-6 py-3 text-sm font-semibold text-foreground/50 hover:text-foreground transition-colors border-t border-border flex justify-center'>
                        View All Billing History
                    </Link>
                </div>

                {/* Deliverables / External Links */}
                <div className='p-8 rounded-3xl bg-surface border border-border flex flex-col'>
                    <h3 className='text-lg font-bold text-foreground mb-8'>Active Deliverables</h3>
                    <div className='space-y-4 flex-1'>
                        {!activeProject?.deliverables || activeProject.deliverables.length === 0 ? (
                            <div className='text-center py-8 text-sm text-foreground/50'>
                                Project files and deliverables will appear here once generated.
                            </div>
                        ) : (
                            activeProject.deliverables.map((d: any) => (
                                <Link
                                    key={d.id}
                                    href={d.url}
                                    target="_blank"
                                    className='flex items-center justify-between p-4 rounded-2xl bg-foreground/5 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 border border-transparent transition-all group'
                                >
                                    <div className='flex items-center gap-4'>
                                        <div className='text-sm font-semibold text-foreground group-hover:text-[#D4AF37] transition-colors'>{d.name}</div>
                                        <span className='px-2 py-0.5 rounded-md bg-foreground/5 text-[10px] text-foreground/50 font-bold uppercase'>{d.type}</span>
                                    </div>
                                    <ChevronRight className='w-4 h-4 text-foreground/40 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all' />
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
