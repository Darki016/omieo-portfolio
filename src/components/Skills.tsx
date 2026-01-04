"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    Code2, Layout, Terminal, Video, PenTool, Globe,
    Users, BookOpen, Languages, Award, Shield, BrainCircuit
} from "lucide-react";
import clsx from "clsx";

// --- Data ---

const activeSkills = [
    {
        name: "Webflow / Framer",
        level: 85,
        desc: "My primary tools. I use them to build clean, fluid, high-end sites without overthinking the process.",
        icon: <Layout className="w-5 h-5" />,
        color: "text-pink-400",
        bg: "bg-gradient-to-r from-pink-500 to-purple-500",
        glow: "236, 72, 153" // Pink
    },
    {
        name: "WordPress",
        level: 80,
        desc: "Solid experience. I can set things up, customize what’s needed, and keep everything functional.",
        icon: <Globe className="w-5 h-5" />,
        color: "text-blue-400",
        bg: "bg-blue-500",
        glow: "59, 130, 246" // Blue
    },
    {
        name: "HTML & CSS",
        level: 75,
        desc: "The foundation. I understand structure and styling well enough to control the final result.",
        icon: <Code2 className="w-5 h-5" />,
        color: "text-orange-400",
        bg: "bg-orange-500",
        glow: "249, 115, 22" // Orange
    },
    {
        name: "JavaScript",
        level: 40,
        desc: "Still my weakest area. I know the basics, but I’m actively improving the logic side.",
        icon: <Terminal className="w-5 h-5" />,
        color: "text-yellow-400",
        bg: "bg-yellow-400",
        glow: "234, 179, 8" // Yellow
    },
    {
        name: "CapCut (Editing)",
        level: 60,
        desc: "Used when needed. Straightforward edits that get the job done.",
        icon: <Video className="w-5 h-5" />,
        color: "text-cyan-400",
        bg: "bg-cyan-500",
        glow: "6, 182, 212" // Cyan
    },
    {
        name: "Content Writing",
        level: 70,
        desc: "Comfortable writing clean, readable content and proofreading for clarity, tone, and flow.",
        icon: <PenTool className="w-5 h-5" />,
        color: "text-emerald-400",
        bg: "bg-emerald-500",
        glow: "16, 185, 129" // Emerald
    },
];

const passiveSkills = [
    {
        name: "Communication",
        desc: "Clear, confident, and interactive. I can explain ideas well, read the room, and keep conversations productive.",
        icon: <Users className="w-5 h-5" />,
        color: "text-indigo-400",
        border: "group-hover:border-indigo-500/30",
        glow: "99, 102, 241" // Indigo
    },
    {
        name: "Reader Insight",
        desc: "Familiar with how readers think and how authors structure content. I understand pacing, tone, and narrative clarity.",
        icon: <BookOpen className="w-5 h-5" />,
        color: "text-amber-400",
        border: "group-hover:border-amber-500/30",
        glow: "245, 158, 11" // Amber
    },
    {
        name: "Multilingual",
        desc: "Fluent in English, Bangla, and Hindi, with working proficiency in German.",
        icon: <Languages className="w-5 h-5" />,
        color: "text-rose-400",
        border: "group-hover:border-rose-500/30",
        glow: "244, 63, 94" // Rose
    },
    {
        name: "English Proven",
        desc: "Awarded by 10 Minute School (10 MS) and medical platforms like Medilogy and RTDS.",
        icon: <Award className="w-5 h-5" />,
        color: "text-yellow-400",
        border: "group-hover:border-yellow-500/30",
        glow: "234, 179, 8" // Yellow
    },
    {
        name: "Community Mgmt",
        desc: "Moderator at PCBD, the largest PC enthusiast Discord server in Bangladesh. Managing large communities builds patience.",
        icon: <Shield className="w-5 h-5" />,
        color: "text-blue-400",
        border: "group-hover:border-blue-500/30",
        glow: "59, 130, 246" // Blue
    },
    {
        name: "Scientific Reasoning",
        desc: "Winner of multiple science projects during college. Strong research mindset with a focus on practical execution.",
        icon: <BrainCircuit className="w-5 h-5" />,
        color: "text-teal-400",
        border: "group-hover:border-teal-500/30",
        glow: "20, 184, 166" // Teal
    },
];


