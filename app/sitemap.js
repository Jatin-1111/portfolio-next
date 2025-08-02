export default async function sitemap() {
    const baseUrl = 'https://jatinx.tech';
    const currentDate = new Date().toISOString();

    // Core pages with strategic priorities
    const routes = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly', // Homepage updates frequently
            priority: 1.0,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9, // High priority for commercial page
        },
        {
            url: `${baseUrl}/work`,
            lastModified: currentDate,
            changeFrequency: 'weekly', // Projects updated regularly
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Add individual project pages if you create them
    const projects = [
        'portfolio-website',
        'social-it-up',
        'the-uncoders'
    ];

    const projectRoutes = projects.map(project => ({
        url: `${baseUrl}/work/${project}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    // Add service detail pages
    const services = [
        'mern-stack-development',
        'nextjs-development',
        'ui-ux-development'
    ];

    const serviceRoutes = services.map(service => ({
        url: `${baseUrl}/services/${service}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [
        ...routes,
        ...projectRoutes,
        ...serviceRoutes
    ];
}