"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiHome, HiUser, HiCode, HiBriefcase, HiMail } from "react-icons/hi";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);
    const headerRef = useRef(null);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const navItems = [
        { name: "Home", href: "/", icon: HiHome },
        { name: "About", href: "/about", icon: HiUser },
        { name: "Services", href: "/services", icon: HiCode },
        { name: "Work", href: "/work", icon: HiBriefcase },
        { name: "Contact", href: "/contact", icon: HiMail },
    ];

    const headerVariants = {
        initial: { y: -100, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8
            }
        }
    };

    const menuVariants = {
        open: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        },
        closed: {
            x: "100%",
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <motion.header
            ref={headerRef}
            className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"
                } ${isOpen ? "bg-transparent shadow-none" : ""}`}
            variants={headerVariants}
            initial="initial"
            animate="animate"
        >
            <nav className="container mx-auto flex items-center justify-between py-6 px-6">
                {/* Logo */}
                <motion.div
                    className="relative z-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link href="/" className="text-2xl md:text-3xl font-serif text-gray-100 group flex items-center">
                        <span className="relative">
                            Jatin
                            <motion.span
                                className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:w-full transition-all duration-500"
                            />
                        </span>
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <motion.ul
                    className="hidden lg:flex items-center space-x-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {navItems.map(({ name, href, icon: Icon }) => (
                        <motion.li
                            key={name}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            <Link
                                href={href}
                                className="text-gray-300 hover:text-gray-100 font-light tracking-wide flex items-center gap-2 group"
                            >
                                <Icon className="text-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                                <span className="relative">
                                    {name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:w-full transition-all duration-500" />
                                </span>
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>

                {/* Mobile Menu Button */}
                <motion.button
                    onClick={handleToggle}
                    aria-label="Toggle Menu"
                    className="lg:hidden relative z-50 text-gray-300 hover:text-gray-100 focus:outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: 180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -180, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <HiX className="text-2xl" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: -180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 180, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <HiMenu className="text-2xl" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            onClick={handleToggle}
                        />
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={menuRef}
                            className="fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-xl text-gray-100 flex flex-col p-8 lg:hidden z-50"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <motion.div
                                className="absolute top-6 right-6"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <button
                                    onClick={handleToggle}
                                    className="text-gray-400 hover:text-gray-100 focus:outline-none transition-colors duration-300"
                                    aria-label="Close Menu"
                                >
                                    <HiX className="text-2xl" />
                                </button>
                            </motion.div>

                            <motion.div
                                className="text-2xl font-serif mb-12"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Link href="/" onClick={handleToggle} className="text-gray-100">
                                    Jatin
                                </Link>
                            </motion.div>

                            <ul className="flex flex-col space-y-6">
                                {navItems.map(({ name, href, icon: Icon }, index) => (
                                    <motion.li
                                        key={name}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        whileHover={{ x: 4 }}
                                    >
                                        <Link
                                            href={href}
                                            onClick={handleToggle}
                                            className="text-gray-300 hover:text-gray-100 flex items-center gap-4 group transition-colors duration-300"
                                        >
                                            <Icon className="text-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                                            <span className="relative font-light tracking-wide">
                                                {name}
                                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:w-full transition-all duration-500" />
                                            </span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.div
                                className="mt-auto text-sm text-gray-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                © 2024 Jatin
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
}