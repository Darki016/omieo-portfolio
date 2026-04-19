"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--bg-deep)]"
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* System Name */}
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-[var(--text-primary)] opacity-80" />
                            <span className="text-xl font-bold tracking-[0.2em] text-[var(--text-primary)] font-mono">
                                OMIEO.SYS
                            </span>
                        </div>

                        {/* Loading bar */}
                        <div className="w-48 h-[2px] bg-[var(--text-primary)]/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--text-primary)] rounded-full loader-bar" />
                        </div>

                        {/* Booting text */}
                        <span className="text-xs text-[var(--text-tertiary)] font-mono tracking-widest uppercase loader-text">
                            BOOTING...
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
