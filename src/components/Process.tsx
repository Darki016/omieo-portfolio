"use client";

import { motion } from "framer-motion";
import { Search, Hammer, Rocket } from "lucide-react";

const steps = [
    {
        icon: <Search className="w-7 h-7" />,
        title: "Discovery",
        desc: "Tell me what you need. I ask the annoying questions upfront so nothing breaks at the end.",
        color: "text-sky-400",
        glow: "56, 189, 248",
    },
    {
        icon: <Hammer className="w-7 h-7" />,
        title: "Build",
        desc: "WordPress, WooCommerce, Elementor. I handle everything — design, dev, content if needed.",
        color: "text-violet-400",
        glow: "167, 139, 250",
    },
    {
        icon: <Rocket className="w-7 h-7" />,
        title: "Launch",
        desc: "Live, tested, and handed over with a walkthrough. No abandoned projects.",
        color: "text-emerald-400",
        glow: "52, 211, 153",
    },
];

export default function Process() {
    return (
        <section id="process" className="relative w-full px-6 section-spacing flex flex-col items-center overflow-hidden">
            <div className="relative z-10 max-w-6xl w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <span className="inline-block py-1 px-3 rounded-full glass-pill text-xs text-[var(--text-secondary)] font-mono tracking-widest uppercase mb-4">
                        The Workflow
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-normal">
                        How It{" "}
                        <span className="inline-block text-[var(--text-secondary)] pr-3 pb-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-tertiary)]">
                            Works.
                        </span>
                    </h2>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: idx * 0.15,
                            }}
                            className="liquid-glass group relative p-8 flex flex-col items-start gap-6 cursor-default"
                            style={{
                                "--hover-bg": `rgba(${step.glow}, 0.05)`,
                            } as React.CSSProperties}
                        >
                            {/* Step Number Watermark */}
                            <span className="absolute top-4 right-6 text-6xl font-bold text-[var(--text-primary)] opacity-[0.03] select-none">
                                0{idx + 1}
                            </span>

                            {/* Icon */}
                            <div className={`p-3 rounded-2xl bg-[var(--text-primary)]/5 group-hover:bg-[var(--text-primary)]/10 transition-colors ${step.color}`}>
                                {step.icon}
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-[var(--text-secondary)] leading-relaxed text-sm group-hover:text-[var(--text-primary)] transition-colors">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
