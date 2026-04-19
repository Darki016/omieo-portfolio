"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function AnimatedCounter({ target, suffix = "", duration = 1000 }: { target: number; suffix?: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.1 });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) {
            setCount(0); // Reset when scrolled away
            return;
        }

        let start = 0;
        const end = target;
        const startTime = performance.now() + 300; // Small sync delay

        const step = (currentTime: number) => {
            if (currentTime < startTime) {
                requestAnimationFrame(step);
                return;
            }
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out expo for a smoother finish
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            const current = Math.round(start + (end - start) * eased);
            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        const animFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animFrame);
    }, [isInView, target, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    );
}

const stats = [
    { value: 15, suffix: "+", label: "Projects Delivered" },
    { value: 8, suffix: "+", label: "Clients" },
    { value: 5, suffix: "", label: "WooCommerce Stores Built" },
];

export default function StatsBar() {
    return (
        <section className="relative w-full px-6 py-6" id="stats">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-5xl mx-auto"
            >
                <div className="liquid-glass px-8 py-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <span className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            </span>
                            <span className="text-sm text-[var(--text-secondary)] font-medium">
                                {stat.label}
                            </span>
                            {idx < stats.length - 1 && (
                                <span className="hidden md:block text-[var(--text-tertiary)] ml-8">·</span>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
