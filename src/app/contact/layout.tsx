import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch with Websuem to build high-performance ecosystems for your next-gen startup.',
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact | Websuem',
        description: 'Get in touch with Websuem to build high-performance ecosystems for your next-gen startup.',
        url: 'https://websuem.com/contact',
    }
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
