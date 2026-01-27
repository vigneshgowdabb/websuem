import { Mail } from "lucide-react"

export default function EmailPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-20 h-20 bg-lavender rounded-full flex items-center justify-center">
                <Mail className="w-10 h-10 text-deep-purple" />
            </div>
            <div className="max-w-md space-y-2">
                <h2 className="text-2xl font-bold font-heading text-deep-purple">Email & Messages</h2>
                <p className="text-gray-500">
                    Connect your email provider to manage communications directly from your dashboard.
                </p>
            </div>
            <button className="px-6 py-3 bg-deep-purple text-white rounded-xl hover:bg-deep-purple/90 transition-colors shadow-sm font-medium">
                Connect Google Workspace
            </button>
        </div>
    )
}
