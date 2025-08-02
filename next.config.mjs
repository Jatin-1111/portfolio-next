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
};

export default nextConfig;