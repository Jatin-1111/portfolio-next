/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "cdn.jsdelivr.net", // Devicons
            "cdn-icons-png.flaticon.com", // Flaticon
            "cdn.iconscout.com",
            "avatars.githubusercontent.com",
        ],
    },
    async redirects() {
        return [
            // Redirect old Vercel domain to new custom domain
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'jatin0111.vercel.app',
                    },
                ],
                destination: 'https://jatinx.tech/:path*',
                permanent: true,
            },
            // Simply update the existing redirect to point to correct domain
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'www.jatin0111.vercel.app',
                    },
                ],
                destination: 'https://jatinx.tech/:path*', // Fixed: Direct to jatinx.tech
                permanent: true,
            },
            // Redirect www version of new domain (if someone adds www)
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'www.jatinx.tech',
                    },
                ],
                destination: 'https://jatinx.tech/:path*',
                permanent: true,
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Robots-Tag',
                        value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;