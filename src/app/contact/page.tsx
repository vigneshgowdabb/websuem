import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/marketing/ContactForm";


export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Left Column: Info */}
                        <div>
                            <h1 className="font-heading text-5xl font-bold mb-6">Let's talk about your project</h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Ready to take your online presence to the next level? Fill out the form or book a call directly.
                            </p>

                            <div className="space-y-8 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-lavender rounded-full flex items-center justify-center text-deep-purple">
                                        📧
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg">Email us</h3>
                                        <p className="text-gray-600">hello@websuem.com</p>
                                        <p className="text-sm text-gray-500">Response within 24 hours</p>
                                    </div>
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
