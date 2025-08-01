'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase,
    GraduationCap,
    Code,
    User,
    Clock,
    MapPin,
    ChevronRight
} from 'lucide-react';

const ProfileTabs = () => {
    const [activeTab, setActiveTab] = useState('experience');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every hour (not every minute - waste of resources)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 3600000); // Update every hour (1000 * 60 * 60)

        return () => clearInterval(timer);
    }, []);

    // Optimized memoized calculation - O(1) time complexity
    const calculateExperiencePeriod = React.useMemo(() => {
        return (startDate, endDate = null) => {
            const start = new Date(startDate);
            const end = endDate ? new Date(endDate) : currentTime;

            // Direct month calculation - more efficient than days conversion
            const startYear = start.getFullYear();
            const startMonth = start.getMonth();
            const endYear = end.getFullYear();
            const endMonth = end.getMonth();

            const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
            const years = Math.floor(totalMonths / 12);
            const months = totalMonths % 12;

            // Pre-computed duration string - avoid repeated string operations
            let duration = '';
            if (years > 0) {
                duration += `${years} yr${years > 1 ? 's' : ''} `;
            }
            if (months > 0) {
                duration += `${months} mo${months > 1 ? 's' : ''}`;
            }
            if (!years && !months) {
                duration = '1 mo';
            }

            // Cache formatted dates to avoid repeated toLocaleDateString calls
            const startFormatted = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            const endFormatted = endDate
                ? end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : 'Present';

            return `${startFormatted} - ${endFormatted} • ${duration.trim()}`;
        };
    }, [currentTime]); // Only recalculate when currentTime changes

    const tabs = [
        { id: 'experience', label: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
        { id: 'education', label: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
        { id: 'skills', label: 'Skills', icon: <Code className="w-5 h-5" /> },
        { id: 'about', label: 'About me', icon: <User className="w-5 h-5" /> }
    ];

    const experiences = [
        {
            title: "Web Developer",
            company: "UNIQUS EDUTECH SOLUTIONS",
            startDate: "2025-01-01", // Use actual start date
            endDate: null, // null means current/ongoing
            location: "Hybrid",
            description: "Develop responsive web applications using Next.js and React.js. Implemented UI components with Tailwind CSS and ShadCN, created backend APIs using Node.js and Express.js, and improved site performance using MongoDB.",
            technologies: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Framer Motion", "ShadCN", "Postman API", "MERN Stack", "JavaScript"]
        },
        // Add more experiences here with their respective dates
    ];

    const education = [
        {
            degree: "Bachelor of Engineering in Information Technology",
            institution: "University Institute of Engineering and Technology, Chandigarh",
            duration: "August 2024 – Present",
            coursework: ["Data Structures & Algorithms", "Web Development", "Database Management Systems"]
        },
        {
            degree: "Higher Secondary Education (PCM)",
            institution: "Vivekananda World School",
            duration: "2023",
            percentage: "82.2%"
        }
    ];

    const skills = [
        {
            category: "Frontend Development",
            items: ["Next.js 13/14", "React.js", "TypeScript", "Tailwind CSS", "ShadCN", "Framer Motion", "HTML5", "CSS3"]
        },
        {
            category: "Backend Development",
            items: ["Node.js", "Express.js", "Firebase (Auth, Firestore)", "RESTful APIs", "Nodemailer"]
        },
        {
            category: "Database & Authentication",
            items: ["MongoDB", "Firebase", "JWT"]
        },
        {
            category: "Development Tools",
            items: ["Git", "GitHub", "Vercel", "Postman", "VS Code", "Lighthouse", "CI/CD"]
        }
    ];

    const about = {
        name: "Jatin Kumar",
        title: "Full-Stack Web Developer",
        description: "Results-driven Full-Stack Web Developer skilled in Next.js, React.js, Tailwind CSS, Node.js, Express.js, and MongoDB. Expert in JWT authentication, RESTful APIs, and database integration, delivering high-performance, SEO-optimized applications with 95% component reusability and 95+ Lighthouse scores. Focused on clean, maintainable code and exceptional UI/UX for modern, responsive web apps.",
        softSkills: [
            "Problem Solving",
            "Team Collaboration",
            "Technical Documentation",
            "UI/UX Design"
        ]
    };

    // Animation variants optimized for performance
    const tabContentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2 }
        }
    };

    const staggerItemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: custom * 0.1,
                duration: 0.3
            }
        })
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'experience':
                return (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="experience"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-8"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl text-white font-light mb-2">Professional Experience</h2>
                                <p className="text-gray-400">My journey in web development</p>
                            </div>

                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    custom={index}
                                    variants={staggerItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                                >
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl text-white font-medium">{exp.title}</h3>
                                            <p className="text-blue-400">{exp.company}</p>
                                            <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" /> {exp.location}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-blue-400 text-sm flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {calculateExperiencePeriod(exp.startDate, exp.endDate)}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-300 mb-4">{exp.description}</p>

                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="text-white text-sm font-medium mb-2">Key Achievements:</h4>
                                            <ul className="space-y-1">
                                                {exp.achievements.map((achievement, i) => (
                                                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                                                        <ChevronRight className="w-3.5 h-3.5 text-blue-400 mt-1 flex-shrink-0" />
                                                        <span>{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-gray-900/70 text-blue-300 text-sm rounded-full border border-gray-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                );

            case 'education':
                return (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="education"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-8"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl text-white font-light mb-2">Education</h2>
                                <p className="text-gray-400">My academic background and qualifications</p>
                            </div>

                            <div className="space-y-6">
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        custom={index}
                                        variants={staggerItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                                    >
                                        <h3 className="text-xl text-white font-medium mb-2">{edu.degree}</h3>
                                        <p className="text-gray-300 mb-2">{edu.institution}</p>
                                        <p className="text-blue-400 text-sm">{edu.duration}</p>

                                        {edu.percentage && (
                                            <p className="text-gray-300 text-sm mt-2">Percentage: {edu.percentage}</p>
                                        )}

                                        {edu.coursework && (
                                            <div className="mt-4">
                                                <h4 className="text-white text-sm font-medium mb-2">Relevant Coursework:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {edu.coursework.map((course, i) => (
                                                        <span key={i} className="px-3 py-1 bg-gray-900/70 text-blue-300 text-sm rounded-full">
                                                            {course}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                );

            case 'skills':
                return (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="skills"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-8"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl text-white font-light mb-2">Technical Skills</h2>
                                <p className="text-gray-400">A comprehensive overview of my technical expertise</p>
                            </div>

                            {skills.map((skillGroup, index) => (
                                <motion.div
                                    key={index}
                                    custom={index}
                                    variants={staggerItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                                >
                                    <h3 className="text-xl text-white font-medium mb-4">{skillGroup.category}</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {skillGroup.items.map((skill, idx) => (
                                            <span key={idx} className="px-4 py-2 bg-gray-900/70 text-blue-300 rounded-lg text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                );

            case 'about':
                return (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="about"
                            variants={tabContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-8"
                        >
                            <div className="flex flex-col lg:flex-row items-start gap-12">
                                <motion.div
                                    className="space-y-6 w-full"
                                    variants={staggerItemVariants}
                                    custom={0}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <div>
                                        <h2 className="text-3xl text-white font-light mb-2">About Me</h2>
                                        <p className="text-blue-400 text-xl">{about.title}</p>
                                    </div>

                                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                                        <p className="text-gray-300 text-lg leading-relaxed">
                                            {about.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <motion.div
                                            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                                            variants={staggerItemVariants}
                                            custom={2}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            <h3 className="text-white text-lg font-medium mb-3">Soft Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {about.softSkills.map((skill, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-gray-900/70 text-blue-300 text-sm rounded-full border border-gray-700">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-28 md:pt-36 px-4 sm:px-6 lg:px-8 xl:px-16">
            <div className="max-w-6xl mx-auto">
                {/* Main content with tabs */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar with tabs */}
                    <div className="md:w-72 space-y-4">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`w-full py-4 px-6 rounded-lg text-left transition-all flex items-center gap-3 
                  ${activeTab === tab.id
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-800 text-white hover:bg-gray-700'
                                    }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content area */}
                    <div className="flex-1">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTabs;