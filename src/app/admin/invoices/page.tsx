import { createClient } from '@/utils/supabase/server';
import AdminInvoicesClient from './AdminInvoicesClient';

export default async function AdminInvoicesPage() {
    const supabase = await createClient();

    // Fetch projects for the invoice creation dropdown
    const { data: projects } = await supabase
        .from('projects')
        .select(`
            id,
            name,
            clients ( company_name )
        `)
        .neq('status', 'completed');

    // Fetch all invoices with project context
    const { data: invoices } = await supabase
        .from('invoices')
        .select(`
            *,
            projects ( name, clients ( company_name ) )
        `)
        .order('created_at', { ascending: false });

    return (
        <AdminInvoicesClient
            initialInvoices={invoices || []}
            projects={projects || []}
        />
    );
}
