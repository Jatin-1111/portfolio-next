"use client";
import Header from "../components/Header"; // Adjust the path if needed
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const projects = [
    {
        "name": "Portfolio Website",
        "category": "Web Development",
        "description": "A portfolio showcasing my skills and projects, built with Next.js, Tailwind CSS, Framer Motion, and Acentricity UI.",
        "image": "/portfolio.png",
        "link": "https://jatin0111.vercel.app/"
    },
    {
        "name": "Social It Up",
        "category": "Full-Stack Application",
        "description": "Conducted UI/UX testing to enhance user experience and tested the backend admin and review panels for seamless functionality.",
        "image": "/socialituplogo.png",
        "link": "https://social-it-up.vercel.app/"
    },
    {
        "name": "Edusphere",
        "category": "Full-Stack Application",
        "description": "An educational platform for students to learn and grow, built with React.js, Tailwind CSS, Framer Motion, and Firebase for the backend.",
        "image": "/edulogo.jpg",
        "link": "https://edu-react-nine.vercel.app/"
    }
    ,
];

export default function AnimatedProjects({ autoplay = false }) {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % projects.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const isActive = (index) => index === active;

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    return (
        <div className="h-screen flex flex-col bg-primary text-textMain overflow-hidden">
            {/* Header Section */}
            <Header />

            {/* Projects Section */}
            <section className="flex-grow px-6 sm:px-12 lg:px-20 py-10 sm:py-16 lg:py-20 overflow-y-auto">
                {/* Title Section */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl sm:text-5xl font-header font-semibold text-accentBlue">
                        My Projects
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-textSecondary">
                        Explore some of the projects I’ve worked on, showcasing my skills and expertise in modern web development.
                    </p>
                </motion.div>

                {/* Animated Projects Section */}
                <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-10">
                    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
                        {/* Image Section */}
                        <div>
                            <div className="relative h-80 w-full">
                                <AnimatePresence>
                                    {projects.map((project, index) => (
                                        <motion.div
                                            key={project.image}
                                            initial={{ opacity: 0, scale: 0.9, z: -100 }}
                                            animate={{
                                                opacity: isActive(index) ? 1 : 0,
                                                scale: isActive(index) ? 1 : 0.9,
                                                z: isActive(index) ? 0 : -100,
                                            }}
                                            exit={{ opacity: 0, scale: 0.9, z: 100 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="absolute inset-0 origin-bottom"
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.name}
                                                width={500}
                                                height={500}
                                                draggable={false}
                                                className="h-full w-full rounded-3xl object-cover object-center"
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Project Info Section */}
                        <div className="flex justify-between flex-col py-4">
                            <motion.div
                                key={active}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <h3 className="text-2xl font-bold text-accentBlue">
                                    {projects[active].name}
                                </h3>
                                <p className="text-sm text-textSecondary">
                                    {projects[active].category}
                                </p>
                                <motion.p className="text-lg text-textSecondary mt-8">
                                    {projects[active].description.split(" ").map((word, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                                            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                                            className="inline-block"
                                        >
                                            {word}&nbsp;
                                        </motion.span>
                                    ))}
                                </motion.p>
                                <a
                                    href={projects[active].link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block text-accentGreen hover:underline"
                                >
                                    View Project
                                </a>
                            </motion.div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-4 pt-12 md:pt-0">
                                <button
                                    onClick={handlePrev}
                                    className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                                >
                                    <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                                >
                                    <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
