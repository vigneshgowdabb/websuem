"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Mail, Clock, MapPin, ArrowRight, Calendar } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen font-body text-warm-cream">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-deep-green relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-accent-green/[0.03] rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] backdrop-blur-sm rounded-full text-sm font-medium text-accent-green border border-white/10 mb-8">
                  Get in Touch
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                  Let&apos;s talk about your project
                </h1>
                <p className="text-lg text-muted-cream mb-10 leading-relaxed">
                  Ready to take your online presence to the next level? Fill
                  out the form or book a call directly.
                </p>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-green/10 border border-accent-green/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail
                        className="w-5 h-5 text-accent-green"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-white mb-1">
                        Email Us
                      </h3>
                      <a
                        href="mailto:hello@websuem.com"
                        className="text-muted-cream hover:text-accent-green transition-colors"
                      >
                        hello@websuem.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-green/10 border border-accent-green/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock
                        className="w-5 h-5 text-accent-green"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-white mb-1">
                        Response Time
                      </h3>
                      <p className="text-muted-cream">
                        Usually within 2 hours during business hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-green/10 border border-accent-green/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin
                        className="w-5 h-5 text-accent-green"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-white mb-1">
                        Location
                      </h3>
                      <p className="text-muted-cream">
                        Remote-first, serving clients in 12+ countries
                      </p>
                    </div>
                  </div>
                </div>

                {/* Book a call CTA */}
                <a
                  href="https://calendly.com/hello-websuem/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent-green text-deep-green font-bold rounded-xl hover:bg-bright-green hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 mb-10"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Discovery Call
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Trust indicators */}
                <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                  <p className="text-sm text-muted-cream mb-3">
                    What to expect:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-warm-cream">
                      <span
                        className="w-1.5 h-1.5 bg-accent-green rounded-full"
                        aria-hidden="true"
                      ></span>
                      Free 15-minute strategy call
                    </li>
                    <li className="flex items-center gap-2 text-warm-cream">
                      <span
                        className="w-1.5 h-1.5 bg-accent-green rounded-full"
                        aria-hidden="true"
                      ></span>
                      No pitch, no pressure
                    </li>
                    <li className="flex items-center gap-2 text-warm-cream">
                      <span
                        className="w-1.5 h-1.5 bg-accent-green rounded-full"
                        aria-hidden="true"
                      ></span>
                      Custom proposal within 24 hours
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Right Column: Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
