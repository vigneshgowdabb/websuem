import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Websuem",
    default: "Websuem | AI-Powered Web Agency",
  },
  description: "Websuem is a next-gen agency delivering premium websites, branding, and AI automation at record speeds.",
  keywords: ["Web Design", "AI Agency", "Next.js Development", "Branding", "Automation"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://websuem.com",
    siteName: "Websuem",
    title: "Websuem | AI-Powered Web Agency",
    description: "Premium websites delivered in days, not months.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Websuem Agency",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
