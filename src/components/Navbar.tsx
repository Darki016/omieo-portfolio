"use client";

import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Home, User, Lightbulb, Briefcase, Settings, ShoppingBag, MessageSquare, Mail, X, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect, useRef } from "react";

const navItems = [
    { name: "Hero", id: "hero", icon: <Home className="w-4 h-4" /> },
    { name: "About", id: "about", icon: <User className="w-4 h-4" /> },
    { id: "stats", hidden: true },
    { name: "Skills", id: "skills", icon: <Lightbulb className="w-4 h-4" /> },
    { name: "Projects", id: "projects", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Process", id: "process", icon: <Settings className="w-4 h-4" /> },
    { name: "Services", id: "services", icon: <ShoppingBag className="w-4 h-4" /> },
    { name: "Testimonial", id: "testimonials", icon: <MessageSquare className="w-4 h-4" /> },
];

function StaggeredText({ text }: { text: string }) {
    return (
        <span className="nav-link-stagger inline-flex overflow-hidden">
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="nav-letter"
                    style={{ animationDelay: `${i * 30}ms` }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
}

export default function Navbar() {
    const { theme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 20);

            // Active section detection for top nav
            const windowHeight = window.innerHeight;
            const spyMark = scrollY + 120; // Check close to the top for navbar

            let current = "hero";
            for (const item of navItems) {
                const el = document.getElementById(item.id);
                if (el) {
                    const top = el.getBoundingClientRect().top + scrollY;
                    if (spyMark >= top) current = item.id;
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setMobileOpen(false);
    };

    return (
        <>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
            >
                <motion.div
                    animate={{
                        backgroundColor: scrolled 
                            ? (theme === 'dark' ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.6)") 
                            : "rgba(0, 0, 0, 0)",
                        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px) saturate(100%)",
                        borderColor: scrolled 
                            ? (theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)") 
                            : "rgba(255, 255, 255, 0)",
                        boxShadow: scrolled 
                            ? (theme === 'dark' ? "0 10px 40px rgba(0, 0, 0, 0.3)" : "0 10px 40px rgba(0, 0, 0, 0.1)") 
                            : "0 0px 0px rgba(0, 0, 0, 0)",
                        paddingLeft: scrolled ? "24px" : "32px",
                        paddingRight: scrolled ? "24px" : "32px",
                        width: scrolled ? "100%" : "95%",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 18,
                        mass: 1.2
                    }}
                    className="flex items-center justify-between py-2 md:py-3 rounded-full border shadow-xl"
                >
                    {/* Left: Identity */}
                    <div
                        onClick={() => scrollToSection('hero')}
                        className="flex items-center gap-2 cursor-pointer group shrink-0"
                    >
                        <span className="text-lg md:text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:opacity-80 transition-opacity">
                            Omieo
                        </span>
                    </div>

                    {/* Center: Navigation (Desktop) */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.filter(i => !i.hidden).map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={clsx(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all relative",
                                    activeSection === item.id 
                                        ? "text-[var(--text-primary)]" 
                                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-highlight)]"
                                )}
                            >
                                <StaggeredText text={item.name || ""} />
                                {activeSection === item.id && (
                                    <motion.div 
                                        layoutId="navActive" 
                                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-[var(--text-primary)] rounded-full" 
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {/* Desktop CTA */}
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="hidden md:flex items-center px-5 py-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-deep)] text-sm font-bold hover:opacity-90 transition-opacity"
                        >
                            Let&apos;s Connect
                        </button>

                        {/* Mobile: Contact Icon */}
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="md:hidden p-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-deep)]"
                            aria-label="Contact"
                        >
                            <Mail className="w-4 h-4" />
                        </button>

                        {/* Mobile: Hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-xl bg-[var(--glass-surface)] border border-[var(--glass-border)] text-[var(--text-primary)]"
                            aria-label="Menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
                        onClick={() => setMobileOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-24 left-6 right-6 p-4 liquid-glass flex flex-col gap-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {navItems.filter(i => !i.hidden).map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={clsx(
                                        "flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-bold transition-all",
                                        activeSection === item.id 
                                            ? "bg-[var(--text-primary)] text-[var(--bg-deep)]" 
                                            : "text-[var(--text-secondary)] hover:bg-white/5"
                                    )}
                                >
                                    <span className={clsx(activeSection === item.id ? "text-[var(--bg-deep)]" : "text-[var(--text-primary)]")}>
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </button>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
