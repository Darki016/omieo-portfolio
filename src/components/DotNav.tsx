"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const sections = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "skills", label: "Inventory" },
    { id: "projects", label: "Quest Log" },
    { id: "process", label: "Workflow" },
    { id: "services", label: "Market" },
    { id: "testimonials", label: "Proof" },
    { id: "contact", label: "Exchange" },
];

export default function DotNav() {
    const [activeSection, setActiveSection] = useState("hero");
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const middlePoint = scrollY + (windowHeight / 2);

        let current = sections[0].id;
        let currentIndex = 0;

        for (let i = 0; i < sections.length; i++) {
            const el = document.getElementById(sections[i].id);
            if (el) {
                const rect = el.getBoundingClientRect();
                const absoluteTop = rect.top + scrollY;
                if (middlePoint >= absoluteTop - 150) {
                    current = sections[i].id;
                    currentIndex = i;
                }
            }
        }

        // Failsafe for bottom
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
            current = sections[sections.length - 1].id;
            currentIndex = sections.length - 1;
        }

        setActiveSection(current);
        setActiveIndex(currentIndex);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const scrollToSection = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth"
            });
        }
    };

    return (
        <nav className="dot-nav sm:flex hidden" aria-label="Quick Navigation">
            {/* The Track (Background Rings) */}
            <div className="relative flex flex-col gap-[12px] items-end">
                {sections.map((section, idx) => (
                    <button
                        key={section.id}
                        type="button"
                        onClick={(e) => scrollToSection(e, section.id)}
                        className="dot-nav-item group flex items-center gap-4 outline-none relative py-1"
                    >
                        <span className="dot-nav-label pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {section.label}
                        </span>
                        
                        <div className="w-4 h-4 flex items-center justify-center">
                            {/* The static 'empty' ring */}
                            <div className="w-2 h-2 rounded-full border border-[var(--text-secondary)]/20 transition-all duration-300 group-hover:border-[var(--text-primary)]/40 group-hover:scale-125" />
                        </div>
                    </button>
                ))}

                {/* The Single Waterdrop (Moves vertically along the track) */}
                <motion.div
                    className="absolute right-0 w-3.5 h-3.5 rounded-full bg-[var(--text-primary)] shadow-[0_0_15px_rgba(167,139,250,0.5)] z-10 pointer-events-none"
                    initial={false}
                    animate={{
                        top: activeIndex * 36 + 5, // index * (item gap [12] + item height [24]) + offset adjustment
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 70,   // Lazy
                        damping: 14,      // Slight bounce
                        mass: 1.6,       // Heavy waterdrop feel
                    }}
                    style={{
                        marginRight: '1px' // align with rings
                    }}
                />
            </div>
        </nav>
    );
}
