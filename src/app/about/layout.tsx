import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Websuem - AI-Powered Web Agency",
  description:
    "Learn about Websuem - an AI-powered agency delivering premium web development, branding, and automation services. Quality first, speed second, affordability third.",
  keywords: [
    "about websuem",
    "web agency",
    "AI-powered agency",
    "web development team",
    "digital agency",
  ],
  openGraph: {
    title: "About Websuem | AI-Powered Web Agency",
    description:
      "Learn about our mission to deliver agency-level work at freelancer prices.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
