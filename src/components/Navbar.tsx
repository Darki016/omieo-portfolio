"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { Home, User, Lightbulb, Briefcase, ShoppingBag, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
    { name: "Hero", id: "hero", icon: <Home className="w-4 h-4" /> },
    { name: "About", id: "about", icon: <User className="w-4 h-4" /> },
    { name: "Skills", id: "skills", icon: <Lightbulb className="w-4 h-4" /> },
    { name: "Projects", id: "projects", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Services", id: "services", icon: <ShoppingBag className="w-4 h-4" /> },
];

export default function Navbar() {

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
        >
            <div className="flex items-center justify-between px-4 md:px-6 py-2 md:py-3 rounded-full bg-[var(--glass-surface)] border border-[var(--glass-border)] backdrop-blur-xl shadow-lg transition-colors duration-1000">

                {/* Left: Identity */}
                <div
                    onClick={() => scrollToSection('hero')}
                    className="flex items-center gap-2 cursor-pointer group shrink-0"
                >
                    <span className="text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:opacity-80 transition-opacity">
                        Omieo
                    </span>
                </div>

                {/* Center: Navigation */}
                <div className="flex items-center gap-1 md:gap-1">
                    {navItems.map((item) => {
                        // Logic:
                        // Hero: Hidden on mobile (Name does the job)
                        // About: Text on mobile
                        // Others: Icon on mobile, Text on desktop

                        if (item.id === 'hero') {
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="hidden md:block px-4 py-1.5 rounded-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-highlight)] transition-all"
                                >
                                    {item.name}
                                </button>
                            );
                        }

                        return (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="px-3 md:px-4 py-1.5 rounded-full text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-highlight)] transition-all"
                            >
                                {/* Mobile View */}
                                <span className={clsx("md:hidden flex items-center justify-center", item.id === 'about' ? "hidden" : "block")}>
                                    {item.icon}
                                </span>
                                <span className={clsx("md:hidden", item.id === 'about' ? "block" : "hidden")}>
                                    {item.name}
                                </span>

                                {/* Desktop View */}
                                <span className="hidden md:block">
                                    {item.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Right: Actions (Toggle + CTA) */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    <button
                        onClick={() => scrollToSection('contact')}
                        className="p-2 md:px-5 md:py-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-deep)] text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center"
                        aria-label="Contact"
                    >
                        <span className="hidden md:inline">Let's Connect</span>
                        <Mail className="w-4 h-4 md:hidden" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
