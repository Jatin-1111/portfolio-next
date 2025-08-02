"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Code, Smartphone, Palette, Zap, Database, Globe } from "lucide-react";

export default function Services() {
    const [hoveredService, setHoveredService] = useState(null);
    const services = [{
        id: "mern-stack",
        title: "MERN Stack Development",
        subtitle: "Full-Stack Excellence",
        description: "Complete web applications built with MongoDB, Express, React, and Node.js. Scalable architecture, clean code, and seamless user experiences from database to frontend.",
        icon: Code,
        color: "blue",
        gradient: "from-blue-500 to-cyan-500",
        features: [
            "MongoDB Database Design",
            "Express.js API Development",
            "React.js Frontend",
            "Node.js Backend Architecture"
        ],
        deliverables: [
            "Responsive Web Application",
            "RESTful API Documentation",
            "Database Schema Design",
            "Deployment & Hosting Setup"
        ]
    },
    {
        id: "nextjs-development",
        title: "Next.js Development",
        subtitle: "Performance-First",
        description: "Lightning-fast web applications with server-side rendering, static generation, and optimal SEO. Built for speed, scalability, and exceptional user experience.",
        icon: Zap,
        color: "purple",
        gradient: "from-purple-500 to-pink-500",
        features: [
            "Server-Side Rendering (SSR)",
            "Static Site Generation (SSG)",
            "API Routes Integration",
            "Performance Optimization"
        ],
        deliverables: [
            "SEO-Optimized Website",
            "Lighthouse Score 95+",
            "Mobile-First Design",
            "Analytics Integration"
        ]
    },
    {
        id: "ui-ux-development",
        title: "UI/UX Development",
        subtitle: "Design Meets Function",
        description: "Beautiful, intuitive interfaces that users love. Focus on accessibility, usability, and modern design principles that convert visitors into customers.",
        icon: Palette,
        color: "emerald",
        gradient: "from-emerald-500 to-teal-500",
        features: [
            "User-Centered Design",
            "Responsive Layouts",
            "Interactive Components",
            "Accessibility Compliance"
        ],
        deliverables: [
            "Design System & Components",
            "Interactive Prototypes",
            "Responsive Implementation",
            "User Testing Results"
        ]
    }
    ];

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

    const serviceCardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        },
        hover: {
            y: -8,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 via-gray-900 to-gray-950">
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
                            DEVELOPMENT SERVICES
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-4 sm:mb-6 leading-tight"
                    >
                        Crafting Digital
                        <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                            Experiences
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        Specializing in modern web development with cutting-edge technologies.
                        From concept to deployment, I deliver exceptional digital solutions that drive results.
                    </motion.p>
                </div>
            </motion.section>

            {/* Services Grid */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 sm:mb-16 lg:mb-20"
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-4 sm:mb-6">
                            My Expertise
                        </h2>
                        <div className="h-0.5 w-16 sm:w-20 lg:w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 sm:mb-6"></div>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                            Three core services that power modern digital experiences
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                variants={serviceCardVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover="hover"
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                onHoverStart={() => setHoveredService(service.id)}
                                onHoverEnd={() => setHoveredService(null)}
                                className="group relative"
                            >
                                {/* Card Background with Gradient Border */}
                                <div className="relative h-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-gray-600/50">
                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                    {/* Content */}
                                    <div className="relative p-6 sm:p-8 h-full flex flex-col">
                                        {/* Icon */}
                                        <div className="mb-6 sm:mb-8">
                                            <div className={`inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br ${service.gradient} bg-opacity-10 border border-current border-opacity-20`}>
                                                <service.icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${service.color}-400`} />
                                            </div>
                                        </div>

                                        {/* Header */}
                                        <div className="mb-4 sm:mb-6">
                                            <p className={`text-xs sm:text-sm font-medium text-${service.color}-400 mb-2 tracking-wide uppercase`}>
                                                {service.subtitle}
                                            </p>
                                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-white mb-3 sm:mb-4 leading-tight">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Features */}
                                        <div className="mb-6 sm:mb-8 flex-grow">
                                            <h4 className="text-sm sm:text-base font-medium text-white mb-3 sm:mb-4">Key Features</h4>
                                            <ul className="space-y-2 sm:space-y-3">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                                                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${service.gradient} mt-2 flex-shrink-0`}></div>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Deliverables */}
                                        <div className="mb-6 sm:mb-8">
                                            <h4 className="text-sm sm:text-base font-medium text-white mb-3 sm:mb-4">What You Get</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {service.deliverables.map((item, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-xs sm:text-sm text-gray-300"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <div className="mt-auto">
                                            <Link
                                                href="/contact"
                                                className={`group/btn inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r ${service.gradient} rounded-xl text-white font-medium text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-${service.color}-500/25 hover:scale-105`}
                                            >
                                                Get Started
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4 sm:mb-6">
                            My Development Process
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                            A streamlined approach that ensures quality, efficiency, and results
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { step: "01", title: "Discovery", desc: "Understanding your vision and requirements", icon: Globe },
                            { step: "02", title: "Design", desc: "Creating wireframes and visual concepts", icon: Palette },
                            { step: "03", title: "Develop", desc: "Building with clean, scalable code", icon: Code },
                            { step: "04", title: "Deploy", desc: "Testing, optimization, and launch", icon: Zap }
                        ].map((process, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="text-center group"
                            >
                                <div className="relative mb-4 sm:mb-6">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gray-800/50 border border-gray-700/50 rounded-2xl flex items-center justify-center group-hover:border-blue-500/50 transition-colors duration-300">
                                        <process.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                                        {process.step}
                                    </div>
                                </div>
                                <h3 className="text-lg sm:text-xl font-medium text-white mb-2 sm:mb-3">{process.title}</h3>
                                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{process.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-4 sm:mb-6">
                                Ready to Start Your Project?
                            </h2>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                                Let&apos;s discuss your ideas and create something amazing together.
                                Get a free consultation and project estimate.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105"
                                >
                                    Start Your Project
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    href="/work"
                                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-gray-600 rounded-xl text-gray-300 hover:text-white hover:border-gray-500 font-medium text-sm sm:text-base transition-all duration-300"
                                >
                                    View My Work
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}