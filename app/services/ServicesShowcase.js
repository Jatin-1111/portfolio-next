"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Services() {
    const [hoveredService, setHoveredService] = useState(null);

    // Updated services list with your specific services
    const services = [
        {
            title: "MERN Stack Development",
            description: "End-to-end web applications built with MongoDB, Express, React, and Node.js. Leveraging the power of JavaScript across the entire stack for seamless, efficient development.",
            icon: "🔄",
            highlights: ["MongoDB & Express.js", "React.js Frontend", "Node.js Backend", "RESTful API Integration"]
        },
        {
            title: "Next.js Web App Development",
            description: "High-performance, SEO-friendly web applications with server-side rendering and static site generation capabilities using the Next.js framework.",
            icon: "⚡",
            highlights: ["Server-Side Rendering", "Static Site Generation", "API Routes", "Optimized Performance"]
        },
        {
            title: "UI/UX Development",
            description: "Creating intuitive, accessible, and visually appealing user interfaces that enhance user engagement and deliver exceptional digital experiences.",
            icon: "🎨",
            highlights: ["Responsive Design", "User-Centered Approach", "Interactive Elements", "Accessibility Compliance"]
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
            <div className="max-w-7xl mx-auto px-6 py-24">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.p
                        className="text-sm text-blue-400 tracking-wider mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        SPECIALIZED EXPERTISE
                    </motion.p>
                    <motion.h1
                        className="text-4xl lg:text-5xl text-gray-100 font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Development Services
                    </motion.h1>
                    <motion.div
                        className="h-1 w-20 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-8"
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    />
                    <motion.p
                        className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Delivering modern web development solutions with a focus on performance,
                        scalability, and exceptional user experience.
                    </motion.p>
                </motion.div>

                {/* Services List - Vertically Stacked */}
                <div className="space-y-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="group relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            onMouseEnter={() => setHoveredService(index)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <div className="flex flex-col lg:flex-row bg-gray-800/50 rounded-xl border border-gray-700 transition-all duration-300 hover:border-blue-500/50 hover:bg-gray-800/70">
                                {/* Service Icon */}
                                <div className="lg:w-1/5 flex justify-center items-center p-8 bg-gradient-to-b from-gray-800 to-gray-900">
                                    <span className="text-5xl">{service.icon}</span>
                                </div>

                                {/* Service Content */}
                                <div className="lg:w-4/5 p-8 lg:p-10">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                        <h2 className="text-2xl text-white font-bold mb-4 md:mb-0">
                                            {service.title}
                                        </h2>

                                        <Link href="/contact" className="inline-block">
                                            <motion.button
                                                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white 
                        shadow-md shadow-blue-500/10 transition-all duration-300 text-sm font-medium"
                                                whileHover={{ y: -2 }}
                                                whileTap={{ y: 0 }}
                                            >
                                                Get Started
                                            </motion.button>
                                        </Link>
                                    </div>

                                    <p className="text-gray-300 mb-8 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {service.highlights.map((highlight, hIndex) => (
                                            <div
                                                key={hIndex}
                                                className="flex items-center text-gray-300 bg-gray-800/70 rounded-lg p-3"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-blue-400 mr-3" />
                                                {highlight}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Animated highlight effect */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                animate={{
                                    background: hoveredService === index
                                        ? "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(79,70,229,0.05) 100%)"
                                        : "none"
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-20 p-10 rounded-xl bg-gray-800/30 border border-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <h3 className="text-2xl text-white font-bold mb-4">Ready to discuss your project?</h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Let&apos;s collaborate to create a tailored solution that perfectly matches your requirements and business goals.
                    </p>
                    <Link href={'/contact'}>
                        <motion.button
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white 
              shadow-lg shadow-blue-500/20 transition-all duration-300 font-medium"
                            whileHover={{
                                y: -2,
                                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)"
                            }}
                            whileTap={{ y: 0 }}
                        >
                            Schedule a Consultation
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}