import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Websuem - Transparent Web Agency Pricing",
  description:
    "Simple, honest pricing for web development, branding, social media management, and AI automation services. No hidden fees. Plans starting at $1,500.",
  keywords: [
    "web design pricing",
    "website development cost",
    "digital agency pricing",
    "branding package price",
    "social media management cost",
    "AI automation pricing",
  ],
  openGraph: {
    title: "Pricing | Websuem - Transparent Web Agency Pricing",
    description:
      "Simple, honest pricing for web development, branding, social media management, and AI automation services. Plans starting at $1,500.",
    type: "website",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
