import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Explore Websuem\'s digital expertise in web development, AI automation, and high-performance ecosystems.',
    openGraph: {
        title: 'Services | Websuem',
        description: 'Explore Websuem\'s digital expertise in web development, AI automation, and high-performance ecosystems.',
        url: 'https://websuem.com/services',
    }
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
