"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Activity, Code2, ArrowRight } from "lucide-react";
import Image from "next/image";
import MysticQuote from "@/components/MysticQuote";

const subtitles = ["Medical Student", "Full-Stack Developer"];

function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 60, pauseTime = 2500) {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");

    useEffect(() => {
        const word = words[wordIndex];

        if (phase === "typing") {
            const timeout = setTimeout(() => {
                const nextText = word.slice(0, text.length + 1);
                setText(nextText);
                if (nextText === word) {
                    setPhase("pausing");
                }
            }, typingSpeed);
            return () => clearTimeout(timeout);
        }

        if (phase === "pausing") {
            const timeout = setTimeout(() => {
                setPhase("deleting");
            }, pauseTime);
            return () => clearTimeout(timeout);
        }

        if (phase === "deleting") {
            const timeout = setTimeout(() => {
                const nextText = word.slice(0, text.length - 1);
                setText(nextText);
                if (nextText === "") {
                    setPhase("waiting");
                }
            }, deletingSpeed);
            return () => clearTimeout(timeout);
        }

        if (phase === "waiting") {
            const timeout = setTimeout(() => {
                setWordIndex((prev) => (prev + 1) % words.length);
                setPhase("typing");
            }, 500); // Half second pause between words
            return () => clearTimeout(timeout);
        }
    }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

    return text;
}

function MagneticButton({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < 60) {
            const pullStrength = 0.3;
            btnRef.current.style.transform = `translate(${distX * pullStrength}px, ${distY * pullStrength}px)`;
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (btnRef.current) {
            btnRef.current.style.transform = "translate(0, 0)";
        }
    }, []);

    return (
        <button
            ref={btnRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{ transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)" }}
        >
            {children}
        </button>
    );
}

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const subtitle = useTypewriter(subtitles);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    if (!mounted) return <div className="min-h-screen bg-[var(--bg-deep)]" />;

    return (
        <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 section-spacing transition-colors duration-1000">

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left: Typography & Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            {/* SYSTEM ONLINE Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill text-xs font-mono tracking-widest uppercase"
                            >
                                <span className="online-dot" />
                                <span className="text-emerald-400 font-bold">SYSTEM ONLINE</span>
                            </motion.div>

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--text-primary)]/[0.03] backdrop-blur-3xl text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
                                Freelance Web Developer
                            </div>
                        </div>

                        <h1 
                            aria-label="Omieo Zaman"
                            className="text-6xl md:text-[96px] lg:text-[140px] font-bold tracking-tighter text-[var(--text-primary)] leading-[0.85] transition-colors duration-1000 flex"
                        >
                            {"OMIEO".split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    aria-hidden="true"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.03, ease: "easeOut" }}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 5 * 0.03, ease: "easeOut" }}
                            >
                                <motion.span
                                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.8, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="inline-block text-[var(--text-tertiary)] origin-bottom"
                                >
                                    .
                                </motion.span>
                            </motion.span>
                        </h1>

                        {/* Typewriter Subtitle */}
                        <div className="h-8 flex items-center">
                            <span className="text-base md:text-lg font-mono text-[var(--text-secondary)] tracking-wide">
                                {subtitle}
                            </span>
                            <span className="typewriter-cursor" />
                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg"
                    >
                        <div className="group glass-pill p-4 md:p-6 hover:bg-[var(--glass-highlight)] transition-all duration-300 cursor-default flex items-center gap-4">
                            <div className="p-3 rounded-full bg-[var(--text-primary)]/5 text-[var(--text-primary)] shrink-0">
                                <Activity className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h3 className="text-sm md:text-base font-bold text-[var(--text-primary)]">Medical Student</h3>
                                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Level {new Date().getFullYear()} (MBBS)</p>
                            </div>
                        </div>

                        <div className="group glass-pill p-4 md:p-6 hover:bg-[var(--glass-highlight)] transition-all duration-300 cursor-default flex items-center gap-4">
                            <div className="p-3 rounded-full bg-[var(--text-primary)]/5 text-[var(--text-primary)] shrink-0">
                                <Code2 className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h3 className="text-sm md:text-base font-bold text-[var(--text-primary)]">Full-Stack Dev</h3>
                                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Architect of Shadow Realm</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="text-sm font-medium text-[var(--text-secondary)] pt-4">
                        Want a site that actually works? ↓
                    </div>

                    {/* CTA Buttons with Magnetic Effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-4 pt-2"
                    >
                        <MagneticButton
                            onClick={() => scrollToSection('projects')}
                            className="px-8 py-3.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-deep)] text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            View Quests
                            <ArrowRight className="w-4 h-4" />
                        </MagneticButton>

                        <MagneticButton
                            onClick={() => scrollToSection('contact')}
                            className="px-8 py-3.5 rounded-full glass-pill text-sm font-bold text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.08)] transition-all flex items-center gap-2"
                        >
                            Start Quest
                        </MagneticButton>
                    </motion.div>
                </div>

                {/* Right: Interactive 3D Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1,
                        y: [0, -15, 0],
                        rotate: [0, 1, 0, -1, 0]
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        opacity: { duration: 1, ease: "circOut" },
                        scale: { duration: 1, ease: "circOut" }
                    }}
                    className="relative flex justify-center lg:justify-end"
                >

                    {/* 3D Flip Container */}
                    <div className="relative z-10 w-[300px] md:w-80 h-[450px] perspective-1000 group">

                        {/* Dynamic Solar System Background - Centered on Card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-50 pointer-events-none opacity-100 transition-opacity duration-1000">
                            {/* Orbit 1: Closest/Fastest */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[550px] md:h-[550px] rounded-full border border-[var(--text-primary)]/80 dark:border-white/10"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-[var(--text-primary)] rounded-full shadow-lg" />
                            </motion.div>

                            {/* Orbit 2: Middle/Medium */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[700px] md:h-[700px] rounded-full border border-[var(--text-primary)]/80 dark:border-white/10"
                            >
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
                                        src="/profile.webp"
                                        alt="Omieo Zaman"
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
