"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
        setIsDesktop(mq.matches);
        if (!mq.matches) return;

        let dotX = -100, dotY = -100;
        let ringX = -100, ringY = -100;
        let targetX = -100, targetY = -100;
        let rafId: number;

        const handleMouseMove = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;

            // Magnetic pull effect on CTA buttons and social links
            const magneticEls = document.querySelectorAll('[data-magnetic], .social-link-card, .submit-pulse');
            magneticEls.forEach((el) => {
                const rect = (el as HTMLElement).getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distX = e.clientX - centerX;
                const distY = e.clientY - centerY;
                const dist = Math.sqrt(distX * distX + distY * distY);

                if (dist < 100) {
                    const pullStrength = 0.15;
                    const pullX = distX * pullStrength;
                    const pullY = distY * pullStrength;
                    (el as HTMLElement).style.transform = `translate(${pullX}px, ${pullY}px)`;
                    (el as HTMLElement).style.transition = "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)";
                } else {
                    (el as HTMLElement).style.transform = "";
                }
            });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
            setIsHovering(!!isInteractive);
        };

        const animate = () => {
            // Dot follows with slight smoothing
            const dotEase = 0.25;
            dotX += (targetX - dotX) * dotEase;
            dotY += (targetY - dotY) * dotEase;

            // Ring has more lag
            const ringEase = 0.08;
            ringX += (targetX - ringX) * ringEase;
            ringY += (targetY - ringY) * ringEase;

            if (dotRef.current) {
                dotRef.current.style.left = `${dotX}px`;
                dotRef.current.style.top = `${dotY}px`;
            }
            if (ringRef.current) {
                ringRef.current.style.left = `${ringX}px`;
                ringRef.current.style.top = `${ringY}px`;
            }

            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            cancelAnimationFrame(rafId);
        };
    }, []);

    if (!isDesktop) return null;

    return (
        <>
            {/* Inner Dot — Glowing accent dot */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed z-[9999]"
                style={{
                    width: isHovering ? 12 : 8,
                    height: isHovering ? 12 : 8,
                    borderRadius: "50%",
                    background: "var(--cursor-color)",
                    boxShadow: isHovering
                        ? "0 0 20px 6px var(--cursor-color), 0 0 40px 12px rgba(var(--accent-color), 0.2)"
                        : "0 0 12px 4px var(--cursor-color), 0 0 24px 8px rgba(var(--accent-color), 0.15)",
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.25s cubic-bezier(0.25,0.8,0.25,1), height 0.25s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.25s ease",
                }}
            />
            {/* Outer Ring — scales 1.8x on interactive hover */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed z-[9998]"
                style={{
                    width: isHovering ? 58 : 32, // 32 * 1.8 ≈ 58
                    height: isHovering ? 58 : 32,
                    borderRadius: "50%",
                    border: `1.5px solid var(--cursor-ring)`,
                    background: isHovering ? "rgba(var(--accent-color), 0.06)" : "transparent",
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.3s cubic-bezier(0.25,0.8,0.25,1), height 0.3s cubic-bezier(0.25,0.8,0.25,1), background 0.3s, border-color 0.3s",
                    mixBlendMode: "difference",
                }}
            />
        </>
    );
}
