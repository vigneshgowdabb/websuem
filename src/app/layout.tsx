import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import SmoothScroll from '@/components/ui/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/components/theme-provider';
import QueryProvider from '@/components/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'Websuem | Next-Gen AI Agency',
  description: 'High-end design and intelligent code, delivered in days. The premium choice for modern startups.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning className='scroll-smooth'>
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
