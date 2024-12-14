"use client"
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-primary text-textMain shadow-md top-0 w-full z-50 flex">
            <nav className="container mx-auto flex items-center justify-between py-4 px-6 h-[10vh]">
                {/* Logo */}
                <motion.h1
                    className="font-header text-3xl text-accentBlue cursor-pointer"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Link href="/" className="md:text-4xl">Jatin</Link>
                </motion.h1>

                {/* Hamburger Menu Icon (Mobile) */}
                <div className="lg:hidden">
                    <button
                        onClick={handleToggle}
                        aria-label="Toggle Menu"
                        className="text-textMain focus:outline-none"
                    >
                        {isOpen ? (
                            <HiX className="text-3xl hover:accentBlue" />
                        ) : (
                            <HiMenu className="text-3xl hover:accentBlue" />
                        )}
                    </button>
                </div>

                {/* Navigation Links (Desktop) */}
                <motion.ul
                    className="hidden lg:flex space-x-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delayChildren: 0.4, staggerChildren: 0.1 }}
                >
                    <motion.li
                        whileHover={{ scale: 1.1, color: "#1E90FF" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link href="/" className="hover:text-accentBlue transition md:text-xl">
                            Home
                        </Link>
                    </motion.li>
                    <motion.li
                        whileHover={{ scale: 1.1, color: "#1E90FF" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link href="/services" className="hover:text-accentBlue transition md:text-xl">
                            Services
                        </Link>
                    </motion.li>
                    <motion.li
                        whileHover={{ scale: 1.1, color: "#1E90FF" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link href="/resume" className="hover:text-accentBlue transition md:text-xl">
                            Resume
                        </Link>
                    </motion.li>
                    <motion.li
                        whileHover={{ scale: 1.1, color: "#1E90FF" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link href="/work" className="hover:text-accentBlue transition md:text-xl">
                            Work
                        </Link>
                    </motion.li>
                    <motion.li
                        whileHover={{ scale: 1.1, color: "#1E90FF" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Link href="/contact" className="hover:text-accentBlue transition md:text-xl">
                            Contact
                        </Link>
                    </motion.li>
                </motion.ul>


                {/* Mobile Sliding Menu */}
                <motion.div
                    className="fixed top-0 right-0 h-full w-64 bg-primary shadow-lg text-textMain flex flex-col items-center justify-center space-y-8 lg:hidden"
                    initial={{ x: "100%" }}
                    animate={{ x: isOpen ? "0%" : "100%" }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween", duration: 0.4 }}
                >
                    <button
                        onClick={handleToggle}
                        className="absolute top-4 right-4 accentBlue focus:outline-none"
                    >
                        <HiX className="text-3xl" />
                    </button>
                    <h1 className="font-header text-3xl text-accentBlue">
                        <Link href="/" onClick={handleToggle}>Jatin</Link>
                    </h1>
                    <ul className="flex flex-col items-center space-y-6 text-lg font-body">
                        <li><Link href="/" onClick={handleToggle} className="hover:accentBlue">Home</Link></li>
                        <li><Link href="/services" onClick={handleToggle} className="hover:accentBlue">Services</Link></li>
                        <li><Link href="/resume" onClick={handleToggle} className="hover:accentBlue">Resume</Link></li>
                        <li><Link href="/work" onClick={handleToggle} className="hover:accentBlue">Work</Link></li>
                        <li><Link href="/contact" onClick={handleToggle} className="hover:accentBlue">Contact</Link></li>
                    </ul>
                </motion.div>
            </nav>
        </header>
    );
}
