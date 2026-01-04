import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://omieo.vercel.app' // Updated to match layout config

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        // Add other routes if the site expands (e.g. /blog, /projects)
    ]
}
