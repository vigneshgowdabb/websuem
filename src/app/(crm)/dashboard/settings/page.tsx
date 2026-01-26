import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold font-heading text-deep-purple">Settings</h2>
                <p className="text-gray-500">Manage your account and preferences.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-lg mb-1">Profile Information</h3>
                    <p className="text-sm text-gray-500">Update your personal details.</p>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-deep-purple">First Name</label>
                            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200" defaultValue="Admin" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-deep-purple">Last Name</label>
                            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200" defaultValue="User" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deep-purple">Email Address</label>
                        <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200" defaultValue="admin@websuem.com" />
                    </div>

                    <div className="pt-4">
                        <Button className="bg-deep-purple text-white hover:bg-deep-purple/90">Save Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
