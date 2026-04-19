"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Activity, Terminal, ArrowRight } from "lucide-react";
import clsx from "clsx";

type Tab = "medic" | "dev";

export default function About() {
    const tabs: Tab[] = ["medic", "dev"];
    const [activeTab, setActiveTab] = useState<Tab>("medic");
    const [direction, setDirection] = useState(0);

    const handleTabChange = (newTab: Tab) => {
        if (newTab === activeTab) return;
        const newDirection = tabs.indexOf(newTab) > tabs.indexOf(activeTab) ? 1 : -1;
        setDirection(newDirection);
        setActiveTab(newTab);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    const Data = {
        medic: {
            title: "The Medical Journey",
            subtitle: "Day Class (MBBS)",
            icon: <Activity className="w-6 h-6" />,
            color: "text-sky-400",
            content: [
                "I'm a first-year student at Anwer Khan Modern Medical College, Dhaka. Medicine takes up most of my day. Web development takes up the rest. I've been doing this long enough that the two don't clash as much as people assume."
            ]
        },
        dev: {
            title: "The Digital Grind",
            subtitle: "Night Class (Dev)",
            icon: <Terminal className="w-6 h-6" />,
            color: "text-violet-400",
            content: [
                "I build WordPress and WooCommerce sites for e-commerce clients, mostly in Bangladesh. No boilerplate packages, no copy-paste themes. If you need a store that actually sells, I'll build it properly."
            ]
        }
    };

    return (
        <section id="about" className="relative w-full section-spacing px-6 flex flex-col items-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-5xl w-full z-10 will-change-transform"
            >
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16 space-y-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                        className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-medium text-[var(--text-secondary)] mb-4 mx-auto"
                    >
                        <span>Character Stats</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] tracking-tight">
                        The <span className="text-[var(--text-secondary)] pr-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-tertiary)]">Dual-Life</span>.
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-lg">
                        Navigating two different worlds with the same surgical precision.
                    </p>
                </motion.div>

                {/* iOS-style Glass Segmented Control */}
                <div className="flex justify-center mb-10">
                    <div className="relative flex p-1 rounded-full liquid-glass">
                        {/* Sliding indicator */}
                        <motion.div
                            className="absolute top-1 bottom-1 rounded-full bg-[var(--text-primary)]"
                            initial={false}
                            animate={{
                                left: activeTab === "medic" ? "4px" : "50%",
                                width: "calc(50% - 4px)",
                            }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        />
                        <button
                            onClick={() => handleTabChange("medic")}
                            className={clsx(
                                "relative px-6 md:px-10 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors duration-300 z-10",
                                activeTab === "medic" ? "text-[var(--bg-deep)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            )}
                        >
                            <Activity className="w-4 h-4" />
                            <span>Medical Journey</span>
                        </button>

                        <button
                            onClick={() => handleTabChange("dev")}
                            className={clsx(
                                "relative px-6 md:px-10 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors duration-300 z-10",
                                activeTab === "dev" ? "text-[var(--bg-deep)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            )}
                        >
                            <Terminal className="w-4 h-4" />
                            <span>Developer</span>
                        </button>
                    </div>
                </div>

                {/* Content Card - Liquid Glass */}
                <div className="liquid-glass relative min-h-[300px] p-6 md:p-14 overflow-hidden">
                    <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.div
                            key={activeTab}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", bounce: 0.55, duration: 0.8 },
                                opacity: { duration: 0.3 }
                            }}
                            className="relative z-10"
                        >

                            {/* Header Row */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                                <div className="flex items-center gap-5">
                                    <div className={clsx("p-4 rounded-2xl bg-[var(--text-primary)]/5 border border-[var(--glass-border)] shadow-lg relative overflow-hidden group", Data[activeTab].color)}>
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-current" />
                                        {Data[activeTab].icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{Data[activeTab].title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={clsx("w-2 h-2 rounded-full animate-pulse bg-current", Data[activeTab].color)} />
                                            <p className={clsx("text-xs md:text-sm font-mono uppercase tracking-wider", Data[activeTab].color)}>
                                                {Data[activeTab].subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed text-base md:text-lg relative z-10 font-light">
                                {Data[activeTab].content.map((paragraph, idx) => (
                                    <p key={idx} className="border-l-2 border-[var(--glass-border)] pl-4 hover:border-[var(--text-primary)] transition-colors">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Footer Decoration */}
                            <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-30">
                                <ArrowRight className="w-4 h-4 text-[var(--text-primary)]" />
                                <span className="text-xs font-mono text-[var(--text-primary)]">SCROLL_FOR_STATS</span>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </motion.div>
        </section>
    );
}
