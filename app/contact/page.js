"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import Header from "../components/Header";

export default function Contact() {
    const [formStatus, setFormStatus] = useState(""); // For success/error message

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                e.target,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            )
            .then(
                (result) => {
                    setFormStatus("Your message has been sent successfully!");
                    e.target.reset(); // Clear form
                },
                (error) => {
                    setFormStatus("Oops! Something went wrong. Please try again.");
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
            icon: "https://cdn-icons-png.flaticon.com/512/174/174855.png", // Instagram Icon
        },
    ];

    return (
        <div className="h-screen flex flex-col bg-primary overflow-hidden">
            {/* Header Section */}
            <Header />

            {/* Contact Content */}
            <section className="flex-grow px-6 sm:px-12 lg:px-20 py-10 sm:py-16 lg:py-20 overflow-y-auto scrollbar-thin scrollbar-thumb-accentBlue scrollbar-track-textSecondary/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full md:scrollbar-none">
                {/* Header */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl sm:text-5xl font-header font-semibold text-accentBlue">
                        Contact Me
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-textSecondary">
                        I&apos;d love to hear from you! Feel free to reach out via the form below
                        or connect with me on social media.
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    className="mt-12 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.form
                        onSubmit={handleSubmit}
                        className="bg-primary border border-accentBlue rounded-lg p-6 shadow-lg space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* Name Field */}
                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <label htmlFor="name" className="text-textMain">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-2 p-2 bg-primary border border-textSecondary rounded focus:outline-none focus:ring-2 focus:ring-accentBlue"
                                required
                            />
                        </motion.div>

                        {/* Email Field */}
                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <label htmlFor="email" className="text-textMain">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-2 p-2 bg-primary border border-textSecondary rounded focus:outline-none focus:ring-2 focus:ring-accentBlue"
                                required
                            />
                        </motion.div>

                        {/* Message Field */}
                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <label htmlFor="message" className="text-textMain">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                className="mt-2 p-2 bg-primary border border-textSecondary rounded focus:outline-none focus:ring-2 focus:ring-accentBlue"
                                required
                            ></textarea>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="w-full bg-accentBlue text-primary font-semibold py-2 px-4 rounded hover:bg-accentGreen transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            Send Message
                        </motion.button>
                    </motion.form>

                    {/* Form Status */}
                    {formStatus && (
                        <p className="mt-4 text-center text-sm text-accentBlue">{formStatus}</p>
                    )}
                </motion.div>

                {/* Social Links */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-header text-accentBlue">
                        Connect with Me
                    </h2>
                    <div className="mt-6 flex justify-center space-x-6">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 flex items-center justify-center bg-textSecondary/20 border border-accentBlue rounded-full shadow-lg hover:shadow-xl transition"
                                whileHover={{ scale: 1.2 }}
                            >
                                <img
                                    src={link.icon}
                                    alt={`${link.name} Icon`}
                                    className="w-8 h-8 object-contain"
                                />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
