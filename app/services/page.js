import ServicesShowcase from './ServicesShowcase';

export const metadata = {
  title: "Services | Jatin Kumar - Full-Stack Developer Portfolio",
  description: "Unlock scalable, fast, and visually engaging web solutions with Jatin Kumar. I offer professional web development services including full-stack MERN applications, Next.js development, UI/UX design, API integration, and custom solutions for businesses and startups.",
  keywords: [
    "MERN stack development services",
    "Next.js custom web development",
    "React.js UI/UX developer",
    "frontend and backend development",
    "full-stack web developer India",
    "hire full-stack developer",
    "custom web app solutions",
    "API integration services",
    "Jatin Kumar web services",
    "responsive web design services"
  ],
  openGraph: {
    title: "Services | Jatin Kumar - Full-Stack Developer",
    description: "Offering scalable and modern full-stack web development services using Next.js, React.js, Node.js, and MongoDB. Let's build your next digital product.",
  }
};

export default function ServicesPage() {
  return <ServicesShowcase />;
}