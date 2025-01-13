"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

export default function Contact() {
    const [formStatus, setFormStatus] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                e.target,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            )
            .then(
                (result) => {
                    setFormStatus("Message sent successfully!");
                    e.target.reset();
                    setSending(false);
                },
                (error) => {
                    setFormStatus("Something went wrong. Please try again.");
                    setSending(false);
                }
            );
    };

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
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-2 font-light">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg 
                                        focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 
                                        text-gray-100 transition-all duration-300"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-2 font-light">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg 
                                        focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 
                                        text-gray-100 transition-all duration-300"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-2 font-light">
                                    Your Message
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows="6"
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg 
                                        focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 
                                        text-gray-100 transition-all duration-300"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 
                                    rounded-lg text-white shadow-lg shadow-blue-500/20 transition-all duration-300
                                    disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{
                                    y: -2,
                                    shadow: "0 20px 25px -5px rgb(59 130 246 / 0.3)"
                                }}
                                whileTap={{ y: 0 }}
                                disabled={sending}
                            >
                                {sending ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>Sending</span>
                                        <motion.span
                                            animate={{
                                                opacity: [0.3, 1, 0.3],
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                repeat: Infinity,
                                            }}
                                        >
                                            ●
                                        </motion.span>
                                    </div>
                                ) : (
                                    "Send Message"
                                )}
                            </motion.button>

                            {formStatus && (
                                <motion.p
                                    className="text-sm text-center text-blue-400"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {formStatus}
                                </motion.p>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Info & Social Links */}
                    <motion.div
                        className="lg:pl-16"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="space-y-8">
                            {/* Contact Information */}
                            <div>
                                <h3 className="text-xl text-gray-100 font-light mb-4">
                                    Contact Information
                                </h3>
                                <div className="space-y-4 text-gray-400 font-light">
                                    <p>Feel free to reach out through any platform</p>
                                    <p>Response time: Within 24 hours</p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div>
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
                                                hover:border-blue-500/20 transition-all duration-300"
                                            whileHover={{
                                                y: -4,
                                                boxShadow: "0 4px 20px -2px rgba(66, 153, 225, 0.1)"
                                            }}
                                        >
                                            <img
                                                src={link.icon}
                                                alt={`${link.name} Icon`}
                                                className="w-6 h-6"
                                            />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="pt-8 border-t border-gray-800">
                                <blockquote className="text-gray-400 font-light italic">
                                    &quot;The best way to predict the future is to create it.&quot;
                                </blockquote>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}