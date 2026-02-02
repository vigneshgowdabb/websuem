import { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Websuem - an AI-powered agency on a mission to democratize premium web services. Quality first, speed second, affordability third.",
  openGraph: {
    title: "About Websuem | AI-Powered Web Agency",
    description: "Learn about our mission to deliver agency-level work at freelancer prices.",
  },
};

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="font-heading text-5xl font-bold mb-6">About Websuem</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            We are an AI-powered agency on a mission to democratize premium web services.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div className="bg-lavender rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center">
                            <h2 className="font-heading text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                To democratize access to premium web services for businesses worldwide, delivering exceptional quality at speeds and prices that traditional agencies cannot match.
                            </p>
                        </div>
                        <div className="bg-cream rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center">
                            <h2 className="font-heading text-3xl font-bold mb-4">Our Values</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="bg-vibrant-yellow text-deep-purple rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mt-1">1</span>
                                    <span className="text-lg text-gray-700"><strong>Quality First.</strong> Every deliverable reflects expertise.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-vibrant-yellow text-deep-purple rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mt-1">2</span>
                                    <span className="text-lg text-gray-700"><strong>Speed Second.</strong> Most projects delivered in 1-2 weeks.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-vibrant-yellow text-deep-purple rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mt-1">3</span>
                                    <span className="text-lg text-gray-700"><strong>Affordability Third.</strong> Premium work without the premium markup.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto prose prose-lg text-gray-600">
                        <h3 className="font-heading text-2xl font-bold text-deep-purple">Why we exist</h3>
                        <p>
                            The traditional agency model is broken. It&apos;s too slow, too expensive, and often disconnects the client from the creator. Freelancers can be hit-or-miss.
                            Websuem bridges this gap by leveraging AI to handle repetitive tasks, allowing us to focus on creativity and strategy—delivering agency-level work at freelancer prices.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
