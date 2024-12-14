"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="h-screen flex flex-col bg-primary overflow-hidden">
      {/* Header */}
      <header className="bg-primary text-textMain top-0 w-full z-50 flex">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6 h-[10vh]">
          {/* Logo */}
          <motion.h1
            className="font-header text-3xl text-accentBlue cursor-pointer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/" className="md:text-4xl">Jatin</Link>
          </motion.h1>

          {/* Hamburger Menu Icon (Mobile) */}
          <div className="lg:hidden">
            <button
              onClick={handleToggle}
              aria-label="Toggle Menu"
              className="text-textMain focus:outline-none"
            >
              {isOpen ? (
                <HiX className="text-3xl hover:accentBlue" />
              ) : (
                <HiMenu className="text-3xl hover:accentBlue" />
              )}
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <motion.ul
            className="hidden lg:flex space-x-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delayChildren: 0.4, staggerChildren: 0.1 }}
          >
            <motion.li
              whileHover={{ scale: 1.1, color: "#1E90FF" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/" className="hover:text-accentBlue transition md:text-xl">
                Home
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1, color: "#1E90FF" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/services" className="hover:text-accentBlue transition md:text-xl">
                Services
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1, color: "#1E90FF" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/resume" className="hover:text-accentBlue transition md:text-xl">
                Resume
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1, color: "#1E90FF" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/work" className="hover:text-accentBlue transition md:text-xl">
                Work
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1, color: "#1E90FF" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/contact" className="hover:text-accentBlue transition md:text-xl">
                Contact
              </Link>
            </motion.li>
          </motion.ul>


          {/* Mobile Sliding Menu */}
          <motion.div
            className="fixed top-0 right-0 h-full w-64 bg-primary shadow-lg text-textMain flex flex-col items-center justify-center space-y-8 lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? "0%" : "100%" }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
          >
            <button
              onClick={handleToggle}
              className="absolute top-4 right-4 accentBlue focus:outline-none"
            >
              <HiX className="text-3xl" />
            </button>
            <h1 className="font-header text-3xl text-accentBlue">
              <Link href="/" onClick={handleToggle}>Jatin</Link>
            </h1>
            <ul className="flex flex-col items-center space-y-6 text-lg font-body">
              <li><Link href="/" onClick={handleToggle} className="hover:accentBlue">Home</Link></li>
              <li><Link href="/services" onClick={handleToggle} className="hover:accentBlue">Services</Link></li>
              <li><Link href="/resume" onClick={handleToggle} className="hover:accentBlue">Resume</Link></li>
              <li><Link href="/work" onClick={handleToggle} className="hover:accentBlue">Work</Link></li>
              <li><Link href="/contact" onClick={handleToggle} className="hover:accentBlue">Contact</Link></li>
            </ul>
          </motion.div>
        </nav>
      </header>

      {/* Main Content */}
      <section className="flex-grow h-[90%] flex flex-col lg:flex-row items-center justify-center text-center lg:text-left px-6 lg:px-20">
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
            className="text-accentBlue font-header text-4xl sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hi, I&apos;m Jatin
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
              scale: 1.1, // Slightly enlarge on hover
            }}
            whileTap={{
              scale: 0.95, // Slightly shrink on click
            }}
            aria-label="View My Resume"
          >
            {/* Outer Animated Border */}
            <motion.span
              className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1E90FF_0%,#00FFAB_50%,#1E90FF_100%)]"
              whileHover={{
                filter: "brightness(1.2)", // Brighten the spinning effect on hover
              }}
            />
            {/* Inner Content */}
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-textMain backdrop-blur-3xl">
              View My Resume
            </span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
