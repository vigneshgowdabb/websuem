import { createClient } from '@/utils/supabase/server'
import DashboardClient from './DashboardClient'

export default async function AdminPage() {
  const supabase = await createClient()

  // Fetch recent leads from Supabase
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    console.error('Error fetching leads:', error)
  }

  return (
    <DashboardClient initialLeads={leads || []} />
  )
}
