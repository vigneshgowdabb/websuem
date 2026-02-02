import { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Websuem collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen font-body text-deep-purple selection:bg-vibrant-yellow selection:text-deep-purple">
      <Header />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-deep-purple mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 mb-4">
                We collect information you provide directly to us, such as when you fill out a contact form,
                request a quote, or communicate with us. This may include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Name and contact information (email address, phone number)</li>
                <li>Business information (company name, website URL)</li>
                <li>Project details and requirements</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-deep-purple mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Process and deliver the services you request</li>
                <li>Send you updates about your project</li>
                <li>Improve our services and develop new features</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-deep-purple mb-4">
                3. Information Sharing
              </h2>
              <p className="text-gray-600">
                We do not sell, trade, or rent your personal information to third parties. We may share your
                information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
                <li>With service providers who assist in our operations</li>
                <li>To comply with legal requirements or protect our rights</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
                <li>With your consent</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-deep-purple mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However,
                no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-deep-purple mb-4">
                5. Cookies and Tracking
              </h2>
              <p className="text-gray-600">
                We may use cookies and similar tracking technologies to enhance your experience on our website.
                You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-deep-purple mb-4">
                6. Your Rights
              </h2>
              <p className="text-gray-600 mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to or restrict certain processing</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-deep-purple mb-4">
                7. Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-deep-purple font-semibold mt-4">
                <a href="mailto:hello@websuem.com" className="hover:text-vibrant-yellow transition-colors">
                  hello@websuem.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
