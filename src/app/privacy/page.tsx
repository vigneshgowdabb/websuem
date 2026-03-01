'use client';

import Navbar from '@/components/layout/Navbar';
import { SectionReveal } from '@/components/ui/Reveal';

import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <main className='relative min-h-screen bg-background selection:bg-[#D4AF37]/30'>
      <Navbar />

      <section className='pt-48 pb-32 px-6 sm:px-12'>
        <div className='max-w-[800px] mx-auto'>
          <SectionReveal>
            <h1 className='text-4xl sm:text-6xl font-serif font-light text-foreground mb-16'>Privacy Policy</h1>

            <div className='space-y-12 text-foreground/60 font-sans leading-relaxed'>
              <div>
                <h2 className='text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4'>1. Data Collection</h2>
                <p>Websuem is committed to ensuring that the collection and processing of your data from the websuem.com website complies with the General Data Protection Regulation (GDPR).</p>
              </div>

              <div>
                <h2 className='text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4'>2. Data Usage</h2>
                <p>The information we collect is exclusively intended for managing your contact requests and improving your experience on our site. No personal information is sold to third parties.</p>
              </div>

              <div>
                <h2 className='text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4'>3. Cookies</h2>
                <p>Browsing the websuem.com website may cause the installation of cookie(s) on the user's computer. A cookie is a small file that does not allow user identification but records information relating to the navigation of a computer on a site.</p>
              </div>

              <div>
                <h2 className='text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4'>4. Your Rights</h2>
                <p>In accordance with current European regulations, you have the right to access, rectify, delete, and port your data. You can exercise this right by contacting us at hello@websuem.com.</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
