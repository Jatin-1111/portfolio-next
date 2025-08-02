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
      <section className="flex-grow flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16 xl:gap-20">

          {/* Left Side Content - Optimized for all screen sizes */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting Text with better mobile spacing */}
            <motion.div
              className="text-xs sm:text-sm md:text-base font-light tracking-wider text-blue-400 mb-2 sm:mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              WELCOME TO MY PORTFOLIO
            </motion.div>

            {/* Dynamic Title - Enhanced responsive scaling */}
            <motion.h1
              className="font-serif text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-gray-100 font-bold mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Typewriter
                words={["Jatin Kumar", "Web Developer", "Software Engineer", "Tech Enthusiast"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={90}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </motion.h1>
            {/* Separator Line - Better mobile alignment */}
            <motion.div
              className="h-0.5 sm:h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-400 to-indigo-500 my-4 sm:my-6 lg:my-8 mx-auto lg:mx-0"
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            {/* Description - Improved mobile readability */}
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-gray-400 leading-relaxed max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-none font-light px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Results-driven Full-Stack Web Developer skilled in Next.js, React.js, Tailwind CSS, Node.js, Express.js, and MongoDB. Expert in JWT authentication, RESTful APIs, and database integration, delivering high-performance, SEO-optimized applications with 95% component reusability and 95+ Lighthouse scores.
            </motion.p>

            {/* Expertise Section - Enhanced mobile layout */}
            <motion.div
              className="w-full mt-8 sm:mt-12 md:mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 font-light mb-4 sm:mb-6">
                My Development Expertise
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-400 font-light text-sm sm:text-base">
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-blue-400 text-lg sm:text-xl mt-0.5">•</span>
                  <p className="flex-1">Modern Frontend with React.js & Next.js</p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-blue-400 text-lg sm:text-xl mt-0.5">•</span>
                  <p className="flex-1">Robust Backend with Node.js & Express</p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-blue-400 text-lg sm:text-xl mt-0.5">•</span>
                  <p className="flex-1">Database Design with MongoDB</p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-blue-400 text-lg sm:text-xl mt-0.5">•</span>
                  <p className="flex-1">Responsive UI with Tailwind CSS</p>
                </div>
              </div>
            </motion.div>

            {/* Actions Row - Improved mobile stack */}
            <motion.div
              className="w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-6 sm:mt-8 md:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* CTA Button - Better mobile sizing */}
              <motion.button
                onClick={handleDownload}
                className="group relative w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg 
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

                {/* Button Content */}
                <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base font-medium tracking-wide">
                  <Download
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-y-0.5"
                    strokeWidth={2}
                  />
                  Download Resume
                </span>
              </motion.button>

              {/* Social Links - Better mobile spacing */}
              <div className="flex items-center gap-6 sm:gap-8">
                <motion.a
                  href="https://github.com/Jatin-1111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ y: 0, scale: 0.95 }}
                  aria-label="GitHub Profile"
                >
                  <Github className="w-6 h-6 sm:w-7 sm:h-7" />
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
                  <Linkedin className="w-6 h-6 sm:w-7 sm:h-7" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image with responsive sizing */}
          <motion.div
            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 order-1 lg:order-2 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {/* Outer Glow - Responsive blur */}
            <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-lg sm:blur-xl" />

            {/* Animated Gradient Border */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 p-1 sm:p-1.5"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {/* Image Container */}
              <div className="relative h-full w-full rounded-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
                <Image
                  src="/img.jpg"
                  alt="Jatin's Profile"
                  fill
                  sizes="(max-width: 640px) 12rem, (max-width: 768px) 16rem, (max-width: 1024px) 18rem, (max-width: 1280px) 20rem, 24rem"
                  priority
                  className="object-cover rounded-full transition-all duration-700 hover:scale-110 hover:brightness-110"
                />
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-full"
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