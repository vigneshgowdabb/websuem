import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Download, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export default async function ClientInvoicesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch the client's record
    const { data: clientData } = await supabase
        .from('clients')
        .select('id')
        .eq('profile_id', user.id)
        .single();

    let invoices: any[] = [];

    if (clientData?.id) {
        const { data } = await supabase
            .from('invoices')
            .select('*, projects!inner(client_id, name)')
            .eq('projects.client_id', clientData.id)
            .order('created_at', { ascending: false });

        invoices = data || [];
    }

    return (
        <div className='max-w-6xl space-y-8'>
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-foreground tracking-tight'>Invoices</h1>
                <p className='text-foreground/50 text-sm mt-1'>View your billing history and manage payments.</p>
            </div>

            <div className='bg-surface border border-border rounded-3xl overflow-hidden'>
                {invoices.length === 0 ? (
                    <div className='p-12 text-center'>
                        <div className='text-foreground/40 mb-4 text-3xl'>🧾</div>
                        <h3 className='text-lg font-bold text-foreground mb-2'>No invoices yet</h3>
                        <p className='text-sm text-foreground/50'>Your billing history will appear here once your first project begins.</p>
                    </div>
                ) : (
                    <div className='divide-y divide-border'>
                        {invoices.map((inv: any) => (
                            <div key={inv.id} className='p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-foreground/5 transition-colors'>
                                <div className='flex items-center gap-4'>
                                    <div className='p-3 rounded-xl bg-foreground/5 text-foreground/60'>
                                        <FileText className='w-6 h-6' />
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-foreground mb-1'>{inv.invoice_number}</h3>
                                        <p className='text-xs text-foreground/50'>
                                            Project: {inv.projects?.name}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-6 justify-between md:justify-end'>
                                    <div className='text-left md:text-right'>
                                        <div className='text-sm font-bold text-foreground'>${inv.amount.toLocaleString()}</div>
                                        <div className='flex items-center justify-end gap-2 mt-1'>
                                            <span className={cn(
                                                'text-[10px] font-bold uppercase tracking-wider',
                                                inv.status === 'paid' ? 'text-emerald-500' :
                                                    inv.status === 'overdue' ? 'text-rose-500' : 'text-amber-500'
                                            )}>
                                                {inv.status}
                                            </span>
                                            <span className='text-xs text-foreground/50'>•</span>
                                            <span className='text-xs text-foreground/50'>
                                                Due {format(parseISO(inv.due_date), 'MMM dd, yyyy')}
                                            </span>
                                        </div>
                                    </div>
                                    {inv.pdf_url && (
                                        <a href={inv.pdf_url} target="_blank" rel="noopener noreferrer" className='p-2 rounded-xl bg-foreground/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] text-foreground/50 transition-colors'>
                                            <Download className='w-5 h-5' />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
