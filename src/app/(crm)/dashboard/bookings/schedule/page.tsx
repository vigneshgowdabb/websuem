'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CalComEmbed } from '@/components/crm/CalComEmbed'
import { CALCOM_USERNAME } from '@/lib/calcom/config'

export default function SchedulePage() {
    const router = useRouter()
    const [bookingComplete, setBookingComplete] = useState(false)

    const handleBookingSuccess = () => {
        setBookingComplete(true)
        // Redirect after a short delay
        setTimeout(() => {
            router.push('/dashboard/bookings')
        }, 2000)
    }

    if (!CALCOM_USERNAME) {
        return (
            <div>
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                    <h2 className="text-2xl font-bold font-heading text-deep-purple mb-4">
                        Calendar Not Configured
                    </h2>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        To enable booking functionality, please set up your Cal.com integration
                        by adding your Cal.com username to the environment variables.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto mb-6">
                        <p className="text-sm font-mono text-gray-600">
                            NEXT_PUBLIC_CALCOM_USERNAME=your-username
                        </p>
                    </div>
                    <a
                        href="https://cal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-vibrant-yellow hover:underline"
                    >
                        Create a Cal.com account
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        )
    }

    if (bookingComplete) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-deep-purple mb-2">
                        Booking Confirmed!
                    </h2>
                    <p className="text-gray-500">Redirecting to bookings...</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h2 className="text-2xl font-bold font-heading text-deep-purple">
                            Schedule a Meeting
                        </h2>
                        <p className="text-gray-500">
                            Select a time that works for you
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ height: '700px' }}>
                <CalComEmbed
                    eventType="30min"
                    onBookingSuccessful={handleBookingSuccess}
                />
            </div>
        </div>
    )
}
