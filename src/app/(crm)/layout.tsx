import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Users, Calendar, Settings, Mail, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/crm/SignOutButton";

// Sidebar Navigation Links
const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Leads", href: "/dashboard/leads", icon: Users },
    { name: "Clients", href: "/dashboard/clients", icon: Building2 },
    { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
    { name: "Email", href: "/dashboard/email", icon: Mail },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default async function CrmLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Get CRM user profile
    let crmUser = null;
    if (user) {
        const { data } = await supabase
            .from('crm_users')
            .select('*')
            .eq('id', user.id)
            .single();
        crmUser = data;
    }

    const displayName = crmUser?.full_name || user?.user_metadata?.full_name || user?.email || 'User';
    const initials = displayName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="flex h-screen bg-gray-50 font-body text-deep-purple">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-vibrant-yellow rounded-lg flex items-center justify-center font-bold text-deep-purple">W</div>
                    <span className="font-heading font-bold text-xl tracking-tight">Websuem CRM</span>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-xl hover:bg-lavender hover:text-deep-purple transition-colors group"
                        >
                            <item.icon className="w-5 h-5 group-hover:text-deep-purple" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <SignOutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="font-heading font-bold text-xl">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{displayName}</span>
                        {crmUser?.avatar_url ? (
                            <Image
                                src={crmUser.avatar_url}
                                alt={displayName}
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-8 h-8 bg-deep-purple rounded-full text-white flex items-center justify-center text-xs font-bold">
                                {initials}
                            </div>
                        )}
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
