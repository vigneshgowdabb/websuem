'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createInvoice(formData: FormData) {
    const supabase = await createClient();

    const projectId = formData.get('projectId') as string;
    const amount = parseFloat(formData.get('amount') as string);
    const dueDate = formData.get('dueDate') as string;
    const invoiceNumber = formData.get('invoiceNumber') as string;
    const pdfUrl = formData.get('pdfUrl') as string;

    if (!projectId || !amount || !dueDate || !invoiceNumber) {
        return { error: 'Required fields are missing.' };
    }

    const { error } = await supabase.from('invoices').insert({
        project_id: projectId,
        amount,
        due_date: new Date(dueDate).toISOString(),
        invoice_number: invoiceNumber,
        pdf_url: pdfUrl || null,
        status: 'pending' // Default status
    });

    if (error) {
        console.error('Error creating invoice:', error);
        return { error: 'Failed to create invoice.' };
    }

    revalidatePath('/admin/invoices');
    return { success: true };
}

export async function updateInvoiceStatus(invoiceId: string, status: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('invoices')
        .update({ status })
        .eq('id', invoiceId);

    if (error) {
        console.error('Error updating invoice:', error);
        return { error: 'Failed to update invoice.' };
    }

    revalidatePath('/admin/invoices');
    return { success: true };
}
