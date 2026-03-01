'use client';

import Navbar from '@/components/layout/Navbar';
import { SectionReveal } from '@/components/ui/Reveal';

import Footer from '@/components/layout/Footer';

export default function LegalPage() {
  return (
    <main className='relative min-h-screen bg-background selection:bg-[#D4AF37]/30'>
      <Navbar />

      <section className='pt-48 pb-32 px-6 sm:px-12'>
        <div className='max-w-[800px] mx-auto'>
          <SectionReveal>
            <h1 className='text-4xl sm:text-6xl font-serif font-light text-foreground mb-16'>Legal Notice</h1>

            <div className='space-y-12 text-foreground/60 font-sans leading-relaxed'>
              <div>
                <h2 className='text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4'>1. Site Publisher</h2>
                <p>Under Article 6 of Law No. 2004-575 of June 21, 2004 on confidence in the digital economy, users of the websuem.com website are informed of the identity of the various parties involved in its creation and monitoring.</p>
                <p className='mt-4 text-sm'>Site Owner: Websuem Digital Studio - Contact: hello@websuem.com - Address: San Francisco, CA.</p>
              </div>

              <div>
                <h2 className='text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4'>2. Intellectual Property</h2>
                <p>Websuem owns the intellectual property rights and holds the usage rights to all elements accessible on the website, including texts, images, graphics, logos, videos, architecture, icons, and sounds.</p>
              </div>

              <div>
                <h2 className='text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4'>3. Limitations of Liability</h2>
                <p>Websuem cannot be held liable for direct and indirect damage caused to the user's equipment when accessing the websuem.com site.</p>
              </div>

              <div>
                <h2 className='text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4'>4. Hosting</h2>
                <p>The Site is hosted by Vercel Inc., located at 340 S Lemon Ave #1107 Walnut, CA 91789, USA.</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
