"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroller() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Expose lenis to window so GSAP ScrollTrigger can sync
        (window as any).__lenis = lenis;

        return () => {
            lenis.destroy();
            (window as any).__lenis = null;
        };
    }, []);

    return null;
}
