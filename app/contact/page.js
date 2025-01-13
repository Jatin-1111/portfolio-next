"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        timeline: "",
        message: ""
    });
    const [formStatus, setFormStatus] = useState("");
    const [sending, setSending] = useState(false);
    const [errors, setErrors] = useState({});

    const projectTypes = [
        "Web Development",
        "UI/UX Design",
        "Full-Stack Application",
        "Performance Optimization",
        "Consulting",
        "Other"
    ];

    const timelineOptions = [
        "Less than 1 month",
        "1-3 months",
        "3-6 months",
        "6+ months"
    ];

    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/Jatin-1111",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/jatin1011",
            icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/_jatin_1011/",
            icon: "https://cdn-icons-png.flaticon.com/512/174/174855.png",
        },
    ];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (formData.phone && !/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
            newErrors.phone = "Invalid phone format";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setSending(true);
        setFormStatus("");

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setFormStatus("Thank you! Your message has been sent successfully.");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    company: "",
                    projectType: "",
                    timeline: "",
                    message: ""
                });
            } else {
                throw new Error(data.error || "Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setFormStatus("Sorry, something went wrong. Please try again later.");
        } finally {
            setSending(false);
        }
    };

    const inputClasses = `w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg 
        focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 
        text-gray-100 transition-all duration-300`;

    const labelClasses = "block text-sm text-gray-400 mb-2 font-light";

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 overflow-y-auto
            scrollbar scrollbar-track-gray-900/50 scrollbar-thumb-blue-500/50 
            hover:scrollbar-thumb-blue-500 scrollbar-thumb-rounded-full">
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
                        GET IN TOUCH
                    </motion.p>
                    <motion.h1
                        className="text-4xl lg:text-5xl text-gray-100 font-serif font-light mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Let&apos;s Work Together
                    </motion.h1>
                    <motion.div
                        className="h-px w-20 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-8"
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    />
                    <motion.p
                        className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Have a project in mind? I&apos;d love to hear about it. Send me a message
                        and let&apos;s create something amazing together.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>First Name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`${inputClasses} ${errors.firstName ? 'border-red-500' : ''}`}
                                        placeholder="John"
                                    />
                                    {errors.firstName && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-1 text-xs text-red-400"
                                        >
                                            {errors.firstName}
                                        </motion.p>
                                    )}
                                </div>

                                <div>
                                    <label className={labelClasses}>Last Name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`${inputClasses} ${errors.lastName ? 'border-red-500' : ''}`}
                                        placeholder="Doe"
                                    />
                                    {errors.lastName && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-1 text-xs text-red-400"
                                        >
                                            {errors.lastName}
                                        </motion.p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-1 text-xs text-red-400"
                                        >
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </div>

                                <div>
                                    <label className={labelClasses}>Phone Number (Optional)</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`${inputClasses} ${errors.phone ? 'border-red-500' : ''}`}
                                        placeholder="+1 (123) 456-7890"
                                    />
                                    {errors.phone && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-1 text-xs text-red-400"
                                        >
                                            {errors.phone}
                                        </motion.p>
                                    )}
                                </div>
                            </div>

                            {/* Company Field */}
                            <div>
                                <label className={labelClasses}>Company/Organization (Optional)</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="Your Company Name"
                                />
                            </div>

                            {/* Project Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>Project Type</label>
                                    <select
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        className={inputClasses}
                                    >
                                        <option value="">Select Project Type</option>
                                        {projectTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClasses}>Project Timeline</label>
                                    <select
                                        name="timeline"
                                        value={formData.timeline}
                                        onChange={handleChange}
                                        className={inputClasses}
                                    >
                                        <option value="">Select Timeline</option>
                                        {timelineOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className={labelClasses}>Project Details *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    className={`${inputClasses} ${errors.message ? 'border-red-500' : ''}`}
                                    placeholder="Tell me about your project goals, requirements, and any specific features you'd like to include..."
                                />
                                {errors.message && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-1 text-xs text-red-400"
                                    >
                                        {errors.message}
                                    </motion.p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 
                                    rounded-lg text-white shadow-lg shadow-blue-500/20 transition-all duration-300
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{
                                    y: -2,
                                    boxShadow: "0 20px 25px -5px rgb(59 130 246 / 0.3)"
                                }}
                                whileTap={{ y: 0 }}
                                disabled={sending}
                            >
                                {sending ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>Sending</span>
                                        <motion.span
                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                        >
                                            ●
                                        </motion.span>
                                    </div>
                                ) : (
                                    "Send Message"
                                )}
                            </motion.button>

                            {/* Form Status */}
                            <AnimatePresence>
                                {formStatus && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`text-sm text-center p-4 rounded-lg ${formStatus.includes("successfully")
                                            ? "text-green-400 bg-green-900/20"
                                            : "text-red-400 bg-red-900/20"
                                            }`}
                                    >
                                        {formStatus}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>

                    {/* Contact Info & Social Links */}
                    <motion.div
                        className="lg:pl-16"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="space-y-12">
                            {/* Contact Information */}
                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8">
                                <h3 className="text-xl text-gray-100 font-light mb-6">
                                    Contact Information
                                </h3>
                                <div className="space-y-4 text-gray-400 font-light">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <p>off.jatin1111@gmail.com</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <p>Response time: Within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8">
                                <h3 className="text-xl text-gray-100 font-light mb-6">
                                    Connect With Me
                                </h3>
                                <div className="flex space-x-6">
                                    {socialLinks.map((link, index) => (
                                        <motion.a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg 
                                                hover:border-blue-500/20 transition-all duration-300 group"
                                            whileHover={{
                                                y: -4,
                                                boxShadow: "0 4px 20px -2px rgba(66, 153, 225, 0.1)"
                                            }}
                                        >
                                            <img
                                                src={link.icon}
                                                alt={`${link.name} Icon`}
                                                className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8">
                                <blockquote className="text-gray-400 font-light italic">
                                    &quot;The best way to predict the future is to create it.&quot;
                                </blockquote>
                                <p className="text-sm text-gray-500 mt-2">- Peter Drucker</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}