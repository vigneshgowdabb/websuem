import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { Services } from "@/components/marketing/Services";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6 text-center mb-16">
                    <h1 className="font-heading text-5xl font-bold mb-6">Our Services</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive designs, automation, and strategies to help your business grow.
                    </p>
                </div>

                {/* Reusing the Services component which has the Bento Grid */}
                <div className="bg-gray-50 py-12 rounded-3xl mx-4 md:mx-0">
                    <Services />
                </div>

                {/* Detailed breakdown could go here, for now relying on the Bento component */}
                <div className="container mx-auto px-6 mt-20 text-center">
                    <div className="bg-deep-purple text-white rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-vibrant-yellow rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-soft-pink rounded-full blur-3xl opacity-20 -ml-16 -mb-16 pointer-events-none"></div>

                        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to transform your online presence?</h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
                            Whether you need a new website, a brand refresh, or AI automation, we deliver premium results in record time.
                        </p>
                        <Button size="lg" className="bg-vibrant-yellow text-deep-purple hover:bg-vibrant-yellow/90 hover:shadow-glow font-bold relative z-10">
                            Get Your Custom Quote
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
