"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Honestly I wasn't sure what I wanted at first, just told him the vibe and he figured the rest out. The store came out better than I imagined. He fixed things without me having to ask twice.",
        client: "Maharun Nasa",
        project: "Owner, Needs & Fancy",
    },
    {
        quote: "I came with a half-broken site and a deadline. He sorted it out faster than I expected. Didn't over-explain things, just got it done. Would go back for the next one.",
        client: "Tariq Hossain",
        project: "Small business owner, Dhaka",
    },
    {
        quote: "I was nervous handing this off to someone I found online but it worked out fine. The WooCommerce setup was clean, products looked good, checkout worked properly. No drama.",
        client: "Nusrat Jahan",
        project: "Online clothing shop",
    },
    {
        quote: "Needed a simple portfolio site, nothing fancy. He didn't try to upsell me on things I didn't need which I appreciated. Delivered on time, looked professional.",
        client: "Farhan Alam",
        project: "Freelancer, content creator",
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="relative w-full px-6 section-spacing flex flex-col items-center overflow-hidden">
            <div className="relative z-10 max-w-7xl w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <span className="section-number">06</span>
                    <span className="inline-block py-1 px-3 rounded-full glass-pill text-xs text-[var(--text-secondary)] font-mono tracking-widest uppercase mb-4">
                        Social Proof
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-normal font-display">
                        What Clients{" "}
                        <span className="inline-block text-[var(--text-secondary)] pr-3 pb-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-tertiary)]">
                            Say.
                        </span>
                    </h2>
                </motion.div>

                {/* Quote Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: idx * 0.12,
                            }}
                            className="liquid-glass group relative p-8 flex flex-col gap-6 cursor-default"
                        >
                            {/* Large Quote Watermark */}
                            <Quote className="absolute top-6 right-6 w-12 h-12 text-[var(--text-primary)] opacity-[0.04]" />

                            {/* Quote Text */}
                            <p className="text-[var(--text-secondary)] leading-relaxed text-base italic relative z-10 group-hover:text-[var(--text-primary)] transition-colors">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Client Info */}
                            <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.06)]">
                                <p className="text-sm font-bold text-[var(--text-primary)]">
                                    {t.client}
                                </p>
                                <p className="text-xs text-[var(--text-tertiary)] font-mono uppercase tracking-wider mt-1">
                                    {t.project}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