export default function Skills() {
    const tabs: ("active" | "passive")[] = ["active", "passive"];
    const [activeTab, setActiveTab] = useState<"active" | "passive">("active");
    const [direction, setDirection] = useState(0);

    const handleTabChange = (newTab: "active" | "passive") => {
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

    return (
        <section id="skills" className="relative w-full py-24 px-6 flex flex-col items-center overflow-hidden">



            <div className="relative z-10 max-w-6xl w-full">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-[var(--glass-surface)] border border-[var(--glass-border)] text-xs text-[var(--text-secondary)] font-mono tracking-widest uppercase mb-4">
                        The Inventory
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-normal">
                        Skill <span className="inline-block text-[var(--text-secondary)] pr-3 pb-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-tertiary)]">Matrix.</span>
                    </h2>
                </motion.div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-16">
                    <div className="flex p-1.5 rounded-2xl bg-[var(--glass-surface)] border border-[var(--glass-border)] backdrop-blur-xl">
                        <button
                            onClick={() => handleTabChange("active")}
                            className={clsx(
                                "relative px-6 md:px-10 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300",
                                activeTab === "active" ? "text-[var(--bg-deep)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            )}
                        >
                            {activeTab === "active" && (
                                <motion.div
                                    layoutId="skill-tab-bg"
                                    className="absolute inset-0 bg-[var(--text-primary)] rounded-xl"
                                    transition={{ type: "spring", bounce: 0.55, duration: 0.8 }}
                                />
                            )}
                            <Layout className={clsx("w-4 h-4 relative z-10", activeTab === "active" ? "text-emerald-400" : "")} />
                            <span className="relative z-10">ACTIVE SKILLS</span>
                        </button>

                        <button
                            onClick={() => handleTabChange("passive")}
                            className={clsx(
                                "relative px-6 md:px-10 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300",
                                activeTab === "passive" ? "text-[var(--bg-deep)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            )}
                        >
                            {activeTab === "passive" && (
                                <motion.div
                                    layoutId="skill-tab-bg"
                                    className="absolute inset-0 bg-[var(--text-primary)] rounded-xl"
                                    transition={{ type: "spring", bounce: 0.55, duration: 0.8 }}
                                />
                            )}
                            <BrainCircuit className={clsx("w-4 h-4 relative z-10", activeTab === "passive" ? "text-indigo-400" : "")} />
                            <span className="relative z-10">PASSIVE SKILLS</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="popLayout" custom={direction}>
                    {activeTab === "active" ? (
                        <motion.div
                            key="active"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", bounce: 0.55, duration: 0.8 },
                                opacity: { duration: 0.3 }
                            }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {activeSkills.map((skill, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={clsx(
                                            "glass-panel group relative p-6 rounded-2xl transition-all duration-300",
                                            "hover:bg-[var(--hover-bg)] hover:border-[var(--glass-highlight)]"
                                        )}
                                        style={{
                                            "--hover-bg": `rgba(${skill.glow}, 0.05)`
                                        } as React.CSSProperties}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={clsx("p-2 rounded-lg bg-[var(--text-primary)]/5 group-hover:bg-[var(--text-primary)]/10 transition-colors", skill.color)}>
                                                    {skill.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[var(--text-primary)] transition-colors text-lg">{skill.name}</h4>
                                                </div>
                                            </div>
                                            <span className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--text-primary)]/5 px-2 py-1 rounded transition-colors">
                                                Lvl {skill.level}
                                            </span>
                                        </div>

                                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 group-hover:text-[var(--text-primary)] transition-colors">
                                            {skill.desc}
                                        </p>

                                        <div className="w-full h-1.5 bg-[var(--text-primary)]/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: false }}
                                                transition={{ duration: 1.2, ease: "circOut", delay: 0.2 }}
                                                className={clsx("h-full rounded-full shadow-[0_0_12px_currentColor]", skill.bg)}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="passive"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", bounce: 0.55, duration: 0.8 },
                                opacity: { duration: 0.3 }
                            }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {passiveSkills.map((skill, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={clsx(
                                            "glass-panel group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1",
                                            "hover:bg-[var(--hover-bg)] hover:border-[var(--glass-highlight)]"
                                        )}
                                        style={{
                                            "--hover-bg": `rgba(${skill.glow}, 0.05)`
                                        } as React.CSSProperties}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={clsx("p-2 rounded-lg bg-[var(--text-primary)]/5 group-hover:bg-[var(--text-primary)]/10 transition-colors", skill.color)}>
                                                {skill.icon}
                                            </div>
                                            <h4 className="font-bold text-[var(--text-primary)] transition-colors">{skill.name}</h4>
                                        </div>
                                        <p className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] leading-relaxed">
                                            {skill.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
