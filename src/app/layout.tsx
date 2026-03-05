import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import SmoothScroll from '@/components/ui/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/components/theme-provider';
import QueryProvider from '@/components/providers/QueryProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://websuem.com'),
  title: {
    default: 'Websuem | Next-Gen AI & Web Design Agency',
    template: '%s | Websuem'
  },
  description: 'Websuem is a next-gen digital studio building high-performance ecosystems for founders who demand excellence without compromise.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Websuem | Next-Gen AI & Web Design Agency',
    description: 'High-end design and intelligent code, delivered in days. The premium choice for modern startups.',
    url: 'https://websuem.com',
    siteName: 'Websuem',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Websuem — Next-Gen AI Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Websuem | Next-Gen AI & Web Design Agency',
    description: 'High-end design and intelligent code, delivered in days. The premium choice for modern startups.',
    site: '@websuem',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://websuem.com/#organization',
  name: 'Websuem',
  url: 'https://websuem.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://websuem.com/images/logo1.png',
  },
  description: 'Websuem is a next-gen digital studio building high-performance ecosystems for founders who demand excellence without compromise.',
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'Vignesh Gowda',
    jobTitle: 'Founder & CEO',
    url: 'https://websuem.com/about',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@websuem.com',
    url: 'https://websuem.com/contact',
  },
  sameAs: [
    'https://x.com/websuem',
    'https://www.linkedin.com/company/websuem',
    'https://www.instagram.com/websuem',
    'https://www.facebook.com/profile.php?id=61587178088685',
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning className='scroll-smooth'>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className='bg-background text-foreground antialiased selection:bg-[#D4AF37]/30 selection:text-[#D4AF37] font-sans transition-colors duration-500'>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CustomCursor />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#0D0D0D',
                color: '#FDFDFD',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                borderRadius: '12px',
              },
            }}
          />
          <QueryProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
