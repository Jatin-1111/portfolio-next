export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/_next/',
                    '/_vercel/',
                    '/static/favicons/',
                ],
            },
        ],
        sitemap: 'https://jatin0111.vercel.app/sitemap.xml',
        host: 'https://jatin0111.vercel.app',
    }
}