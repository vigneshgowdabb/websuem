import { createClient } from '@/utils/supabase/server';
import AdminProjectsClient from './AdminProjectsClient';

export default async function AdminProjectsPage() {
    const supabase = await createClient();

    // Fetch clients who have profiles
    const { data: clients } = await supabase
        .from('clients')
        .select(`
            id,
            company_name,
            profiles ( full_name, role )
        `);

    // Fetch projects with their associated client info
    const { data: projects } = await supabase
        .from('projects')
        .select(`
            *,
            clients ( company_name, profiles ( full_name ) ),
            deliverables (*)
        `)
        .order('created_at', { ascending: false });

    return (
        <AdminProjectsClient
            initialProjects={projects || []}
            clients={clients || []}
        />
    );
}
