import { Metadata } from "next";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions for using Websuem's services.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen font-body text-warm-cream">
      <Header />

      <main className="flex-grow pt-32 pb-20 bg-deep-green">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
            Terms of Service
          </h1>

          <p className="text-muted-cream mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-cream">
                By accessing or using Websuem&apos;s services, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                2. Services Description
              </h2>
              <p className="text-muted-cream">
                Websuem provides web development, design, branding, social media management, and AI automation
                services. The specific scope, deliverables, timeline, and pricing for each project will be
                outlined in a separate proposal or agreement.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                3. Client Responsibilities
              </h2>
              <p className="text-muted-cream mb-4">
                As a client, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-cream space-y-2">
                <li>Provide accurate and complete information necessary for the project</li>
                <li>Respond to requests for feedback and approvals in a timely manner</li>
                <li>Ensure you have the rights to any content you provide</li>
                <li>Make payments according to the agreed-upon schedule</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-muted-cream mb-4">
                Upon full payment, you will own the final deliverables created specifically for your project.
                However, Websuem retains the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-cream space-y-2">
                <li>Use the work in our portfolio and marketing materials</li>
                <li>Retain ownership of any pre-existing materials, tools, or frameworks</li>
                <li>Use general knowledge and techniques gained during the project</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                5. Payment Terms
              </h2>
              <p className="text-muted-cream">
                Payment terms will be specified in your project proposal. Generally, we require a deposit
                before work begins, with the balance due upon completion. Late payments may result in
                project delays or suspension of services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                6. Revisions and Changes
              </h2>
              <p className="text-muted-cream">
                Each project includes a specified number of revision rounds. Additional revisions or
                changes to the project scope may incur additional fees. Significant changes to the
                project direction may require a new proposal.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-muted-cream">
                Websuem&apos;s liability is limited to the amount paid for services. We are not liable for
                indirect, incidental, or consequential damages. We do not guarantee specific business
                results from our services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                8. Confidentiality
              </h2>
              <p className="text-muted-cream">
                Both parties agree to keep confidential any proprietary information shared during the
                project. This includes business strategies, technical details, and any information
                marked as confidential.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                9. Termination
              </h2>
              <p className="text-muted-cream">
                Either party may terminate services with written notice. Upon termination, payment is
                due for all work completed. Any deposits for incomplete work may be partially refundable
                at Websuem&apos;s discretion.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-muted-cream">
                We reserve the right to modify these terms at any time. Continued use of our services
                after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                11. Contact
              </h2>
              <p className="text-muted-cream">
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-4">
                <a href="mailto:hello@websuem.com" className="text-accent-green hover:text-bright-green font-semibold transition-colors">
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
