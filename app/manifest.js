export default function manifest() {
    return {
        name: "Jatin Kumar | Full-Stack Web Developer",
        short_name: "Jatin Kumar",
        description: "Full-Stack Web Developer specializing in Next.js, React.js, Node.js, MongoDB and modern web applications",
        start_url: '/',
        display: 'standalone',
        background_color: '#1E90FF',
        theme_color: '#1E90FF',
        prefer_related_applications: false,
        shortcuts: [
            {
                name: 'Projects',
                url: '/projects',
                description: 'View my latest projects'
            },
            {
                name: 'Contact',
                url: '/contact',
                description: 'Get in touch with me'
            }
        ]
    }
}