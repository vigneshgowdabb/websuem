'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { SectionReveal, TextReveal } from '@/components/ui/Reveal';
import Link from 'next/link';

const values = [
  { title: 'Proximity', description: 'We work as an extension of your team, ensuring every decision is aligned with your core vision.' },
  { title: 'Adaptability', description: 'The digital landscape shifts daily. Our systems are built to pivot and scale instantly.' },
  { title: 'Innovation', description: 'We utilize AI not as a buzzword, but as a fundamental tool for creative and technical excellence.' },
  { title: 'Precision', description: 'Excellence is non-negotiable. Every pixel and every line of code is audited for perfection.' }
];

const team = [
  { name: 'Vignesh Gowda', role: 'Founder & CEO', image: '/images/vignesh.jpg' }
];

import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <main className='relative min-h-screen bg-background selection:bg-[#D4AF37]/30'>
      <Navbar />

      {/* Hero */}
      <section className='pt-48 pb-32 px-6 sm:px-12'>
        <div className='max-w-[1400px] mx-auto'>
          <SectionReveal>
            <h2 className='text-xs font-sans font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-12'>About Websuem</h2>
            <h1 className='text-6xl sm:text-[8vw] font-serif font-light leading-[0.9] tracking-tighter text-foreground mb-16 max-w-5xl'>
              A Collective of <br />
              <span className='italic opacity-60'>Digital Craftsmen.</span>
            </h1>
          </SectionReveal>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-start pt-16 border-t border-border'>
            <SectionReveal delay={0.2}>
              <p className='text-2xl sm:text-3xl font-serif font-light leading-relaxed text-foreground/60 italic'>
                "We founded Websuem on a single principle: traditional agency models are obsolete. The future belongs to the agile, the intelligent, and the precise."
              </p>
            </SectionReveal>
            <SectionReveal delay={0.4}>
              <div className='space-y-8 text-lg text-foreground/60 leading-relaxed max-w-xl'>
                <p>
                  Websuem is an AI-augmented digital studio based in San Francisco. We bridge the gap between high-end creative design and advanced technical architecture.
                </p>
                <p>
                  Our methodology leverages the latest in machine intelligence to accelerate the development cycle without sacrificing the human touch. We deliver agency-grade quality in a fraction of the time.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className='py-40 px-6 sm:px-12 bg-surface/50 border-y border-border'>
        <div className='max-w-[1400px] mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
            {values.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.1}>
                <h3 className='text-xs font-sans font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-6'>{v.title}</h3>
                <p className='text-sm text-foreground/60 leading-relaxed font-sans'>{v.description}</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team - Three Pillars Style */}
      <section className='py-40 px-6 sm:px-12 bg-background overflow-hidden'>
        <div className='max-w-[1400px] mx-auto'>
          <div className='mb-32'>
            <SectionReveal>
              <h2 className='text-xs font-sans font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-8'>The Pillars</h2>
              <h3 className='text-5xl sm:text-7xl font-serif font-light text-foreground'>Our Core Team.</h3>
            </SectionReveal>
          </div>

          <div className='max-w-md mx-auto'>
            {team.map((member, i) => (
              <SectionReveal key={member.name} delay={i * 0.2}>
                <div className='group cursor-pointer'>
                  <div className='aspect-[3/4] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 mb-8'>
                    <img
                      src={member.image}
                      alt={member.name}
                      className='w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]'
                    />
                  </div>
                  <h4 className='text-3xl font-serif font-light text-foreground mb-2 group-hover:italic transition-all'>{member.name}</h4>
                  <p className='text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#D4AF37]'>{member.role}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
