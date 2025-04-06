import ProfileTabs from './About';

export const metadata = {
  title: "About Me | Jatin Kumar - Full-Stack Developer Portfolio",
  description: "Learn about my experience, education, and skills as a Full-Stack Web Developer specializing in Next.js, React.js, Node.js, and MongoDB. Explore my professional background and technical expertise.",
  keywords: ["full-stack developer", "web developer", "MERN stack", "Next.js developer", "React.js developer", "Jatin Kumar developer", "developer profile"],
  openGraph: {
    title: "About Me | Jatin Kumar - Full-Stack Developer",
    description: "Full-Stack Web Developer skilled in Next.js, React.js, Tailwind CSS, Node.js, Express.js, and MongoDB. Delivering high-performance, SEO-optimized applications."
  }
};

export default function AboutPage() {
  return <ProfileTabs />;
}