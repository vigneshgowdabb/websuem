import Link from "next/link";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen font-body text-warm-cream">
      <Header />

      <main className="flex-grow flex items-center justify-center py-20 bg-deep-green">
        <div className="container mx-auto px-6 text-center">
          {/* 404 Number */}
          <h1 className="font-heading text-8xl md:text-9xl font-bold text-accent-green mb-4">
            404
          </h1>

          {/* Message */}
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>

          <p className="text-muted-cream text-lg max-w-md mx-auto mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent-green text-deep-green font-bold rounded-xl hover:bg-bright-green hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              Go Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
