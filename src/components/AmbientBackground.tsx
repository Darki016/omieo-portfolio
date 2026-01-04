"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
    return (
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[var(--bg-deep)]">

            {/* Ambient Orbs - Theme Aware */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--orb-color-1)] blur-[120px] opacity-40 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--orb-color-2)] blur-[120px] opacity-40 animate-pulse delay-1000" />
            <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-[var(--orb-color-3)] blur-[100px] opacity-30" />

            {/* Grid Overlay for texture - reduced opacity for subtlety (Darker in light mode?) */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-0 [mask-image:linear-gradient(180deg,black,transparent)]" />
        </div>
    );
}
