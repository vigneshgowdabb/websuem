'use client';

import StatsGrid from '@/components/admin/StatsGrid';
import RecentLeads from '@/components/admin/RecentLeads';
import ProjectHealth from '@/components/admin/ProjectHealth';
import AnalyticsChart from '@/components/admin/AnalyticsChart';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export interface Lead {
  id: string;
  name: string;
  email: string;
  service_interest: string | null;
  status: string;
  created_at: string;
}

interface DashboardClientProps {
  initialLeads: Lead[];
}

export default function DashboardClient({ initialLeads }: DashboardClientProps) {
  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-foreground tracking-tight'>Admin CRM</h1>
          <p className='text-foreground/50 text-sm mt-1'>Welcome back, track your agency performance here.</p>
        </div>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => toast('Client creation linked to Supabase Dashboard. Invite users directly via your Supabase Auth Panel to bypass email verification.', { icon: 'ℹ️' })}
            className='bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors'
          >
            <UserPlus size={16} /> Add Client
          </button>
          <button className='bg-[#D4AF37] hover:bg-[#B8972D] text-background px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2'>
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid totalLeads={initialLeads.length} />

      {/* Analytics Chart Row */}
      <div className='grid grid-cols-1 gap-6'>
        <AnalyticsChart />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Recent Leads */}
        <RecentLeads initialLeads={initialLeads} />

        {/* Project Pipeline Activity */}
        <ProjectHealth />
      </div>
    </div>
  );
}
