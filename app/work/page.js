import ProjectShowcase from './ProjectShowcase';

export const metadata = {
    title: "Projects | Jatin Kumar - Full-Stack Developer Portfolio",
    description: "Explore my portfolio of web development projects using Next.js, React.js, Firebase, and more. View case studies of full-stack applications and responsive web designs.",
    keywords: ["portfolio projects", "web development", "next.js projects", "react.js applications", "full-stack development", "jatin kumar projects"],
    openGraph: {
        title: "Projects | Jatin Kumar - Full-Stack Developer",
        description: "Explore my development projects showcasing expertise in modern web technologies.",
    }
};

export default function ProjectsPage() {
    return <ProjectShowcase autoplay={true} />;
}