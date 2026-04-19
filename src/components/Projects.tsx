"use client";

import { motion } from "framer-motion";
import { ExternalLink, Monitor, Globe, PenTool, Gamepad2, Calculator, ShoppingCart, Rocket } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import clsx from "clsx";
import MysticQuote from "@/components/MysticQuote";

const projects = [
    {
        id: "needs-and-fancy",
        title: "Needs and Fancy",
        subtitle: "E-COMM_QUEST",
        desc: "A premium WordPress-based e-commerce platform. Engineered for high performance, conversion optimization, and a seamless shopping experience.",
        tags: ["WordPress", "WooCommerce", "PHP"],
        color: "text-emerald-400",
        thumb: <ShoppingCart className="w-10 h-10" />,
        video: "/needs-and-fancy.webm",
        link: "https://needsandfancy.com/",
        glow: "52, 211, 153",
        badgeClass: "quest-badge-emerald",
        isHero: true,
    },
    {
        id: "lofi-timer",
        title: "Lofi Timer",
        subtitle: "HERO_QUEST",
        desc: "A minimal countdown app with custom theming. Built for personal use, then cleaned up and published.",
        tags: ["React", "Audio API", "Framer Motion"],
        color: "text-rose-400",
        thumb: <Monitor className="w-10 h-10" />,
        video: "/lofi-timer.mp4",
        link: "https://lofitimer.netlify.app/",
        glow: "251, 113, 133",
        badgeClass: "quest-badge-rose",
        isHero: false,
    },
    {
        id: "ether-weather",
        title: "Ether Weather",
        subtitle: "SIDE_QUEST",
        desc: "Weather app pulling from a live API. Focused on keeping the UI readable at a glance.",
        tags: ["Next.js", "Weather API", "Tailwind"],
        color: "text-cyan-400",
        thumb: <Globe className="w-10 h-10" />,
        video: "/ether-weather.mp4",
        link: "https://etherweather.netlify.app/",
        glow: "34, 211, 238",
        badgeClass: "quest-badge-cyan",
        isHero: false,
    },
    {
        id: "palette-extractor",
        title: "Palette Extractor",
        subtitle: "TOOL_QUEST",
        desc: "Upload an image, get the dominant color palette out. Small tool, used it myself constantly after building it.",
        tags: ["TypeScript", "Canvas API", "ColorThief"],
        color: "text-amber-400",
        thumb: <PenTool className="w-10 h-10" />,
        video: "/palette-extractor.mp4",
        link: "https://palettetract.netlify.app/",
        glow: "251, 191, 36",
        badgeClass: "quest-badge-amber",
        isHero: false,
    },
    {
        id: "flappy-supe",
        title: "Flappy Soge",
        subtitle: "MINI_GAME",
        desc: "A Flappy Bird clone with a custom character. Built as a break from client work. Still harder than the original.",
        tags: ["JavaScript", "HTML5 Canvas", "Physics"],
        color: "text-red-400",
        thumb: <Gamepad2 className="w-10 h-10" />,
        video: "/flappy-supe.mp4",
        link: "https://flappysupes.netlify.app/",
        glow: "248, 113, 113",
        badgeClass: "quest-badge-red",
        isHero: false,
    },
    {
        id: "mat-calc",
        title: "Mat Calc",
        subtitle: "MATH_QUEST",
        desc: "An all-in-one calculator for MAT model tests. Handles negative marking (0.25 penalty), second-timer deductions, and score percentages for accurate home practice.",
        tags: ["React", "Math.js", "Algorithms"],
        color: "text-violet-400",
        thumb: <Calculator className="w-10 h-10" />,
        video: "/mat-calc.mp4",
        link: "https://matcalc10.netlify.app/",
        glow: "167, 139, 250",
        badgeClass: "quest-badge-violet",
        isHero: false,
    }
];

export default function Projects() {
    return (
        <section id="projects" className="relative w-full section-spacing px-6 flex flex-col items-center overflow-hidden">

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
                        Quest Log
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-normal">
                        Selected <span className="inline-block text-[var(--text-secondary)] pr-3 pb-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-tertiary)]">Missions.</span>
                    </h2>
                    <div className="mt-8">
                        <MysticQuote text="Reality is programmable." author="The Architect" />
                    </div>
                </motion.div>

                {/* Bento Grid */}
                <div className="bento-grid">
                    {projects.map((project, idx) => (
                        <BentoCard key={project.id} project={project} index={idx} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function BentoCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Playback was interrupted, safely ignore
                });
            }
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        // Reset tilt
        if (cardRef.current) {
            cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
        }
    };

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            handleMouseLeave();
        } else {
            handleMouseEnter();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className={clsx(project.isHero && "bento-hero")}
        >
            <div
                ref={cardRef}
                className="card-3d group relative w-full h-full rounded-[20px] overflow-hidden"
                style={{
                    backdropFilter: "blur(16px)",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
                    minHeight: project.isHero ? "500px" : "320px",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onClick={togglePlay}
            >
                {/* Media */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Thumbnail/Placeholder */}
                    <div className={clsx(
                        "absolute inset-0 flex items-start justify-center pt-16 md:pt-24 transition-opacity duration-300 z-10 bg-[var(--bg-deep)]",
                        isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                    )}>
                        <div className="text-center">
                            <div className={clsx("w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-[var(--text-primary)]/5", project.color)}>
                                {project.thumb}
                            </div>
                        </div>
                    </div>

                    {/* Video */}
                    <div className={clsx(
                        "absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-300",
                        isPlaying ? "opacity-100" : "opacity-0"
                    )}>
                        <video
                            ref={videoRef}
                            src={project.video}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            preload="none"
                        />
                    </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-20" />

                {/* Content Overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-30">
                    {/* Quest Badge */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={clsx("quest-badge font-mono", project.badgeClass)}>
                            {project.subtitle}
                        </span>
                        {project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] text-white/40 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h3 className={clsx(
                        "font-bold text-white mb-2 transition-all",
                        project.isHero ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                    )}>
                        {project.title}
                    </h3>

                    <p className={clsx(
                        "text-white/60 leading-relaxed mb-0",
                        project.isHero ? "text-sm md:text-base line-clamp-3" : "text-xs line-clamp-2"
                    )}>
                        {project.desc}
                    </p>
                </div>

                {/* Launch Mission overlay on hover */}
                <div className="mission-overlay">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors"
                    >
                        <Rocket className="w-4 h-4" />
                        Launch Mission →
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
