"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Book, Github, Linkedin, Instagram } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            icon: Github
        },
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/jatin1011",
            icon: Linkedin
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/_jatin_1011/",
            icon: Instagram
        },
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
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm text-gray-400">First Name *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John"
                                                        className="bg-gray-900/50 border-gray-800 text-gray-100 focus:border-blue-500/50"
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
                                                <FormLabel className="text-sm text-gray-400">Last Name *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Doe"
                                                        className="bg-gray-900/50 border-gray-800 text-gray-100 focus:border-blue-500/50"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Contact Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm text-gray-400">Email Address *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        className="bg-gray-900/50 border-gray-800 text-gray-100 focus:border-blue-500/50"
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
                                                <FormLabel className="text-sm text-gray-400">Phone Number (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="+1 (123) 456-7890"
                                                        className="bg-gray-900/50 border-gray-800 text-gray-100 focus:border-blue-500/50"
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
                                            <FormLabel className="text-sm text-gray-400">Company/Organization (Optional)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Your Company Name"
                                                    className="bg-gray-900/50 border-gray-800 text-gray-100 focus:border-blue-500/50"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {/* Project Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="projectType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm text-gray-400">Project Type</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-gray-900/50 border-gray-800 text-gray-100 focus:border-blue-500/50">
                                                            <SelectValue placeholder="Select Project Type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-gray-900 border-gray-800 text-gray-100">
                                                        {projectTypes.map(type => (
                                                            <SelectItem key={type} value={type}>
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
                                                <FormLabel className="text-sm text-gray-400">Project Timeline</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-gray-900/50 border-gray-800 text-gray-100 focus:border-blue-500/50">
                                                            <SelectValue placeholder="Select Timeline" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-gray-900 border-gray-800 text-gray-100">
                                                        {timelineOptions.map(option => (
                                                            <SelectItem key={option} value={option}>
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
                                            <FormLabel className="text-sm text-gray-400">Project Details *</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    rows={6}
                                                    placeholder="Tell me about your project goals, requirements, and any specific features you'd like to include..."
                                                    className="bg-gray-900/50 border-gray-800 text-gray-100 focus:border-blue-500/50"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit Button */}
                                <motion.div
                                    whileHover={{
                                        y: -2,
                                        boxShadow: "0 20px 25px -5px rgb(59 130 246 / 0.3)"
                                    }}
                                    whileTap={{ y: 0 }}
                                >
                                    <Button
                                        type="submit"
                                        disabled={sending}
                                        className="w-full px-8 py-6 bg-gradient-to-r from-blue-500 to-indigo-600 
                      rounded-lg text-white shadow-lg shadow-blue-500/20 transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed h-auto"
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
                                    </Button>
                                </motion.div>

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
                        </Form>
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
                            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-100 font-light">
                                        Contact Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4 text-gray-400 font-light">
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-blue-400" />
                                            <p>off.jatin1111@gmail.com</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Book className="w-5 h-5 text-blue-400" />
                                            <p>Response time: Within 24 hours</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Social Links */}
                            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-100 font-light">
                                        Connect With Me
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex space-x-6">
                                        {socialLinks.map((link, index) => {
                                            const IconComponent = link.icon;
                                            return (
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
                                                    <IconComponent
                                                        className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                                                        color={link.name === "GitHub" ? "#ffffff" : link.name === "LinkedIn" ? "#0077B5" : "#E1306C"}
                                                    />
                                                </motion.a>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Additional Information */}
                            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
                                <CardContent className="pt-6">
                                    <blockquote className="text-gray-400 font-light italic">
                                        &quot;The best way to predict the future is to create it.&quot;
                                    </blockquote>
                                    <p className="text-sm text-gray-500 mt-2">- Peter Drucker</p>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}