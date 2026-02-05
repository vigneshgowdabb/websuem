import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://websuem.com'
    const currentDate = new Date()

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/process`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ]

    // Service pages
    const services = ['web', 'social', 'branding', 'automation']
    const servicePages = services.map((service) => ({
        url: `${baseUrl}/services/${service}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Portfolio/Case study pages
    const projects = ['lumina', 'vortex', 'elevate', 'nimbus']
    const portfolioPages = projects.map((project) => ({
        url: `${baseUrl}/portfolio/${project}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...servicePages, ...portfolioPages]
}
