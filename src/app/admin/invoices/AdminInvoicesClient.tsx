'use client';

import { useState } from 'react';
import { createInvoice, updateInvoiceStatus } from '@/app/actions/invoices';
import toast from 'react-hot-toast';
import { format, parseISO } from 'date-fns';
import { Download, FileText } from 'lucide-react';

export default function AdminInvoicesClient({ initialInvoices, projects }: { initialInvoices: any[], projects: any[] }) {
    const [isCreating, setIsCreating] = useState(false);

    async function handleCreateInvoice(formData: FormData) {
        const res = await createInvoice(formData);
        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success('Invoice Created!');
            setIsCreating(false);
        }
    }

    async function handleStatusChange(invoiceId: string, status: string) {
        const res = await updateInvoiceStatus(invoiceId, status);
        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success(`Invoice marked as ${status}`);
        }
    }

    return (
        <div className='max-w-6xl space-y-8'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-foreground tracking-tight'>Manage Invoices</h1>
                    <p className='text-foreground/50 text-sm mt-1'>Track billing, payments, and financial history.</p>
                </div>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className='bg-[#D4AF37] text-background px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#B8972D] transition-colors'
                >
                    {isCreating ? 'Cancel' : '+ New Invoice'}
                </button>
            </div>

            {isCreating && (
                <div className='p-6 bg-surface border border-border rounded-3xl'>
                    <h3 className='text-lg font-bold text-foreground mb-4'>Create New Invoice</h3>
                    <form action={handleCreateInvoice} className='space-y-4 max-w-md'>
                        <div>
                            <label className='block text-xs font-semibold text-foreground/50 mb-2'>Select Project</label>
                            <select name="projectId" required className='w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#D4AF37]'>
                                <option value="">-- Choose Project --</option>
                                {projects.map((p: any) => (
                                    <option key={p.id} value={p.id}>{p.name} ({p.clients?.company_name})</option>
                                ))}
                            </select>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-xs font-semibold text-foreground/50 mb-2'>Invoice Number</label>
                                <input type="text" name="invoiceNumber" required placeholder="e.g. INV-2026-01" className='w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#D4AF37]' />
                            </div>
                            <div>
                                <label className='block text-xs font-semibold text-foreground/50 mb-2'>Amount ($)</label>
                                <input type="number" step="0.01" name="amount" required placeholder="e.g. 1500.00" className='w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#D4AF37]' />
                            </div>
                        </div>
                        <div>
                            <label className='block text-xs font-semibold text-foreground/50 mb-2'>Due Date</label>
                            <input type="date" name="dueDate" required className='w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#D4AF37]' />
                        </div>
                        <div>
                            <label className='block text-xs font-semibold text-foreground/50 mb-2'>PDF Link / URL</label>
                            <input type="url" name="pdfUrl" placeholder="https://..." className='w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#D4AF37]' />
                        </div>
                        <button type="submit" className='bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold'>Issue Invoice</button>
                    </form>
                </div>
            )}

            <div className='bg-surface border border-border rounded-3xl overflow-hidden'>
                {initialInvoices.length === 0 ? (
                    <div className='p-12 text-center'>
                        <div className='text-foreground/40 mb-4 text-3xl'>🧾</div>
                        <h3 className='text-lg font-bold text-foreground mb-2'>No invoices generated</h3>
                        <p className='text-sm text-foreground/50'>Billing records will populate here once created.</p>
                    </div>
                ) : (
                    <div className='divide-y divide-border'>
                        {initialInvoices.map((inv: any) => (
                            <div key={inv.id} className='p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-foreground/5 transition-colors'>
                                <div className='flex items-center gap-4'>
                                    <div className='p-3 rounded-xl bg-foreground/5 text-foreground/60'>
                                        <FileText className='w-6 h-6' />
                                    </div>
                                    <div>
                                        <div className='flex items-center gap-3 mb-1'>
                                            <h3 className='font-bold text-foreground'>{inv.invoice_number}</h3>
                                            <select
                                                defaultValue={inv.status}
                                                onChange={(e) => handleStatusChange(inv.id, e.target.value)}
                                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border-0 focus:ring-0 cursor-pointer ${inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    inv.status === 'overdue' ? 'bg-rose-500/10 text-rose-500' :
                                                        'bg-amber-500/10 text-amber-500'
                                                    }`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="overdue">Overdue</option>
                                            </select>
                                        </div>
                                        <p className='text-xs text-foreground/50'>
                                            {inv.projects?.clients?.company_name} — {inv.projects?.name}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-6 justify-between md:justify-end'>
                                    <div className='text-left md:text-right'>
                                        <div className='text-sm font-bold text-foreground'>${inv.amount.toLocaleString()}</div>
                                        <div className='text-xs text-foreground/50'>Due {format(parseISO(inv.due_date), 'MMM dd, yyyy')}</div>
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
