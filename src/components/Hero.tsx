"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, Code2, ArrowRight } from "lucide-react";
import Image from "next/image";
import MysticQuote from "@/components/MysticQuote";

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="min-h-screen bg-[var(--bg-deep)]" />;

    return (
        <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 py-20 transition-colors duration-1000">



            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left: Typography & Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--glass-surface)] border border-[var(--glass-border)] backdrop-blur-md text-xs font-medium text-[var(--text-secondary)] mb-4 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            System Online
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[var(--text-primary)] leading-[0.9] transition-colors duration-1000">
                            OMIEO
                            <motion.span
                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.8, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="inline-block text-[var(--text-tertiary)] origin-bottom"
                            >
                                .
                            </motion.span>
                        </h1>


                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg"
                    >
                        <div className="group glass-card p-5 rounded-2xl hover:bg-[var(--glass-highlight)] transition-all duration-300 cursor-default">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 rounded-lg bg-[var(--text-primary)]/10 text-[var(--text-primary)]">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest">Day Class</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:opacity-80 transition-opacity">Medical Student</h3>
                                <p className="text-sm text-[var(--text-secondary)] mt-1">Level {new Date().getFullYear()} (MBBS)</p>
                            </div>
                        </div>

                        <div className="group glass-card p-5 rounded-2xl hover:bg-[var(--glass-highlight)] transition-all duration-300 cursor-default">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 rounded-lg bg-[var(--text-primary)]/10 text-[var(--text-primary)]">
                                    <Code2 className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest">Night Class</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:opacity-80 transition-opacity">Full-Stack Dev</h3>
                                <p className="text-sm text-[var(--text-secondary)] mt-1">Architect of Shadow Realm</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quote */}
                    <div className="pt-4">
                        <MysticQuote text="I shall level up alone." className="text-left" />
                    </div>
                </div>

                {/* Right: Interactive 3D Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="relative flex justify-center lg:justify-end"
                >

                    {/* 3D Flip Container */}
                    <div className="relative z-10 w-[300px] md:w-80 h-[450px] perspective-1000 group">

                        {/* Dynamic Solar System Background - Centered on Card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-50 pointer-events-none opacity-100 transition-opacity duration-1000">
                            {/* Orbit 1: Closest/Fastest - Resize for mobile (Fits <360px) */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[550px] md:h-[550px] rounded-full border border-[var(--text-primary)]/80 dark:border-white/10"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-[var(--text-primary)] rounded-full shadow-lg" />
                            </motion.div>

                            {/* Orbit 2: Middle/Medium - Resize for mobile (Fits <360px) */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[700px] md:h-[700px] rounded-full border border-[var(--text-primary)]/80 dark:border-white/10"
                            >
                                {/* Fixed Position: Bottom Center of Ring */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-[var(--text-primary)]/50 rounded-full shadow-xl" />
                            </motion.div>
                        </div>

                        <motion.div
                            className="w-full h-full relative preserve-3d transition-all duration-700 ease-out"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            onClick={() => setIsFlipped(!isFlipped)}
                            style={{ transformStyle: "preserve-3d", cursor: "pointer" }}
                        >
                            {/* FRONT FACE */}
                            <div className="absolute inset-0 backface-hidden glass-card rounded-[32px] p-2 rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
                                <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-black">
                                    <Image
                                        src="/profile.png"
                                        alt="Profile"
                                        fill
                                        priority
                                        className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-black/30 border border-white/10 p-3 rounded-xl flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-300 font-medium">Status</p>
                                            <div className="flex items-center gap-1.5 ">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                <p className="text-xs text-white font-bold">Online</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-white/50" />
                                    </div>
                                </div>
                            </div>

                            {/* BACK FACE */}
                            <div
                                className="absolute inset-0 backface-hidden glass-card rounded-[32px] p-6 flex flex-col items-center justify-center text-center bg-[var(--glass-surface)] border border-[var(--glass-border)]"
                                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--glass-highlight)]/10 to-[var(--glass-highlight)]/5 rounded-[32px]" />

                                <div className="relative z-10 space-y-6">
                                    <div className="w-12 h-12 rounded-full bg-[var(--text-primary)]/10 mx-auto flex items-center justify-center text-[var(--text-primary)] font-bold text-xl">
                                        O
                                    </div>

                                    <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
                                        Helping <span className="text-[var(--text-primary)] font-bold">Doctors</span> & <span className="text-[var(--text-primary)] font-bold">Tech Startups</span> Scale through High-Performance Web Design.
                                    </p>

                                    <div className="h-px w-16 bg-[var(--text-tertiary)] mx-auto opacity-50" />

                                    <ul className="space-y-2 text-sm text-[var(--text-tertiary)]">
                                        <li>Medico</li>
                                        <li>Video Editor</li>
                                        <li>Brand Strategist</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
