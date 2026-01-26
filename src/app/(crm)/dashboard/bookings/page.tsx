import { Calendar as CalendarIcon, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingsPage() {
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-deep-purple">Bookings</h2>
                    <p className="text-gray-500">View and manage scheduled calls.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline">Sync Calendar</Button>
                    <Button className="bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 font-bold">
                        + New Booking
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Calendar View Placeholder */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-[600px] flex items-center justify-center bg-gray-50/50">
                    <div className="text-center text-gray-400">
                        <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Full Calendar View Component</p>
                        <p className="text-xs mt-2">(To be implemented with react-big-calendar or fullcalendar)</p>
                    </div>
                </div>

                {/* Upcoming List */}
                <div className="space-y-6">
                    <h3 className="font-bold text-lg font-heading">Upcoming This Week</h3>

                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-vibrant-yellow transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <span className="bg-lavender text-deep-purple text-xs font-bold px-3 py-1 rounded-full">Discovery Call</span>
                                <button className="text-gray-300 hover:text-deep-purple">•••</button>
                            </div>

                            <h4 className="font-bold text-deep-purple text-lg mb-1">TechCorp Inc.</h4>
                            <p className="text-sm text-gray-500 mb-4">Discussing new website project requirements.</p>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-vibrant-yellow" />
                                    <span className="font-medium">Tue, Oct {24 + i}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-vibrant-yellow" />
                                    <span>2:00 PM - 2:30 PM (30m)</span>
                                </div>
                                <div className="flex items-center gap-2 text-blue-600">
                                    <Video className="w-4 h-4" />
                                    <a href="#" className="hover:underline">Join Google Meet</a>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2">
                                <Button size="sm" variant="outline" className="w-full text-xs">Reschedule</Button>
                                <Button size="sm" className="w-full bg-deep-purple text-white hover:bg-deep-purple/90 text-xs">Start Meeting</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
