import ServicesShowcase from './ServicesShowcase';

export const metadata = {
  title: "Services | Jatin Kumar - Full-Stack Developer Portfolio",
  description: "Professional web development services including MERN Stack, Next.js web applications, and UI/UX development. Custom solutions for modern web projects.",
  keywords: ["MERN stack development", "Next.js development", "UI/UX development", "web services", "full-stack services", "jatin kumar services"],
  openGraph: {
    title: "Services | Jatin Kumar - Full-Stack Developer",
    description: "Expert web development services specializing in MERN Stack, Next.js, and UI/UX development.",
  }
};

export default function ServicesPage() {
  return <ServicesShowcase />;
}