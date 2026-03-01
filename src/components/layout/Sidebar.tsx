'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/actions/auth';
import Image from 'next/image';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  Settings,
  LogOut,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  role: 'admin' | 'client';
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const adminLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Projects', href: '/admin/projects', icon: Briefcase },
    { name: 'Invoices', href: '/admin/invoices', icon: FileText },
  ];

  const clientLinks = [
    { name: 'Overview', href: '/portal', icon: LayoutDashboard },
    { name: 'My Projects', href: '/portal/projects', icon: Briefcase },
    { name: 'Invoices', href: '/portal/invoices', icon: FileText },
  ];

  const links = role === 'admin' ? adminLinks : clientLinks;

  return (
    <div className='fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-border flex flex-col z-40'>
      {/* Sidebar Header */}
      <div className='p-6 flex items-center gap-3 border-b border-border min-h-[80px]'>
        <Link href='/' className='relative h-8 w-32 block'>
          <Image src="/images/Logo1.png" alt="Websuem Logo" fill className="object-contain object-left mix-blend-screen invert hidden dark:block" />
          <Image src="/images/Logo1.png" alt="Websuem Logo" fill className="object-contain object-left mix-blend-multiply block dark:hidden" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-4 space-y-2 mt-4'>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all group',
                isActive
                  ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20'
                  : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
              )}
            >
              <link.icon className={cn('w-5 h-5', isActive ? 'text-[#D4AF37]' : 'text-foreground/50 group-hover:text-foreground')} />
              <span className='font-medium'>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className='p-4 border-t border-border'>
        <div className='p-4 bg-foreground/5 rounded-2xl mb-4'>
          <div className='text-xs text-foreground/50 uppercase tracking-widest mb-2'>Account</div>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-200' />
            <div className='flex-1 min-w-0'>
              <div className='text-sm font-semibold text-foreground truncate'>Founder</div>
              <div className={cn('text-xs truncate font-bold uppercase tracking-widest', role === 'admin' ? 'text-[#D4AF37]' : 'text-foreground/50')}>
                {role === 'admin' ? 'Admin Mode' : 'Client Mode'}
              </div>
            </div>
          </div>
        </div>
        <form action={signOut}>
          <button className='w-full flex items-center gap-3 px-4 py-3 text-foreground/60 hover:text-red-500 transition-colors'>
            <LogOut className='w-5 h-5' />
            <span className='font-medium'>Logout</span>
          </button>
        </form>
      </div>
    </div>
  );
}
