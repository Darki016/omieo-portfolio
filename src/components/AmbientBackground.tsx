"use client";

import { useEffect, useRef } from "react";

export default function AmbientBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const blobs = containerRef.current.querySelectorAll('.mesh-blob');
            const scrollY = window.scrollY;
            blobs.forEach((blob, i) => {
                const speed = 0.15 * (i % 2 === 0 ? 1 : -1) * (1 + i * 0.1);
                (blob as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[var(--bg-deep)]">
            {/* Animated Mesh Gradient Blobs */}
            <div className="mesh-blob mesh-blob-1" />
            <div className="mesh-blob mesh-blob-2" />
            <div className="mesh-blob mesh-blob-3" />
            <div className="mesh-blob mesh-blob-4" />
        </div>
    );
}
