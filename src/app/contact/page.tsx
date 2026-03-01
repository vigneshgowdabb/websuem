'use client';

import { useActionState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createLead, type LeadState } from '@/app/actions/leads';
import { toast } from 'react-hot-toast';
import { SubmitButton } from '@/components/ui/SubmitButton';

const initialState: LeadState = {
  success: false,
  message: '',
};

export default function ContactPage() {
  const [state, formAction] = useActionState(createLead, initialState);

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <main className='relative min-h-screen bg-background selection:bg-[#D4AF37]/30'>
      <Navbar />

      <div className='pt-48 pb-24 px-6 sm:px-12'>
        <div className='max-w-[1400px] mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-start'>
            {/* Left: Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className='text-xs font-sans font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-8'>Contact</h2>
              <h1 className='text-5xl sm:text-8xl font-serif font-light leading-[0.9] tracking-tighter text-foreground mb-12'>
                Let's Build <br />
                <span className='italic opacity-60'>Excellence.</span>
              </h1>
              <div className='space-y-12 max-w-md'>
                <p className='text-xl font-serif font-light text-foreground/60 leading-relaxed italic'>
                  "Design is the silent ambassador of your brand."
                </p>
                <div className='pt-12 border-t border-border space-y-4'>
                  <div className='text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-foreground/60'>Direct Correspondence</div>
                  <a href="mailto:hello@websuem.com" className='block text-xl text-foreground hover:text-[#D4AF37] transition-colors'>hello@websuem.com</a>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='relative'
            >
              <form action={formAction} className='space-y-12'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-12'>
                  <div className='space-y-4 group'>
                    <label className='text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-foreground/60 group-focus-within:text-[#D4AF37] transition-colors'>Identity</label>
                    <input
                      required
                      name="name"
                      type='text'
                      className='w-full bg-transparent border-b border-border py-4 text-xl text-foreground focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-foreground/40'
                      placeholder='Full Name'
                    />
                  </div>
                  <div className='space-y-4 group'>
                    <label className='text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-foreground/60 group-focus-within:text-[#D4AF37] transition-colors'>Connection</label>
                    <input
                      required
                      name="email"
                      type='email'
                      className='w-full bg-transparent border-b border-border py-4 text-xl text-foreground focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-foreground/40'
                      placeholder='Email Address'
                    />
                  </div>
                </div>

                <div className='space-y-4 group'>
                  <label className='text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-foreground/60 group-focus-within:text-[#D4AF37] transition-colors'>Selection</label>
                  <select
                    name="service_interest"
                    className='w-full bg-transparent border-b border-border py-4 text-xl text-foreground focus:outline-none focus:border-[#D4AF37] transition-all appearance-none cursor-pointer'
                  >
                    <option value="Web Development" className='bg-background text-foreground'>Website Design & Development</option>
                    <option value="AI Automation" className='bg-background text-foreground'>AI & Automation</option>
                    <option value="Brand Identity" className='bg-background text-foreground'>Brand Identity & Design</option>
                    <option value="Other" className='bg-background text-foreground'>General Inquiry</option>
                  </select>
                </div>

                <div className='space-y-4 group'>
                  <label className='text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-foreground/60 group-focus-within:text-[#D4AF37] transition-colors'>Vision</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className='w-full bg-transparent border-b border-border py-4 text-xl text-foreground focus:outline-none focus:border-[#D4AF37] transition-all resize-none placeholder:text-foreground/40'
                    placeholder='Describe your masterpiece...'
                  />
                </div>

                <div className='pt-12'>
                  <SubmitButton />
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
