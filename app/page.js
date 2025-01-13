"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

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
      <section className="flex-grow flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-24">
        {/* Profile Image */}
        <motion.div
          className="relative flex-shrink-0 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {/* Gradient Border */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 p-1"
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
                className="object-cover rounded-full transition-transform duration-700 hover:scale-110"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-gray-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="flex flex-col items-center lg:items-start lg:ml-20 mt-12 lg:mt-0 w-full lg:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting Text */}
          <motion.div
            className="text-sm font-light tracking-wider text-blue-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            WELCOME TO MY PORTFOLIO
          </motion.div>

          {/* Dynamic Title */}
          <motion.h1
            className="font-serif text-4xl lg:text-5xl xl:text-6xl text-gray-100 text-center lg:text-left"
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
          </motion.h1>

          {/* Separator Line */}
          <motion.div
            className="h-px w-20 bg-gradient-to-r from-blue-400 to-indigo-500 my-8"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          {/* Description */}
          <motion.p
            className="text-lg text-gray-400 leading-relaxed max-w-2xl text-center lg:text-left font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A dedicated and detail-oriented web developer specializing in crafting modern, responsive,
            and user-friendly web applications. Proficient in Next.js, React.js, Tailwind CSS, and JavaScript,
            I focus on building scalable solutions with seamless user experiences and cutting-edge design.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={handleDownload}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg 
                text-white shadow-lg shadow-blue-500/20 overflow-hidden transition-all duration-300"
              whileHover={{
                y: -2,
                shadow: "0 20px 25px -5px rgb(59 130 246 / 0.3)"
              }}
              whileTap={{ y: 0 }}
            >
              {/* Background Gradient Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Button Content */}
              <span className="relative flex items-center gap-2 text-sm tracking-wide">
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Resume
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {/* Add your social media links here */}
            <motion.a
              href="https://github.com/Jatin-1111"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
              </svg>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/jatin1011"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}