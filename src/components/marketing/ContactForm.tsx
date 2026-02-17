"use client";

import { useState } from "react";
import { createLead } from "@/lib/actions/leads";
import { ArrowRight, Check } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    let service = formData.get("service") as
      | "website"
      | "social"
      | "branding"
      | "automation"
      | "other"
      | "multiple";
    if (
      !["website", "social", "branding", "automation", "multiple"].includes(
        service
      )
    ) {
      service = "other";
    }

    const input = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      service_interested: service,
      message: formData.get("message") as string,
      source: "website" as const,
      status: "new" as const,
    };

    try {
      const result = await createLead(input);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/10">
      <h2 className="font-heading text-2xl font-bold text-white mb-6">
        Send us a message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-warm-cream"
            >
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-warm-cream"
            >
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 outline-none transition-all"
              placeholder="john@company.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="service"
            className="text-sm font-semibold text-warm-cream"
          >
            Service Interested In
          </label>
          <select
            name="service"
            id="service"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 outline-none transition-all"
          >
            <option value="" className="bg-deep-green text-warm-cream">
              Select a service...
            </option>
            <option value="website" className="bg-deep-green text-warm-cream">
              Website Development
            </option>
            <option value="social" className="bg-deep-green text-warm-cream">
              Social Media
            </option>
            <option value="branding" className="bg-deep-green text-warm-cream">
              Brand Identity
            </option>
            <option
              value="automation"
              className="bg-deep-green text-warm-cream"
            >
              AI Automation
            </option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-semibold text-warm-cream"
          >
            Message
          </label>
          <textarea
            required
            name="message"
            id="message"
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 outline-none transition-all resize-none"
            placeholder="Tell us about your project..."
          ></textarea>
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
            {error}
          </div>
        )}
        {success && (
          <div className="text-accent-green text-sm font-semibold bg-accent-green/10 p-3 rounded-lg border border-accent-green/20 flex items-center gap-2">
            <Check className="w-4 h-4" />
            Message sent! We&apos;ll get back to you soon.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-green text-deep-green font-bold rounded-xl hover:bg-bright-green hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Message"}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}
