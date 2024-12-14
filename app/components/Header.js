"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // Reference to the sliding menu container

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false); // Close the menu if clicking outside
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Framer Motion Variants
    const menuVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: "100%", opacity: 0 },
    };

    const menuTransition = {
        type: "tween",
        duration: 0.4,
        ease: "easeInOut",
    };

    return (
        <header className="bg-primary text-textMain top-0 w-full z-50 flex">
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
                            <motion.div
                                key="close"
                                initial={{ rotate: 180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <HiX className="text-3xl hover:text-accentBlue" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -180, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <HiMenu className="text-3xl hover:text-accentBlue" />
                            </motion.div>
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
                        <Link href="/about" className="hover:text-accentBlue transition md:text-xl">
                            About
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
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={menuRef} // Attach the menuRef to the sliding menu
                            className="fixed top-0 right-0 h-full w-64 bg-primary shadow-lg text-textMain flex flex-col items-center justify-center space-y-8 lg:hidden"
                            variants={menuVariants} // Add open and closed animations
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={menuTransition}
                        >
                            <button
                                onClick={handleToggle}
                                className="absolute top-4 right-4 text-accentBlue focus:outline-none"
                            >
                                <HiX className="text-3xl" />
                            </button>
                            <h1 className="font-header text-3xl text-accentBlue">
                                <Link href="/" onClick={handleToggle}>
                                    Jatin
                                </Link>
                            </h1>
                            <ul className="flex flex-col items-center space-y-6 text-lg font-body">
                                {["Home", "About", "Services", "Work", "Contact"].map((item) => (
                                    <li key={item}>
                                        <Link
                                            href={item === "Home" ? `/` : `/${item.toLowerCase()}`}
                                            onClick={handleToggle}
                                            className="hover:text-accentBlue"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
