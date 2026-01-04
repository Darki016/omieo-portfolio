"use client";

import { motion } from "framer-motion";
import { ArrowUp, Terminal, Circle } from "lucide-react";
import clsx from "clsx";
import MysticQuote from "@/components/MysticQuote";

export default function Footer() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full relative overflow-hidden pt-24 pb-12 bg-[var(--bg-deep)] transition-colors duration-1000 text-[var(--text-primary)]">
            {/* --- Glass/Blur Top Effect --- */}
            <div className="absolute inset-0 pointer-events-none flex justify-center">
                {/* Subtle Glow - darker in light mode? Or variable based */}
                <div className="absolute top-0 w-full h-[200px] -translate-y-[80%] bg-[var(--text-primary)]/[0.03] blur-[150px] rounded-[100%]" />
                <div className="absolute top-0 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center">

                {/* Logo / System Identity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="flex items-center gap-2 mb-10"
                >
                    <div className="w-8 h-8 rounded-lg bg-[var(--text-primary)]/5 flex items-center justify-center border border-[var(--glass-border)] backdrop-blur-md">
                        <span className="font-bold text-[var(--text-primary)] text-lg">O</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Omieo<span className="text-[var(--text-secondary)]">.sys</span></span>
                </motion.div>

                {/* Mystic Quote */}
                <div className="mb-16">
                    <MysticQuote text="Stars can't shine without darkness." author="Unknown" />
                </div>

                {/* Footer Bottom Layout */}
                <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 pt-8 border-t border-[var(--glass-border)]">
                    <p className="text-[10px] md:text-xs text-[var(--text-secondary)] font-mono tracking-wider uppercase text-center md:text-left">
                        © 2026 Omieo Zaman. All Systems Nominal.
                    </p>

                    {/* Scroll Top Button */}
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--glass-surface)] hover:bg-[var(--glass-highlight)] border border-[var(--glass-border)] transition-all cursor-pointer"
                    >
                        <span className="text-[10px] font-mono text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors tracking-widest">RETURN_TO_SURFACE</span>
                        <ArrowUp className="w-3 h-3 text-[var(--text-tertiary)] group-hover:text-sky-400 transition-colors group-hover:-translate-y-1" />
                    </button>
                </div>

            </div>
        </footer>
    );
}
