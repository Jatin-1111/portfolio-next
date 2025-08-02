"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiHome, HiUser, HiCode, HiBriefcase, HiMail } from "react-icons/hi";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const pathname = usePathname();

    const navItems = [
        {
            name: "Home",
            href: "/",
            icon: HiHome,
            color: "from-blue-500 to-cyan-500",
            activeClasses: "bg-blue-500/10 border-blue-500/30 text-white"
        },
        {
            name: "About",
            href: "/about",
            icon: HiUser,
            color: "from-purple-500 to-pink-500",
            activeClasses: "bg-purple-500/10 border-purple-500/30 text-white"
        },
        {
            name: "Services",
            href: "/services",
            icon: HiCode,
            color: "from-green-500 to-emerald-500",
            activeClasses: "bg-green-500/10 border-green-500/30 text-white"
        },
        {
            name: "Work",
            href: "/work",
            icon: HiBriefcase,
            color: "from-orange-500 to-red-500",
            activeClasses: "bg-orange-500/10 border-orange-500/30 text-white"
        },
        {
            name: "Contact",
            href: "/contact",
            icon: HiMail,
            color: "from-indigo-500 to-blue-500",
            activeClasses: "bg-indigo-500/10 border-indigo-500/30 text-white"
        },
    ];

    const handleToggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const isActive = (href) => {
        if (href === "/") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const headerVariants = {
        initial: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.4
            }
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.4
            }
        }
    };

    const logoVariants = {
        initial: { scale: 1, rotate: 0 },
        hover: {
            scale: 1.05,
            rotate: [0, -2, 2, 0],
            transition: { duration: 0.3 }
        },
        tap: { scale: 0.95 }
    };

    const menuVariants = {
        open: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        closed: {
            x: "100%",
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.03,
                staggerDirection: -1
            }
        }
    };

    const mobileItemVariants = {
        open: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
            }
        },
        closed: {
            x: 50,
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
            }
        }
    };

    const desktopItemVariants = {
        rest: { scale: 1, y: 0 },
        hover: {
            scale: 1.05,
            y: -2,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        },
        tap: { scale: 0.98, y: 0 }
    };

    return (
        <>
            {/* Header */}
            <motion.header
                ref={headerRef}
                className="sticky top-0 w-full z-50 bg-gray-900 backdrop-blur-xl border-b border-gray-700/50 transition-all duration-300"
                variants={headerVariants}
                initial="initial"
                animate="animate"
            >
                <nav className="container mx-auto flex items-center justify-between py-4 sm:py-6 px-4 sm:px-6">
                    {/* Logo with enhanced animations */}
                    <motion.div
                        className="relative z-50"
                        variants={logoVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link href="/" className="group flex items-center">
                            <span className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-serif text-gray-100 relative">
                                Jatin
                                {/* Animated underline */}
                                <motion.span
                                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                />
                                {/* Glow effect */}
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-lg"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation with enhanced effects */}
                    <motion.ul
                        className="hidden lg:flex items-center space-x-1 xl:space-x-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {navItems.map(({ name, href, icon: Icon, color, activeClasses }, index) => {
                            const active = isActive(href);
                            return (
                                <motion.li
                                    key={name}
                                    variants={desktopItemVariants}
                                    initial="rest"
                                    whileHover="hover"
                                    whileTap="tap"
                                    onHoverStart={() => setHoveredItem(index)}
                                    onHoverEnd={() => setHoveredItem(null)}
                                    className="relative"
                                >
                                    <Link
                                        href={href}
                                        className={`group relative flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 rounded-xl transition-all duration-300 text-sm lg:text-base border ${active
                                                ? activeClasses
                                                : 'text-gray-300 hover:text-white border-transparent'
                                            }`}
                                    >
                                        {/* Background glow effect */}
                                        <motion.div
                                            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                            layoutId={active ? "activeBackground" : undefined}
                                        />

                                        {/* Icon with rotation effect */}
                                        <motion.div
                                            animate={hoveredItem === index ? { rotate: 360 } : { rotate: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Icon className="text-base lg:text-lg" />
                                        </motion.div>

                                        {/* Text with slide effect */}
                                        <span className="relative font-medium tracking-wide">
                                            {name}
                                            <motion.span
                                                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r ${color}`}
                                                initial={{ width: active ? "100%" : 0 }}
                                                whileHover={{ width: "100%" }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </span>

                                        {/* Floating particles effect on hover */}
                                        <AnimatePresence>
                                            {hoveredItem === index && (
                                                <motion.div
                                                    className="absolute inset-0 pointer-events-none"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    {[...Array(3)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className={`absolute w-1 h-1 bg-gradient-to-r ${color} rounded-full`}
                                                            initial={{
                                                                x: "50%",
                                                                y: "50%",
                                                                scale: 0
                                                            }}
                                                            animate={{
                                                                x: `${Math.random() * 100}%`,
                                                                y: `${Math.random() * 100}%`,
                                                                scale: [0, 1, 0]
                                                            }}
                                                            transition={{
                                                                duration: 1,
                                                                delay: i * 0.1,
                                                                repeat: Infinity,
                                                                repeatDelay: 2
                                                            }}
                                                        />
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                </motion.li>
                            );
                        })}
                    </motion.ul>

                    {/* Mobile Menu Button with enhanced styling */}
                    <motion.button
                        onClick={handleToggle}
                        aria-label="Toggle Menu"
                        className="lg:hidden relative z-50 p-3 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isOpen ? 'close' : 'menu'}
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="relative"
                            >
                                {isOpen ? (
                                    <div className="relative">
                                        <HiX className="text-xl sm:text-2xl" />
                                        {/* Close icon glow effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-red-500/20 rounded-lg blur-md"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 0.5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative">
                                        {/* Hamburger icon with animated lines */}
                                        <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                                            <motion.div
                                                className="w-5 h-0.5 bg-current rounded-full"
                                                animate={{
                                                    rotateZ: 0,
                                                    y: 0,
                                                    opacity: 1
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                            <motion.div
                                                className="w-5 h-0.5 bg-current rounded-full"
                                                animate={{
                                                    opacity: 1,
                                                    x: 0
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                            <motion.div
                                                className="w-5 h-0.5 bg-current rounded-full"
                                                animate={{
                                                    rotateZ: 0,
                                                    y: 0,
                                                    opacity: 1
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                        {/* Menu icon glow effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-blue-500/20 rounded-lg blur-md"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 0.3, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-gray-900/90 backdrop-blur-md z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleToggle}
                    />
                )}
            </AnimatePresence>

            {/* Enhanced Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl text-gray-100 flex flex-col lg:hidden z-50 border-l border-gray-700/50"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        style={{
                            backdropFilter: "blur(20px)",
                            background: "linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)"
                        }}
                    >
                        {/* Menu Header */}
                        <motion.div
                            className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gray-900/50"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-xl">
                                    <HiMenu className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="text-xl font-semibold text-gray-100">Menu</span>
                            </div>
                            <motion.button
                                onClick={handleToggle}
                                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <HiX className="text-xl" />
                            </motion.button>
                        </motion.div>

                        {/* Menu Items */}
                        <div className="flex-1 py-8 px-6 overflow-y-auto">
                            <ul className="space-y-4">
                                {navItems.map(({ name, href, icon: Icon, color, activeClasses, iconColor }, index) => {
                                    const active = isActive(href);
                                    return (
                                        <motion.li
                                            key={name}
                                            variants={mobileItemVariants}
                                            whileHover={{ x: 8 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Link
                                                href={href}
                                                onClick={handleToggle}
                                                className={`group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border ${active
                                                        ? activeClasses
                                                        : 'text-gray-300 hover:text-white hover:bg-gray-700/30 border-transparent hover:border-gray-600/30'
                                                    }`}
                                            >
                                                {/* Icon container with enhanced styling */}
                                                <div className={`relative p-3 rounded-xl transition-all duration-300 ${active
                                                        ? 'bg-white/10 shadow-lg'
                                                        : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                                                    }`}>
                                                    <Icon className={`text-xl ${active ? 'text-white' : iconColor}`} />
                                                    {/* Icon glow effect */}
                                                    {active && (
                                                        <motion.div
                                                            className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 rounded-xl blur-sm`}
                                                            animate={{ opacity: [0.2, 0.4, 0.2] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        />
                                                    )}
                                                </div>

                                                {/* Text with better typography */}
                                                <div className="flex-1">
                                                    <span className="font-semibold tracking-wide text-lg block">
                                                        {name}
                                                    </span>
                                                    <span className="text-xs text-gray-500 mt-0.5 block">
                                                        {href === '/' ? 'Homepage' : `Navigate to ${name.toLowerCase()}`}
                                                    </span>
                                                </div>

                                                {/* Active indicator with enhanced styling */}
                                                {active && (
                                                    <motion.div
                                                        className="flex items-center gap-2"
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        <motion.div
                                                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`}
                                                            animate={{ scale: [1, 1.2, 1] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                        />
                                                        <span className="text-xs text-gray-400 font-medium">Active</span>
                                                    </motion.div>
                                                )}

                                                {/* Hover glow effect */}
                                                <motion.div
                                                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                                                />
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Menu Footer */}
                        <motion.div
                            className="p-6 border-t border-gray-700/50 bg-gray-900/50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="text-center">
                                <p className="text-sm text-gray-400 mb-2">
                                    Full-Stack Developer
                                </p>
                                <p className="text-xs text-gray-500">
                                    © {new Date().getFullYear()} Jatin Kumar
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}