"use client";

import { motion, Variants } from "framer-motion";
import clsx from "clsx";

const pricingCards = [
    {
        title: "Starter Build",
        price: "$75 – $150",
        desc: "Custom WordPress website, up to 5 pages, free theme, contact form. Ideal for a solid local business presence.",
        delivery: "5–7 days",
        color: "text-sky-400",
        glow: "56, 189, 248",
        template: "[Service Request: Starter Build]\n\nI need a custom WordPress website. Details: ",
    },
    {
        title: "Business Pro",
        price: "$150 – $300",
        desc: "Tailored WordPress development with Elementor, 10 pages, SEO optimization, and mobile-responsive layout.",
        delivery: "7–14 days",
        color: "text-violet-400",
        glow: "167, 139, 250",
        template: "[Service Request: Business Pro]\n\nI need professional WordPress development. Details: ",
    },
    {
        title: "WooCommerce Store Setup",
        price: "$250 – $500",
        desc: "Complete WooCommerce store setup — custom product flows, payment gateways, and advanced shipping logic for e-commerce.",
        delivery: "10–21 days",
        color: "text-emerald-400",
        glow: "52, 211, 153",
        template: "[Service Request: WooCommerce Store Setup]\n\nI need a full WooCommerce store setup. Details: ",
    },
    {
        title: "Bug Fix / Customization",
        price: "$15 – $60",
        desc: "Broken layouts, plugin conflicts, responsive issues, minor feature additions.",
        delivery: "1–3 days",
        color: "text-amber-400",
        glow: "251, 191, 36",
        template: "[Service Request: Bug Fix / Customization]\n\nI need help fixing or customizing my site. Issue: ",
    },
    {
        title: "Pro Content & Copy",
        price: "$30 – $80",
        desc: "Product descriptions, landing page copy, homepage rewrite. Per-page or per-project.",
        delivery: "Per project",
        color: "text-pink-400",
        glow: "236, 72, 153",
        template: "[Service Request: Content & Copy]\n\nI need professional copywriting. Scope: ",
    },
    {
        title: "Retainer / Maintenance",
        price: "$50 – $100/mo",
        desc: "Plugin updates, performance checks, 2 hours of monthly edits included.",
        delivery: "Monthly",
        color: "text-cyan-400",
        glow: "6, 182, 212",
        template: "[Service Request: Monthly Retainer]\n\nI need ongoing maintenance for my site. Details: ",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

export default function Services() {

    const handleServiceClick = (template: string) => {
        const event = new CustomEvent('prefill-contact', { detail: template });
        window.dispatchEvent(event);

        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="services" className="relative w-full section-spacing px-6 flex flex-col items-center overflow-hidden">
            <div className="relative z-10 max-w-6xl w-full">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <span className="inline-block py-1 px-3 rounded-full glass-pill text-xs text-[var(--text-secondary)] font-mono tracking-widest uppercase mb-4">
                        The Market
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-normal">
                        Merchant <span className="inline-block text-[var(--text-secondary)] pr-3 pb-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-tertiary)]">Services.</span>
                    </h2>
                </motion.div>

                <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pricingCards.map((card, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                onClick={() => handleServiceClick(card.template)}
                                className="liquid-glass group relative p-8 flex flex-col cursor-pointer overflow-hidden"
                                style={{
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.backdropFilter = "blur(40px) saturate(200%)";
                                    el.style.borderColor = `rgba(${card.glow}, 0.25)`;
                                    el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(${card.glow}, 0.15)`;
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.backdropFilter = "blur(24px) saturate(180%)";
                                    el.style.borderColor = "rgba(255, 255, 255, 0.10)";
                                    el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)";
                                }}
                            >
                                {/* Delivery badge - top right */}
                                <div className="absolute top-4 right-4">
                                    <span className="glass-pill px-3 py-1 text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
                                        {card.delivery}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 pr-20">{card.title}</h3>

                                {/* Price - largest element */}
                                <p className={clsx("text-3xl md:text-4xl font-bold mb-4 tracking-tight", card.color)}>
                                    {card.price}
                                </p>

                                {/* Description */}
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow group-hover:text-[var(--text-primary)] transition-colors">
                                    {card.desc}
                                </p>

                                {/* CTA indicator */}
                                <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                                    <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider group-hover:text-[var(--text-secondary)] transition-colors">
                                        Click to inquire →
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Rules of Engagement */}
                    <motion.div
                        variants={itemVariants}
                        className="liquid-glass mt-8 px-6 py-6 flex flex-col md:flex-row items-start md:items-center gap-6 text-xs text-[var(--text-secondary)]"
                    >
                        <div className="flex items-center gap-2 text-rose-400 shrink-0">
                            <span className="font-bold uppercase tracking-wider text-sm">Rules of Engagement</span>
                        </div>
                        <div className="h-4 w-px bg-[var(--glass-border)] hidden md:block" />
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
                            <div className="flex-1">
                                <span className="text-[var(--text-primary)] font-bold block mb-1">Hosting</span>
                                Hosting, domains & plugins are client&apos;s responsibility.
                            </div>
                            <div className="flex-1">
                                <span className="text-[var(--text-primary)] font-bold block mb-1">Payments</span>
                                50% upfront deposit required to start.
                            </div>
                            <div className="flex-1">
                                <span className="text-[var(--text-primary)] font-bold block mb-1">Revisions</span>
                                Two rounds included. Extras billed hourly.
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
