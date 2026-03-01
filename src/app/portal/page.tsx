import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ClientPortalClient from './ClientPortalClient';

export default async function ClientDashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 1. Fetch Profile Name
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single();

  const userName = profile?.full_name
    ? `, ${profile.full_name.split(' ')[0]}`
    : '';

  // 2. Fetch Client Record
  const { data: clientData } = await supabase
    .from('clients')
    .select('id')
    .eq('profile_id', user.id)
    .single();

  let activeProject = null;
  let allInvoices = [];

  // 3. If they are an active client, fetch their project data
  if (clientData?.id) {
    // Fetch latest active project including deliverables
    const { data: project } = await supabase
      .from('projects')
      .select(`
        *,
        deliverables (*)
      `)
      .eq('client_id', clientData.id)
      .neq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    activeProject = project;

    // Fetch up to 3 recent invoices across all their projects
    const { data: invoices } = await supabase
      .from('invoices')
      .select('*, projects!inner(client_id)')
      .eq('projects.client_id', clientData.id)
      .order('created_at', { ascending: false })
      .limit(3);

    allInvoices = invoices || [];
  }

  return (
    <ClientPortalClient
      userName={userName}
      activeProject={activeProject}
      invoices={allInvoices}
    />
  );
}
