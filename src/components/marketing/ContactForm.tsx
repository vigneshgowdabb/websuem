"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createLead } from "@/lib/actions/leads";

export function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);

        let service = formData.get("service") as "website" | "social" | "branding" | "automation" | "other" | "multiple";
        if (!["website", "social", "branding", "automation", "multiple"].includes(service)) {
            service = "other";
        }

        const input = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            service_interested: service,
            message: formData.get("message") as string,
            source: "website" as const,
            status: "new" as const,
        };

        try {
            const result = await createLead(input);

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess(true);
                (e.target as HTMLFormElement).reset();
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-soft-lg border border-gray-100">
            <h2 className="font-heading text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-deep-purple">
                            Name
                        </label>
                        <input
                            required
                            type="text"
                            name="name"
                            id="name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-yellow focus:ring-2 focus:ring-vibrant-yellow/20 outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-deep-purple">
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-yellow focus:ring-2 focus:ring-vibrant-yellow/20 outline-none transition-all"
                            placeholder="john@company.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-bold text-deep-purple">
                        Service Interested In
                    </label>
                    <select
                        name="service"
                        id="service"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-yellow focus:ring-2 focus:ring-vibrant-yellow/20 outline-none transition-all bg-white"
                    >
                        <option value="">Select a service...</option>
                        <option value="website">Website Development</option>
                        <option value="social">Social Media</option>
                        <option value="branding">Brand Identity</option>
                        <option value="automation">AI Automation</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-deep-purple">
                        Message
                    </label>
                    <textarea
                        required
                        name="message"
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-yellow focus:ring-2 focus:ring-vibrant-yellow/20 outline-none transition-all"
                        placeholder="Tell us about your project..."
                    ></textarea>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}
                {success && (
                    <div className="text-green-600 text-sm font-semibold bg-green-50 p-3 rounded-lg">
                        Message sent! We&apos;ll get back to you soon.
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full bg-deep-purple text-white hover:bg-deep-purple/90 hover:shadow-lg font-bold py-6 h-auto"
                >
                    {loading ? "Sending..." : "Send Message"}
                </Button>
            </form>
        </div>
    );
}
