import Link from "next/link";
import { LayoutDashboard, Users, Calendar, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

// Sidebar Navigation Links
const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Leads", href: "/dashboard/leads", icon: Users },
    { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function CrmLayout({ children }: { children: React.ReactNode }) {
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
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="font-heading font-bold text-xl">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Admin User</span>
                        <div className="w-8 h-8 bg-deep-purple rounded-full text-white flex items-center justify-center text-xs font-bold">
                            AU
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
