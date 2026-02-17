import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Websuem",
    default: "Websuem — AI-Powered Web Design Agency | Premium Websites in Days",
  },
  description: "Websuem is a next-gen agency delivering premium websites, branding, and AI automation. Direct founder access, modern tech stack, rapid delivery.",
  keywords: ["Web Design", "AI Agency", "Next.js Development", "Branding", "Automation", "Social Media Management", "Premium Websites"],
  metadataBase: new URL("https://websuem.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://websuem.com",
    siteName: "Websuem",
    title: "Websuem — AI-Powered Web Design Agency",
    description: "Premium websites built in days, not months. Direct founder access, AI-enhanced workflow.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Websuem — Premium Web Design Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Websuem — AI-Powered Web Design Agency",
    description: "Premium websites built in days, not months.",
    site: "@websuem",
    creator: "@websuem",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
        <LocalBusinessSchema />
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
