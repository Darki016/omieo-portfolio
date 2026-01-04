"use client";

import { motion } from "framer-motion";
import { ExternalLink, Monitor, Globe, PenTool, Gamepad2, Calculator } from "lucide-react";
import { useState, useRef } from "react";
import clsx from "clsx";
import MysticQuote from "@/components/MysticQuote";

const projects = [
    {
        id: "lofi-timer",
        title: "Lofi Timer",
        subtitle: "HERO_QUEST",
        desc: "An ambient focus tool for deep work sessions. Features a custom audio mixer, drag-and-drop masking, and a zen-mode interface.",
        tags: ["React", "Audio API", "Framer Motion"],
        color: "text-rose-400",
        thumb: <Monitor className="w-10 h-10" />,
        video: "/lofi-timer.mp4",
        link: "https://lofitimer.netlify.app/",
        glow: "251, 113, 133" // Rose
    },
    {
        id: "ether-weather",
        title: "Ether Weather",
        subtitle: "SIDE_QUEST",
        desc: "A futuristic weather dashboard providing real-time forecasts with a glassmorphic UI and dynamic atmospheric animations.",
        tags: ["Next.js", "Weather API", "Tailwind"],
        color: "text-cyan-400",
        thumb: <Globe className="w-10 h-10" />,
        video: "/ether-weather.mp4",
        link: "https://etherweather.netlify.app/",
        glow: "34, 211, 238" // Cyan
    },
    {
        id: "palette-extractor",
        title: "Palette Extractor",
        subtitle: "TOOL_QUEST",
        desc: "Upload any image and instantly extract its dominant color palette. Useful for designers seeking inspiration from scenery.",
        tags: ["TypeScript", "Canvas API", "ColorThief"],
        color: "text-amber-400",
        thumb: <PenTool className="w-10 h-10" />,
        video: "/palette-extractor.mp4",
        link: "https://palettetract.netlify.app/",
        glow: "251, 191, 36" // Amber
    },
    {
        id: "flappy-supe",
        title: "Flappy Supe",
        subtitle: "MINI_GAME",
        desc: "A custom twist on the classic Flappy Bird, featuring superhero mechanics and progressive difficulty levels.",
        tags: ["JavaScript", "HTML5 Canvas", "Physics"],
        color: "text-red-400",
        thumb: <Gamepad2 className="w-10 h-10" />,
        video: "/flappy-supe.mp4",
        link: "https://flappysupes.netlify.app/",
        glow: "248, 113, 113" // Red
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
        glow: "167, 139, 250" // Violet
    }
];

export default function Projects() {
    return (
        <section id="projects" className="relative w-full py-24 px-6 flex flex-col items-center overflow-hidden">



            <div className="relative z-10 max-w-6xl w-full">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-24"
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

                {/* Projects Grid */}
                <div className="grid grid-cols-1 gap-40">
                    {projects.map((project, idx) => (
                        <ProjectCard key={project.id} project={project} index={idx} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset to start
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            handleMouseLeave();
        } else {
            handleMouseEnter();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0.3, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={clsx(
                "glass-panel group relative w-full rounded-[32px] overflow-hidden transition-all will-change-transform",
                "hover:bg-[var(--hover-bg)] hover:border-[var(--glass-highlight)]"
            )}
            style={{
                "--hover-bg": `rgba(${project.glow}, 0.05)`
            } as React.CSSProperties}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={togglePlay} // Mobile toggle
        >
            <div className="flex flex-col lg:flex-row h-full">

                {/* Media Side (Left/Top) */}
                <div className="relative w-full lg:w-3/5 min-h-[300px] lg:min-h-[450px] bg-[var(--bg-deep)]/50 overflow-hidden">

                    {/* Placeholder Content for Thumbnail - Visible when NOT playing */}
                    <div className={clsx(
                        "absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-10 bg-[var(--bg-deep)]",
                        isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                    )}>
                        <div className="text-center space-y-4">
                            <div className={clsx("w-20 h-20 mx-auto rounded-2xl flex items-center justify-center bg-[var(--text-primary)]/5", project.color)}>
                                {project.thumb}
                            </div>
                            <p className="text-xs text-[var(--text-tertiary)] font-mono uppercase tracking-widest">
                                <span className="lg:hidden">Tap to Preview</span>
                                <span className="hidden lg:inline">Hover to Preview</span>
                            </p>
                        </div>
                    </div>

                    {/* Video Content */}
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

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--glass-surface)] via-transparent to-transparent opacity-60 pointer-events-none z-20" />
                </div>

                {/* Content Side (Right/Bottom) */}
                <div className="relative w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center border-l border-[var(--glass-border)]">

                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-[var(--text-primary)]/5", project.color)}>
                                {project.subtitle}
                            </span>
                            <div className="flex gap-1 ml-auto">
                                {project.tags.map((tag: string) => (
                                    <span key={tag} className="text-[10px] text-[var(--text-tertiary)] px-2 py-1 rounded bg-[var(--glass-surface)] border border-[var(--glass-border)]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 transition-all">
                            {project.title}
                        </h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                            {project.desc}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[var(--glass-border)]">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--text-primary)] text-[var(--bg-deep)] font-bold text-sm hover:opacity-90 transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Live
                        </a>
                    </div>

                </div>

            </div>
        </motion.div>
    );
}
