"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

const animations = [
    { scale: [1, 1.1, 1], filter: "brightness(1.5)", transition: { duration: 0.5 } }, // Pulse & Bright
    { x: [0, -5, 5, -5, 5, 0], color: "#ef4444", transition: { duration: 0.4 } }, // Glitch Shake Red
    { filter: ["blur(0px)", "blur(4px)", "blur(0px)"], opacity: [1, 0.5, 1], transition: { duration: 0.6 } }, // Ghost Fade
    { letterSpacing: ["0em", "0.2em", "0em"], color: "#8b5cf6", transition: { duration: 0.8 } }, // Expand Violet
    { rotateX: [0, 360], transition: { duration: 0.8 } } // 3D Flip
];

export default function MysticQuote({ text, author, className }: { text: string, author?: string, className?: string }) {
    const [animIndex, setAnimIndex] = useState(0);
    const [key, setKey] = useState(0); // To force re-render/replay

    const handleClick = () => {
        setAnimIndex((prev) => (prev + 1) % animations.length);
        setKey(prev => prev + 1);
    };

    return (
        <motion.div
            key={key}
            className={clsx("cursor-pointer select-none text-center group", className)}
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            animate={animations[animIndex]}
        >
            <p className="text-sm md:text-base font-medium text-[var(--text-secondary)] italic font-mono transition-colors group-hover:text-[var(--text-primary)]">
                "{text}"
            </p>
            {author && <span className="block text-[10px] text-[var(--text-tertiary)] mt-2 uppercase tracking-widest group-hover:text-[var(--text-secondary)]">- {author}</span>}
        </motion.div>
    );
}
