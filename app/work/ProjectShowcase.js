"use client";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

const projects = [
    {
        id: "portfolio-website",
        name: "Portfolio Website",
        category: "Web Development",
        description: "An elegantly crafted portfolio showcasing professional accomplishments through modern web technologies. Built with Next.js and enhanced with Tailwind CSS for sophisticated styling and Framer Motion for fluid animations.",
        image: "/portfolio.png",
        link: "https://jatinx.tech/",
        github: "https://github.com/Jatin-1111/portfolio-next",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "EmailJS"],
        highlights: [
            "Responsive design principles",
            "Performance optimization",
            "Modern UI/UX patterns"
        ],
        metrics: {
            performance: "95+",
            accessibility: "100%",
            loadTime: "< 2s"
        }
    },
    {
        id: "social-it-up",
        name: "Social It Up",
        category: "Full-Stack Application",
        description: "A comprehensive social platform with advanced UI/UX implementation. Features extensive testing protocols for backend administration and review systems, ensuring optimal user experience and system reliability.",
        image: "/socialituplogo.png",
        link: "https://social-it-up.vercel.app/",
        github: "https://github.com/Jatin-1111/Social-It-Up",
        technologies: ["Next.js", "Firebase", "Framer Motion", "ShadCN", "Tailwind CSS", "Gemini AI"],
        highlights: [
            "Real-time data synchronization",
            "Advanced admin interface",
            "Secure authentication"
        ],
        metrics: {
            users: "500+",
            uptime: "99.9%",
            features: "25+"
        }
    },
    {
        id: "the-uncoders",
        name: "The UnCoders",
        category: "Full-Stack Application",
        description: "A sophisticated educational platform leveraging modern web technologies to deliver an exceptional learning experience. Integrates React.js with Firebase for robust backend functionality and ShadCN for refined UI components.",
        image: "/tuclogo.png",
        link: "https://theuncodersuiet.vercel.app/",
        github: "https://github.com/Jatin-1111/The-UnCoders",
        technologies: ["React.js", "Firebase", "ShadCN", "Authentication"],
        highlights: [
            "Adaptive learning system",
            "Progress analytics",
            "Collaborative features"
        ],
        metrics: {
            courses: "15+",
            completion: "85%",
            rating: "4.8/5"
        }
    },
];

const categories = ["All", "Web Development", "Full-Stack Application"];

