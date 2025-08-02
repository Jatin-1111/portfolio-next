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
        sitemap: 'https://jatinx.tech/sitemap.xml',
        host: 'https://jatinx.tech',
    }
}