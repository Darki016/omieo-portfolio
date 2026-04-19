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
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
            setIsHovering(!!isInteractive);
        };

        const animate = () => {
            // Dot follows immediately
            const dotEase = 0.2;
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
            {/* Inner Dot */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed z-[9999]"
                style={{
                    width: isHovering ? 8 : 6,
                    height: isHovering ? 8 : 6,
                    borderRadius: "50%",
                    background: "var(--cursor-color)",
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.2s, height 0.2s",
                }}
            />
            {/* Outer Ring */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed z-[9998]"
                style={{
                    width: isHovering ? 48 : 32,
                    height: isHovering ? 48 : 32,
                    borderRadius: "50%",
                    border: `1.5px solid var(--cursor-ring)`,
                    background: isHovering ? "rgba(var(--accent-color), 0.06)" : "transparent",
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.3s cubic-bezier(0.25,0.8,0.25,1), height 0.3s cubic-bezier(0.25,0.8,0.25,1), background 0.3s",
                    mixBlendMode: "difference",
                }}
            />
        </>
    );
}
