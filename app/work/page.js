"use client";
import { IconArrowLeft, IconArrowRight, IconExternalLink, IconBrandGithub } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const projects = [
    {
        name: "Portfolio Website",
        category: "Web Development",
        description: "An elegantly crafted portfolio that showcases professional accomplishments through modern web technologies. Built with Next.js and enhanced with Tailwind CSS for sophisticated styling and Framer Motion for fluid animations.",
        image: "/portfolio.png",
        link: "https://jatin0111.vercel.app/",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "emailjs"],
        highlights: [
            "Responsive design principles",
            "Performance optimization",
            "Modern UI/UX patterns"
        ]
    },
    {
        name: "Social It Up",
        category: "Full-Stack Application",
        description: "A comprehensive social platform with advanced UI/UX implementation. Features extensive testing protocols for backend administration and review systems, ensuring optimal user experience and system reliability.",
        image: "/socialituplogo.png",
        link: "https://social-it-up.vercel.app/",
        technologies: ["Next.js", "Firebase", "Framer Motion", "ShadCN", "Tailwind CSS", "Gemini"],
        highlights: [
            "Real-time data synchronization",
            "Advanced admin interface",
            "Secure authentication"
        ]
    },
    {
        name: "The UnCoders",
        category: "Full-Stack Application",
        description: "A sophisticated educational platform leveraging modern web technologies to deliver an exceptional learning experience. Integrates React.js with Firebase for robust backend functionality and ShadCN for refined UI components.",
        image: "/tuclogo.png",
        link: "https://theuncodersuiet.vercel.app/",
        technologies: ["React", "Firebase", "ShadCN"],
        highlights: [
            "Adaptive learning system",
            "Progress analytics",
            "Collaborative features"
        ]
    },
];

const categories = ["All", "Web Development", "Full-Stack Application"];

export default function ProjectShowcase({ autoplay = false }) {
    const [active, setActive] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isHovered, setIsHovered] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        setActive((prev) => (prev + 1) % filteredProjects.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActive((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setActive(0);
        setDirection(0);
        if (category === "All") {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(project => project.category === category));
        }
    };

    useEffect(() => {
        if (autoplay && !isHovered) {
            const interval = setInterval(handleNext, 6000);
            return () => clearInterval(interval);
        }
    }, [autoplay, isHovered]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9
        })
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 py-8 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-12 sm:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-6xl font-serif font-light tracking-tight">
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                            Portfolio
                        </span>
                    </h1>
                    <motion.div
                        className="h-px w-24 sm:w-32 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mt-4 sm:mt-6"
                        initial={{ width: 0 }}
                        animate={{ width: "8rem" }}
                        transition={{ delay: 0.3, duration: 1 }}
                    />
                    <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-400 max-w-3xl mx-auto font-light leading-relaxed px-4">
                        A curated selection of projects showcasing expertise in modern web development,
                        emphasizing clean design, performance, and innovative solutions.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-12 sm:mb-16 px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg text-sm tracking-wide transition-all duration-300
                                ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'}`}
                            onClick={() => handleCategoryChange(category)}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Showcase */}
                <div
                    className="relative max-w-6xl mx-auto"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                        {/* Project Image */}
                        <div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={active}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.4, 0, 0.2, 1]
                                    }}
                                    className="absolute inset-0"
                                >
                                    <div className="relative h-full w-full group">
                                        <Image
                                            src={filteredProjects[active].image}
                                            alt={filteredProjects[active].name}
                                            width={600}
                                            height={400}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Project Details */}
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6 sm:space-y-8 px-4 sm:px-0"
                        >
                            <div>
                                <motion.p
                                    className="text-sm text-blue-400 tracking-wider mb-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {filteredProjects[active].category}
                                </motion.p>
                                <motion.h2
                                    className="text-3xl sm:text-4xl font-light text-gray-100 mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {filteredProjects[active].name}
                                </motion.h2>
                            </div>

                            <motion.p
                                className="text-base sm:text-lg text-gray-400 leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {filteredProjects[active].description}
                            </motion.p>

                            {/* Technologies */}
                            <div className="space-y-4">
                                <motion.h3
                                    className="text-sm uppercase tracking-wider text-blue-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    Technologies
                                </motion.h3>
                                <motion.div
                                    className="flex flex-wrap gap-2 sm:gap-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    {filteredProjects[active].technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 sm:px-4 py-2 bg-gray-800/50 rounded-lg text-sm text-gray-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Project Links */}
                            <motion.div
                                className="flex gap-4 pt-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <motion.a
                                    href={filteredProjects[active].link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
                                        rounded-lg text-white shadow-lg shadow-blue-500/20 transition-all duration-300 text-sm sm:text-base"
                                    whileHover={{ y: -2, shadow: "0 20px 25px -5px rgb(59 130 246 / 0.3)" }}
                                    whileTap={{ y: 0 }}
                                >
                                    <IconExternalLink size={20} />
                                    View Project
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center gap-4 sm:gap-6 mt-12 sm:mt-16">
                        <motion.button
                            onClick={handlePrev}
                            className="p-3 sm:p-4 rounded-lg bg-gray-800/50 text-gray-400 hover:bg-gray-800 
                                hover:text-white transition-all duration-300"
                            whileHover={{ x: -2 }}
                            whileTap={{ x: 0 }}
                        >
                            <IconArrowLeft size={20} className="sm:w-6 sm:h-6" />
                        </motion.button>
                        <motion.button
                            onClick={handleNext}
                            className="p-3 sm:p-4 rounded-lg bg-gray-800/50 text-gray-400 hover:bg-gray-800 
                                hover:text-white transition-all duration-300"
                            whileHover={{ x: 2 }}
                            whileTap={{ x: 0 }}
                        >
                            <IconArrowRight size={20} className="sm:w-6 sm:h-6" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}