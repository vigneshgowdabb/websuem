'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { signOut } from '@/lib/actions/auth'

export function SignOutButton() {
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
        </button>
    )
}