export default function ProjectShowcase({ autoplay = false }) {
    const [active, setActive] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isHovered, setIsHovered] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [direction, setDirection] = useState(0);

    const handleNext = useCallback(() => {
        setDirection(1);
        setActive((prev) => (prev + 1) % filteredProjects.length);
    }, [filteredProjects.length]);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setActive((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    }, [filteredProjects.length]);

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
        if (autoplay && !isHovered && filteredProjects.length > 1) {
            const interval = setInterval(handleNext, 6000);
            return () => clearInterval(interval);
        }
    }, [autoplay, isHovered, filteredProjects.length, handleNext]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        })
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section */}
            <motion.section
                className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
                        <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs sm:text-sm font-medium tracking-wide">
                            MY WORK
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-4 sm:mb-6 leading-tight"
                    >
                        Featured
                        <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </motion.h1>

                    <motion.div
                        variants={itemVariants}
                        className="h-0.5 sm:h-1 w-16 sm:w-20 lg:w-24 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-6 sm:mb-8"
                    />

                    <motion.p
                        variants={itemVariants}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        A curated selection of projects showcasing expertise in modern web development,
                        emphasizing clean design, performance, and innovative solutions.
                    </motion.p>
                </div>
            </motion.section>

            {/* Category Filter */}
            <section className="pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-xl text-xs sm:text-sm lg:text-base font-medium tracking-wide transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-600/50'
                                    }`}
                                onClick={() => handleCategoryChange(category)}
                                whileHover={{ y: -2, scale: 1.02 }}
                                whileTap={{ y: 0, scale: 0.98 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Projects Showcase */}
            <section className="pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Project Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
                            {/* Project Image */}
                            <div className="lg:col-span-7 order-2 lg:order-1">
                                <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[28rem] overflow-hidden rounded-2xl bg-gray-800/30 border border-gray-700/50">
                                    <AnimatePresence initial={false} custom={direction} mode="wait">
                                        <motion.div
                                            key={filteredProjects[active]?.id}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.4, 0, 0.2, 1]
                                            }}
                                            className="absolute inset-0 group"
                                        >
                                            <div className="relative h-full w-full overflow-hidden rounded-2xl">
                                                <Image
                                                    src={filteredProjects[active]?.image || ''}
                                                    alt={filteredProjects[active]?.name || ''}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                {/* Quick Actions Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <div className="flex gap-3 sm:gap-4">
                                                        <motion.a
                                                            href={filteredProjects[active]?.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-xl text-gray-900 hover:bg-white transition-colors duration-300"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        </motion.a>
                                                        <motion.a
                                                            href={filteredProjects[active]?.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 sm:p-3 bg-gray-900/90 backdrop-blur-sm rounded-xl text-white hover:bg-gray-900 transition-colors duration-300"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        </motion.a>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="lg:col-span-5 order-1 lg:order-2">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={filteredProjects[active]?.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-4 sm:space-y-6 lg:space-y-8"
                                    >
                                        {/* Header */}
                                        <div>
                                            <p className="text-xs sm:text-sm text-blue-400 tracking-wider mb-2 sm:mb-3 font-medium uppercase">
                                                {filteredProjects[active]?.category}
                                            </p>
                                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-3 sm:mb-4 leading-tight">
                                                {filteredProjects[active]?.name}
                                            </h2>
                                            <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed">
                                                {filteredProjects[active]?.description}
                                            </p>
                                        </div>

                                        {/* Technologies */}
                                        <div>
                                            <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-3 sm:mb-4">
                                                Technologies Used
                                            </h3>
                                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                                {filteredProjects[active]?.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-xs sm:text-sm text-gray-300 backdrop-blur-sm"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Key Highlights */}
                                        <div>
                                            <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-3 sm:mb-4">
                                                Key Features
                                            </h3>
                                            <ul className="space-y-2 sm:space-y-3">
                                                {filteredProjects[active]?.highlights.map((highlight, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-gray-400">
                                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 mt-2 flex-shrink-0"></div>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                                            <motion.a
                                                href={filteredProjects[active]?.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group inline-flex items-center justify-center gap-2 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                                                whileHover={{ y: -2, scale: 1.02 }}
                                                whileTap={{ y: 0, scale: 0.98 }}
                                            >
                                                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                                                View Live Project
                                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Navigation Controls */}
                        {filteredProjects.length > 1 && (
                            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-12 sm:mt-16 lg:mt-20">
                                <motion.button
                                    onClick={handlePrev}
                                    className="p-2 sm:p-3 lg:p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm"
                                    whileHover={{ x: -2, scale: 1.05 }}
                                    whileTap={{ x: 0, scale: 0.95 }}
                                >
                                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                </motion.button>

                                {/* Project Indicators */}
                                <div className="flex items-center gap-2 sm:gap-3">
                                    {filteredProjects.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActive(index)}
                                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === active
                                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 scale-125'
                                                : 'bg-gray-600 hover:bg-gray-500'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <motion.button
                                    onClick={handleNext}
                                    className="p-2 sm:p-3 lg:p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm"
                                    whileHover={{ x: 2, scale: 1.05 }}
                                    whileTap={{ x: 0, scale: 0.95 }}
                                >
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-800/30 border border-gray-700/50 rounded-3xl p-8 sm:p-12 lg:p-16 backdrop-blur-sm"
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-4 sm:mb-6">
                            Like What You See?
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                            Let&apos;s collaborate on your next project. I bring the same attention to detail and
                            technical excellence to every client engagement.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                            <motion.a
                                href="/contact"
                                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25"
                                whileHover={{ y: -2, scale: 1.05 }}
                                whileTap={{ y: 0, scale: 0.95 }}
                            >
                                Start Your Project
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                            </motion.a>

                            <motion.a
                                href="/services"
                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-gray-600 rounded-xl text-gray-300 hover:text-white hover:border-gray-500 font-medium text-sm sm:text-base transition-all duration-300"
                                whileHover={{ y: -2, scale: 1.05 }}
                                whileTap={{ y: 0, scale: 0.95 }}
                            >
                                View Services
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}