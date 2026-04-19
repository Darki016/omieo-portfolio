"use client";

import {
    Globe, Code2, Terminal, Layout, PenTool, ShoppingCart
} from "lucide-react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const skills = [
    {
        name: "Webflow / Framer",
        level: 75,
        levelLabel: "Intermediate",
        desc: "Layout-first tools. I use these when clients need something fast and maintainable.",
        icon: <Globe className="w-6 h-6" />,
        color: "text-blue-400",
        barColor: "bg-blue-400",
        glow: "59, 130, 246",
    },
    {
        name: "WordPress",
        level: 90,
        levelLabel: "Advanced",
        desc: "My main stack. Elementor, WooCommerce, custom post types — I've been in the internals.",
        icon: <ShoppingCart className="w-6 h-6" />,
        color: "text-emerald-400",
        barColor: "bg-emerald-400",
        glow: "52, 211, 153",
    },
    {
        name: "HTML & CSS",
        level: 92,
        levelLabel: "Advanced",
        desc: "Hand-coded when plugins get in the way.",
        icon: <Code2 className="w-6 h-6" />,
        color: "text-orange-400",
        barColor: "bg-orange-400",
        glow: "249, 115, 22",
    },
    {
        name: "JavaScript",
        level: 78,
        levelLabel: "Intermediate",
        desc: "Enough to fix what breaks and build what doesn't exist.",
        icon: <Terminal className="w-6 h-6" />,
        color: "text-yellow-400",
        barColor: "bg-yellow-400",
        glow: "234, 179, 8",
    },
    {
        name: "Layout / Editing",
        level: 80,
        levelLabel: "Proficient",
        desc: "I write my own copy and handle basic graphic work. Fewer handoff problems.",
        icon: <Layout className="w-6 h-6" />,
        color: "text-pink-400",
        barColor: "bg-pink-400",
        glow: "236, 72, 153",
    },
    {
        name: "Content Writing",
        level: 82,
        levelLabel: "Proficient",
        desc: "Product descriptions, landing page copy, basic SEO. Not an afterthought.",
        icon: <PenTool className="w-6 h-6" />,
        color: "text-cyan-400",
        barColor: "bg-cyan-400",
        glow: "6, 182, 212",
    },
];

function AnimatedNumber({ target, inView }: { target: number; inView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) {
            setCount(0);
            return;
        }
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(start + (target - start) * eased));
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }, [inView, target]);

    return <span className="tabular-nums">{count}</span>;
}

export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // GSAP ScrollTrigger for staggered card entry and skill bar animations
    useEffect(() => {
        let ctx: any;

        const initGSAP = async () => {
            const gsap = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                // Stagger skill cards
                gsap.fromTo(
                    ".skill-card",
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 65%",
                            toggleActions: "play none none none",
                        },
                    }
                );

                // Animate skill bars from 0% width
                gsap.fromTo(
                    ".gsap-skill-bar",
                    { width: "0%" },
                    {
                        width: (i: number, el: HTMLElement) => el.dataset.width || "0%",
                        duration: 1.4,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 60%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }, sectionRef);
        };

        initGSAP();

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="relative w-full section-spacing px-6 flex flex-col items-center overflow-hidden">
            <div className="relative z-10 max-w-6xl w-full">

                {/* Header */}
                <div className="relative text-center mb-20">
                    {/* Oversized Section Number */}
                    <span className="section-number">02</span>

                    <span className="inline-block py-1 px-3 rounded-full glass-pill text-xs text-[var(--text-secondary)] font-mono tracking-widest uppercase mb-4">
                        The Inventory
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-normal font-display">
                        Skill <span className="inline-block text-[var(--text-secondary)] pr-3 pb-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-tertiary)]">Matrix.</span>
                    </h2>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, idx) => (
                        <div
                            key={idx}
                            className="skill-card liquid-glass group relative p-6 cursor-default scanline-hover overflow-hidden"
                            style={{
                                opacity: 0,
                                transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease, background 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = `rgba(${skill.glow}, 0.3)`;
                                el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 20px rgba(${skill.glow}, 0.1)`;
                                el.style.transform = "translateY(-4px) scale(1.02)";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = "rgba(255, 255, 255, 0.10)";
                                el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)";
                                el.style.transform = "translateY(0) scale(1)";
                            }}
                        >
                            <div className="flex items-start gap-4 mb-4">
                                {/* Icon */}
                                <div className={clsx("p-3 rounded-2xl bg-[var(--text-primary)]/5 group-hover:bg-[var(--text-primary)]/10 transition-colors", skill.color)}>
                                    {skill.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-[var(--text-primary)] text-lg">{skill.name}</h4>
                                    {/* Level pill */}
                                    <span className="inline-block mt-1 text-[10px] font-mono text-[var(--text-secondary)] glass-pill px-2.5 py-0.5 uppercase tracking-wider">
                                        {skill.levelLabel}
                                    </span>
                                </div>
                                {/* Animated Level Number */}
                                <div className={clsx("text-2xl font-bold font-mono", skill.color)}>
                                    <AnimatedNumber target={skill.level} inView={inView} />
                                </div>
                            </div>

                            {/* Animated Level Bar - GSAP driven */}
                            <div className="w-full h-1.5 rounded-full bg-[var(--text-primary)]/5 mb-4 overflow-hidden">
                                <div
                                    className={clsx("gsap-skill-bar h-full rounded-full", skill.barColor)}
                                    data-width={`${skill.level}%`}
                                    style={{
                                        width: "0%",
                                        boxShadow: `0 0 8px rgba(${skill.glow}, 0.4)`,
                                    }}
                                />
                            </div>

                            {/* One-liner description */}
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">
                                {skill.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
