import ProjectShowcase from './ProjectShowcase';

export const metadata = {
    title: "Work | Jatin Kumar - Full-Stack Developer Portfolio",
    description: "Browse through a curated collection of full-stack web development projects by Jatin Kumar. Featuring responsive UI/UX designs, scalable Next.js applications, real-world Firebase integrations, and advanced MERN stack solutions. Explore how I solve real problems with clean, modern code.",
    keywords: [
      "Next.js portfolio projects",
      "React.js case studies",
      "MERN stack application examples",
      "Firebase project showcase",
      "full-stack developer portfolio",
      "real-world web apps",
      "responsive web application design",
      "UI/UX portfolio projects",
      "Jatin Kumar web development",
      "frontend and backend project examples"
    ],
    openGraph: {
      title: "Projects | Jatin Kumar - Full-Stack Developer",
      description: "Explore a showcase of full-stack projects crafted with Next.js, React.js, and Firebase. Demonstrating scalable architecture, intuitive UI/UX, and real-world impact.",
    }
  };
  
export default function ProjectsPage() {
    return <ProjectShowcase autoplay={true} />;
}