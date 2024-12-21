"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "./components/Header";
import { Typewriter } from "react-simple-typewriter";



export default function Home() {
  const handleDownload = () => {
    // Replace '/path/to/your/resume.pdf' with your actual resume file path
    const resumePath = 'My_Resume.pdf';

    // Create an anchor element
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'resume.pdf'; // The name the file will download as

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="h-screen flex flex-col bg-primary overflow-hidden">
      <Header />
      {/* Main Content */}
      <section className="flex-grow h-[90%] flex flex-col lg:flex-row items-center justify-center text-center lg:text-left px-6 lg:px-20 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {/* Profile Image */}
        <motion.div
          className="relative flex-shrink-0 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,#1E90FF,#00FFAB,#BB86FC,#1E90FF)] p-[2px]"
            animate={{
              rotate: 360, // Rotate the border only
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "linear",
            }}
          />

          {/* Static Image */}
          <div className="absolute inset-[4px] rounded-full bg-primary overflow-hidden">
            <Image
              src="/img.jpg"
              alt="Jatin's Profile"
              width={384}
              height={384}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="flex flex-col items-center lg:items-start lg:ml-12 mt-6 lg:mt-0 w-full lg:w-1/2 px-4 sm:px-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-accentBlue font-header text-2xl md:text-4xl my-3 md:my-0 font-semibold sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typewriter
              words={["Hello, I'm Jatin", "A Web Developer", "A Tech Enthusiast"]}
              loop={true} // Enable looping
              cursor
              cursorStyle="|"
              typeSpeed={90}
              deleteSpeed={50}
              delaySpeed={1500} // Delay before typing the next word
            />
          </motion.h1>

          <motion.p
            className="mt-4 text-base sm:text-lg lg:text-xl font-body text-textSecondary w-full sm:w-4/5 lg:w-11/12 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A dedicated and detail-oriented web developer specializing in crafting modern, responsive, and user-friendly web applications. Proficient in Next.js, React.js, Tailwind CSS, and JavaScript, I focus on building scalable solutions with seamless user experiences and cutting-edge design.
          </motion.p>

          <motion.button
            className="relative inline-flex mt-6 h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-accentBlue focus:ring-offset-2 focus:ring-offset-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleDownload}
            aria-label="Download Resume"
          >
            {/* Outer Animated Border */}
            <motion.span
              className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1E90FF_0%,#00FFAB_50%,#1E90FF_100%)]"
              whileHover={{
                filter: "brightness(1.2)",
              }}
            />
            {/* Inner Content */}
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-textMain backdrop-blur-3xl">
              Download Resume
            </span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}