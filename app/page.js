"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { Download, Github, Linkedin } from "lucide-react";

export default function Home() {
  const handleDownload = () => {
    const resumePath = './Latex resume.pdf';
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Main Hero Section with improved spacing and responsive layout */}
      <section className="flex-grow flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Side Content - Move content first on mobile for better UX */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting Text with more dramatic entrance */}
            <motion.div
              className="text-sm md:text-base font-light tracking-wider text-blue-400 mb-2 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              WELCOME TO MY PORTFOLIO
            </motion.div>

            {/* Dynamic Title - larger and more prominent */}
            <motion.h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-100 text-center lg:text-left font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Typewriter
                words={["Hello, I'm Jatin", "A Web Developer", "A Tech Enthusiast"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={90}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </motion.h2>

            {/* Separator Line - more visible and aligned */}
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-blue-400 to-indigo-500 my-6 lg:my-8 mx-auto lg:mx-0"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            {/* Description - improved readability */}
            <motion.p
              className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl text-center lg:text-left font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Results-driven Full-Stack Web Developer skilled in Next.js, React.js, Tailwind CSS, Node.js, Express.js, and MongoDB. Expert in JWT authentication, RESTful APIs, and database integration, delivering high-performance, SEO-optimized applications with 95% component reusability and 95+ Lighthouse scores. Focused on clean, maintainable code and exceptional UI/UX for modern, responsive web apps.
            </motion.p>

            {/* Actions Row - better aligned and grouped */}
            <motion.div
              className="w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mt-8 md:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* CTA Button - improved design */}
              <motion.button
                onClick={handleDownload}
                className="group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg 
                  text-white shadow-lg shadow-blue-500/20 overflow-hidden transition-all duration-300"
                whileHover={{
                  y: -2,
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgb(59 130 246 / 0.3)"
                }}
                whileTap={{ y: 0, scale: 0.98 }}
              >
                {/* Background Gradient Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Button Content with Lucide React icon */}
                <span className="relative flex items-center gap-2 text-sm md:text-base font-medium tracking-wide">
                  <Download
                    className="w-5 h-5 transition-transform group-hover:translate-y-0.5"
                    strokeWidth={2}
                  />
                  Download Resume
                </span>
              </motion.button>

              {/* Social Links - horizontally arranged and better spaced */}
              <div className="flex items-center gap-4 md:gap-6">
                <motion.a
                  href="https://github.com/Jatin-1111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ y: 0, scale: 0.95 }}
                  aria-label="GitHub Profile"
                >
                  <Github className="w-6 h-6 md:w-7 md:h-7" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/jatin1011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ y: 0, scale: 0.95 }}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-6 h-6 md:w-7 md:h-7" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image with improved animation and positioning */}
          <motion.div
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {/* Outer Glow */}
            <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-xl" />

            {/* Animated Gradient Border */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 p-1.5"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {/* Image Container with improved hover effects */}
              <div className="relative h-full w-full rounded-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
                <Image
                  src="/img.jpg"
                  alt="Jatin's Profile"
                  fill
                  sizes="(max-width: 640px) 16rem, (max-width: 768px) 18rem, (max-width: 1024px) 20rem, 24rem"
                  priority
                  className="object-cover rounded-full transition-all duration-700 hover:scale-110 hover:filter hover:brightness-110"
                />
                {/* Improved overlay with subtle interaction */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                  whileHover={{ opacity: 0.7 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}