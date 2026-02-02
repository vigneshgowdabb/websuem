import { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Websuem. Book a free consultation call or send us a message about your project.",
  openGraph: {
    title: "Contact Websuem | Start Your Project",
    description: "Ready to take your online presence to the next level? Let's talk about your project.",
  },
};

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Left Column: Info */}
                        <div>
                            <h1 className="font-heading text-5xl font-bold mb-6">Let&apos;s talk about your project</h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Ready to take your online presence to the next level? Fill out the form or book a call directly.
                            </p>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-lavender rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-deep-purple" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-lg mb-1">Email Us</h3>
                                        <a
                                            href="mailto:hello@websuem.com"
                                            className="text-gray-600 hover:text-vibrant-yellow transition-colors"
                                        >
                                            hello@websuem.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-mint rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-deep-purple" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-lg mb-1">Response Time</h3>
                                        <p className="text-gray-600">Usually within 2 hours during business hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-soft-pink rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-deep-purple" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-semibold text-lg mb-1">Location</h3>
                                        <p className="text-gray-600">Remote-first, serving clients in 12+ countries</p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust indicators */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <p className="text-sm text-gray-500 mb-3">What to expect:</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-gray-700">
                                        <span className="w-1.5 h-1.5 bg-vibrant-yellow rounded-full" aria-hidden="true"></span>
                                        Free 15-minute strategy call
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700">
                                        <span className="w-1.5 h-1.5 bg-vibrant-yellow rounded-full" aria-hidden="true"></span>
                                        No pitch, no pressure
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-700">
                                        <span className="w-1.5 h-1.5 bg-vibrant-yellow rounded-full" aria-hidden="true"></span>
                                        Custom proposal within 24 hours
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <ContactForm />

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
