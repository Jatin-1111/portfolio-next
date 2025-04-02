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
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'www.jatin0111.vercel.app',
                    },
                ],
                destination: 'https://jatin0111.vercel.app/:path*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
