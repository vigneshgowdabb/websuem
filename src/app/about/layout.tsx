import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'Websuem is an AI-augmented digital studio founded by Vignesh Gowda. We build high-performance web ecosystems, intelligent automation, and premium brand identities.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About | Websuem',
        description: 'Websuem is an AI-augmented digital studio founded by Vignesh Gowda. We build high-performance web ecosystems, intelligent automation, and premium brand identities.',
        url: 'https://websuem.com/about',
    }
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
