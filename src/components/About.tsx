"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Activity, Terminal, ArrowRight, Sparkles } from "lucide-react";
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
            bgFrom: "from-sky-500/10",
            border: "border-sky-500/20",
            badge: `Level ${new Date().getFullYear()}`,
            content: [
                "The admission exams didn’t go how I wanted. That’s the truth. I didn’t get the chance I was aiming for—but instead of spiraling or making excuses, I’m moving forward. I’ll be starting MBBS in 2026 at a private medical college, and honestly? That’s where the real game starts.",
                "My mindset right now is locked in. Full focus on studies, no distractions, no coping stories. I’m here to actually understand medicine, not just survive exams. Discipline over motivation. Progress over noise. Every day is about being sharper than yesterday.",
                "No shortcuts. No fluff. Just me, the syllabus, and the grind—staying consistent and staying ahead."
            ]
        },
        dev: {
            title: "The Digital Grind",
            subtitle: "Night Class (Dev)",
            icon: <Terminal className="w-6 h-6" />,
            color: "text-violet-400",
            bgFrom: "from-violet-500/10",
            border: "border-violet-500/20",
            badge: "Architect",
            content: [
                "Outside medicine, I stay busy building things. I work with HTML, CSS, and JavaScript, and I also use tools like Webflow, Framer, and WordPress to ship projects fast. For me, execution matters most—a site has to work and look clean, smooth, and intentional. No messy layouts, no half-baked design.",
                "I also handle video edits in CapCut when a project calls for it. Nothing fancy, just efficient and to the point. If it needs to be done, I do it.",
                "At the end of the day, I enjoy turning raw ideas into something polished and professional. It keeps me productive, sharp, and constantly improving my technical skill set."
            ]
        }
    };

    return (
        <section id="about" className="relative w-full py-24 px-6 flex flex-col items-center overflow-hidden">



            <motion.div

                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-5xl w-full z-10 will-change-transform"
            >
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                        className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--glass-surface)] border border-[var(--glass-border)] text-xs font-medium text-[var(--text-secondary)] mb-4 mx-auto"
                    >
                        <Sparkles className="w-3 h-3 text-[var(--text-primary)]" />
                        <span>Character Stats</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] tracking-tight">
                        The <span className="text-[var(--text-secondary)] pr-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-tertiary)]">Dual-Life</span>.
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-lg">
                        Navigating two different worlds with the same surgical precision.
                    </p>
                </div>

                {/* Custom Tab Switcher - More prominent */}
                <div className="flex justify-center mb-10">
                    <div className="flex p-1.5 rounded-2xl bg-[var(--glass-surface)] border border-[var(--glass-border)] backdrop-blur-xl">
                        <button
                            onClick={() => handleTabChange("medic")}
                            className={clsx(
                                "relative px-3 md:px-10 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300",
                                activeTab === "medic" ? "text-[var(--bg-deep)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            )}
                        >
                            {activeTab === "medic" && (
                                <motion.div
                                    layoutId="tab-bg"
                                    className="absolute inset-0 bg-[var(--text-primary)] rounded-xl"
                                    transition={{ type: "spring", bounce: 0.55, duration: 0.8 }}
                                />
                            )}
                            <Activity className={clsx("w-4 h-4 relative z-10", activeTab === "medic" ? "text-[var(--bg-deep)]" : "")} />
                            <span className="relative z-10">THE ACADEMIC</span>
                        </button>

                        <button
                            onClick={() => handleTabChange("dev")}
                            className={clsx(
                                "relative px-3 md:px-10 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300",
                                activeTab === "dev" ? "text-[var(--bg-deep)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            )}
                        >
                            {activeTab === "dev" && (
                                <motion.div
                                    layoutId="tab-bg"
                                    className="absolute inset-0 bg-[var(--text-primary)] rounded-xl"
                                    transition={{ type: "spring", bounce: 0.55, duration: 0.8 }}
                                />
                            )}
                            <Terminal className={clsx("w-4 h-4 relative z-10", activeTab === "dev" ? "text-[var(--bg-deep)]" : "")} />
                            <span className="relative z-10">THE ARCHITECT</span>
                        </button>
                    </div>
                </div>

                {/* Content Card - Cleaner Glass */}
                <div className={clsx(
                    "glass-panel relative min-h-[420px] p-6 md:p-14 rounded-[32px] overflow-hidden"
                )}>
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
                                        <div className={clsx("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-current")} />
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

                                <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-surface)] backdrop-blur-md self-start md:self-center">
                                    <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Rank</span>
                                    <span className="text-sm font-bold text-[var(--text-primary)]">{Data[activeTab].badge}</span>
                                </div>
                            </div>

                            {/* Content - improved typography */}
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
