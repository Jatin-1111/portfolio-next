"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Clock, Github, Linkedin, Instagram, Send, User, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DailyQuote from "../components/DailyQuote";

// Define form schema with zod
const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    phone: z.string().optional().refine(
        (val) => !val || /^\+?[\d\s-()]{10,}$/.test(val),
        { message: "Invalid phone format" }
    ),
    company: z.string().optional(),
    projectType: z.string().optional(),
    timeline: z.string().optional(),
    message: z.string().min(1, { message: "Message is required" }),
});

export default function Contact() {
    const [formStatus, setFormStatus] = useState("");
    const [sending, setSending] = useState(false);

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
            icon: Github,
            color: "hover:text-gray-100"
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/jatin1011",
            icon: Linkedin,
            color: "hover:text-blue-400"
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/_jatin_1011/",
            icon: Instagram,
            color: "hover:text-pink-400"
        },
    ];

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "off.jatin1111@gmail.com",
            color: "text-blue-400"
        },
        {
            icon: Clock,
            label: "Response Time",
            value: "Within 24 hours",
            color: "text-emerald-400"
        }
    ];

    // Form definition using react-hook-form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            projectType: "",
            timeline: "",
            message: ""
        },
    });

    // Submit handler
    const onSubmit = async (data) => {
        setSending(true);
        setFormStatus("");

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                setFormStatus("Thank you! Your message has been sent successfully.");
                form.reset();
            } else {
                throw new Error(responseData.error || "Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setFormStatus("Sorry, something went wrong. Please try again later.");
        } finally {
            setSending(false);
        }
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
                            GET IN TOUCH
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-4 sm:mb-6 leading-tight"
                    >
                        Let&apos;s Work
                        <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                            Together
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
                        Have a project in mind? I&apos;d love to hear about it. Send me a message
                        and let&apos;s create something amazing together.
                    </motion.p>
                </div>
            </motion.section>

            {/* Main Content */}
            <section className="pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-gray-800/30 border border-gray-700/50 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm"
                            >
                                <div className="mb-6 sm:mb-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-white mb-2">
                                        Send Me a Message
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-400">
                                        Fill out the form below and I&apos;ll get back to you as soon as possible.
                                    </p>
                                </div>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                                        {/* Name Fields */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            <FormField
                                                control={form.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs sm:text-sm text-gray-400 font-medium">
                                                            First Name *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="John"
                                                                className="bg-gray-900/50 border-gray-700/50 text-gray-100 placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 h-10 sm:h-12 text-sm sm:text-base"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-xs text-red-400" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs sm:text-sm text-gray-400 font-medium">
                                                            Last Name *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Doe"
                                                                className="bg-gray-900/50 border-gray-700/50 text-gray-100 placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 h-10 sm:h-12 text-sm sm:text-base"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-xs text-red-400" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Contact Fields */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs sm:text-sm text-gray-400 font-medium">
                                                            Email Address *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="email"
                                                                placeholder="john@example.com"
                                                                className="bg-gray-900/50 border-gray-700/50 text-gray-100 placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 h-10 sm:h-12 text-sm sm:text-base"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-xs text-red-400" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs sm:text-sm text-gray-400 font-medium">
                                                            Phone Number
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="tel"
                                                                placeholder="+1 (123) 456-7890"
                                                                className="bg-gray-900/50 border-gray-700/50 text-gray-100 placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 h-10 sm:h-12 text-sm sm:text-base"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-xs text-red-400" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Company Field */}
                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs sm:text-sm text-gray-400 font-medium">
                                                        Company/Organization
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Your Company Name"
                                                            className="bg-gray-900/50 border-gray-700/50 text-gray-100 placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 h-10 sm:h-12 text-sm sm:text-base"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Project Details */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            <FormField
                                                control={form.control}
                                                name="projectType"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs sm:text-sm text-gray-400 font-medium">
                                                            Project Type
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="bg-gray-900/50 border-gray-700/50 text-gray-100 focus:border-blue-500/50 focus:ring-blue-500/20 h-10 sm:h-12 text-sm sm:text-base">
                                                                    <SelectValue placeholder="Select Project Type" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="bg-gray-900 border-gray-700 text-gray-100">
                                                                {projectTypes.map(type => (
                                                                    <SelectItem key={type} value={type} className="hover:bg-gray-800 focus:bg-gray-800">
                                                                        {type}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="timeline"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs sm:text-sm text-gray-400 font-medium">
                                                            Timeline
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="bg-gray-900/50 border-gray-700/50 text-gray-100 focus:border-blue-500/50 focus:ring-blue-500/20 h-10 sm:h-12 text-sm sm:text-base">
                                                                    <SelectValue placeholder="Select Timeline" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="bg-gray-900 border-gray-700 text-gray-100">
                                                                {timelineOptions.map(option => (
                                                                    <SelectItem key={option} value={option} className="hover:bg-gray-800 focus:bg-gray-800">
                                                                        {option}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Message Field */}
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs sm:text-sm text-gray-400 font-medium">
                                                        Project Details *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            rows={6}
                                                            placeholder="Tell me about your project goals, requirements, and any specific features you'd like to include..."
                                                            className="bg-gray-900/50 border-gray-700/50 text-gray-100 placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 text-sm sm:text-base resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs text-red-400" />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Submit Button */}
                                        <motion.div
                                            whileHover={{ y: -2 }}
                                            whileTap={{ y: 0 }}
                                        >
                                            <Button
                                                type="submit"
                                                disabled={sending}
                                                className="w-full h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white font-medium text-sm sm:text-base shadow-lg shadow-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {sending ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                        />
                                                        <span>Sending Message...</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        <span>Send Message</span>
                                                    </div>
                                                )}
                                            </Button>
                                        </motion.div>

                                        {/* Form Status */}
                                        <AnimatePresence>
                                            {formStatus && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className={`text-sm text-center p-4 rounded-xl border ${formStatus.includes("successfully")
                                                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                                                        : "text-red-400 bg-red-500/10 border-red-500/20"
                                                        }`}
                                                >
                                                    {formStatus}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </form>
                                </Form>
                            </motion.div>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="space-y-6 sm:space-y-8"
                            >
                                {/* Contact Information */}
                                <div className="bg-gray-800/30 border border-gray-700/50 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-500/10 rounded-xl">
                                            <User className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-medium text-white">
                                            Contact Information
                                        </h3>
                                    </div>

                                    <div className="space-y-4">
                                        {contactInfo.map((item, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <item.icon className={`w-5 h-5 ${item.color} mt-0.5 flex-shrink-0`} />
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                                                    <p className="text-sm sm:text-base text-gray-300">{item.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="bg-gray-800/30 border border-gray-700/50 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-purple-500/10 rounded-xl">
                                            <MessageSquare className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-medium text-white">
                                            Connect With Me
                                        </h3>
                                    </div>

                                    <div className="flex gap-4">
                                        {socialLinks.map((link, index) => (
                                            <motion.a
                                                key={index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`group p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-400 ${link.color} transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-700/50`}
                                                whileHover={{ y: -2, scale: 1.05 }}
                                                whileTap={{ y: 0, scale: 0.95 }}
                                            >
                                                <link.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </motion.a>
                                        ))}
                                    </div>

                                    <p className="text-xs sm:text-sm text-gray-500 mt-4">
                                        Feel free to reach out on any platform!
                                    </p>
                                </div>

                                {/* Quote Card */}
                                <DailyQuote showRefresh={true} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}