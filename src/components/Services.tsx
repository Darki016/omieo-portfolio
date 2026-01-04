"use client";

import { motion, Variants } from "framer-motion";
import { Code, PenTool, Users, Zap, BookOpen, Layers } from "lucide-react";
import clsx from "clsx";

const webDevServices = [
    {
        title: "Webflow & Framer",
        subtitle: "HIGH_IMPACT",
        price: "$600 – $1,600",
        desc: "For projects that need a real wow factor. Smooth animations, modern layouts, and a premium feel—best suited for landing pages and portfolios.",
        features: ["Smooth Animations", "Modern Layouts", "Premium Feel", "Fast Turnaround"],
        color: "text-rose-400",
        bg: "bg-rose-500",
        shadow: "shadow-rose-500/20",
        icon: <Zap className="w-6 h-6" />,
        glow: "251, 113, 133", // Rose
        template: "[Service Request: High-Impact Site (Webflow/Framer)]\n\nI need a premium site with smooth animations. Project Details: "
    },
    {
        title: "WordPress Builds",
        subtitle: "SCALABLE_CMS",
        price: "$500 – $1,500",
        desc: "Scalable, SEO-ready websites with a CMS that’s actually usable. Ideal for businesses that want flexibility without chaos.",
        features: ["SEO Ready", "User Design", "Flexible CMS", "Easy Management"],
        color: "text-sky-400",
        bg: "bg-sky-500",
        shadow: "shadow-sky-500/20",
        icon: <Layers className="w-6 h-6" />,
        glow: "56, 189, 248", // Sky
        template: "[Service Request: Scalable CMS (WordPress)]\n\nI need an SEO-ready website that is easy to manage. Requirements: "
    },
    {
        title: "Custom Code Builds",
        subtitle: "HARD_CODED",
        price: "$400 – $800",
        desc: "Handcrafted sites built from scratch using HTML, CSS, and JavaScript. Ultra-fast, lean, and bloat-free. Best for static sites or custom logic.",
        features: ["Ultra Fast", "Lean Code", "No Bloat", "Custom Logic"],
        color: "text-violet-400",
        bg: "bg-violet-500",
        shadow: "shadow-violet-500/20",
        icon: <Code className="w-6 h-6" />,
        glow: "167, 139, 250", // Violet
        template: "[Service Request: Custom Development (HTML/CSS/JS)]\n\nI need a high-performance, handcrafted website. Specifications: "
    }
];

const creativeServices = [
    {
        title: "Pro Content & Copy",
        subtitle: "SPECIALIZED_WRITING",
        desc: "Medical, technical, or web-focused content that’s clear, accurate, and logically structured. Backed by medical training and award-recognized English skills.",
        rates: [
            "Writing: $0.15 – $0.25 / word",
            "Proofreading: $0.05 – $0.07 / word",
            "Web Copy Pkg: $300 – $600"
        ],
        color: "text-amber-400",
        bg: "bg-amber-500",
        shadow: "shadow-amber-500/20",
        icon: <PenTool className="w-6 h-6" />,
        glow: "251, 191, 36", // Amber
        template: "[Service Request: Content & Copywriting]\n\nI need specialized writing (Medical/Tech/Web). Topic & Word Count: "
    },
    {
        title: "Author & Manuscript",
        subtitle: "EDITING_SUITE",
        desc: "Developmental flow, structure, and pacing without killing your voice. Proofreading with a reader-first mindset for fiction and non-fiction.",
        rates: [
            "Dev Editing: Custom Pricing",
            "Proofreading: $0.05 – $0.07 / word"
        ],
        color: "text-emerald-400",
        bg: "bg-emerald-500",
        shadow: "shadow-emerald-500/20",
        icon: <BookOpen className="w-6 h-6" />,
        glow: "52, 211, 153", // Emerald
        template: "[Service Request: Manuscript Editing]\n\nI need developmental editing or proofreading. Genre & Length: "
    }
];

const managementService = {
    title: "Community & Social Mgmt",
    subtitle: "GUILD_LEADERSHIP",
    price: "$400 – $1,000 / month",
    desc: "Active moderation, conflict handling, and engagement strategies for Discord servers or Facebook groups. Includes localization support in English, Bangla, Hindi, and German.",
    color: "text-indigo-400",
    bg: "bg-indigo-500",
    shadow: "shadow-indigo-500/20",
    icon: <Users className="w-6 h-6" />,
    glow: "129, 140, 248", // Indigo
    template: "[Service Request: Community Management]\n\nI need moderation and engagement leadership. Platform & Goals: "
};

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

const hoverVariants: Variants = {
    hover: {
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 } // Snappy game feel
    }
};

export default function Services() {

    const handleServiceClick = (template: string) => {
        // Dispatch Custom Event
        const event = new CustomEvent('prefill-contact', { detail: template });
        window.dispatchEvent(event);

        // Smooth Scroll to Contact
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="services" className="relative w-full py-24 px-6 flex flex-col items-center overflow-hidden">



            <div className="relative z-10 max-w-6xl w-full">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-[var(--glass-surface)] border border-[var(--glass-border)] text-xs text-[var(--text-secondary)] font-mono tracking-widest uppercase mb-4">
                        The Market
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-normal">
                        Merchant <span className="inline-block text-[var(--text-secondary)] pr-3 pb-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-tertiary)]">Services.</span>
                    </h2>
                </motion.div>

                <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }}>

                    {/* ROW 1: Web Dev Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {webDevServices.map((service, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover="hover"
                                onClick={() => handleServiceClick(service.template)}
                                className={clsx(
                                    "glass-panel group p-6 md:p-8 rounded-[24px]",
                                    "hover:bg-[var(--hover-bg)] hover:border-[var(--glass-highlight)]",
                                    "transition-all duration-300 flex flex-col relative overflow-hidden cursor-pointer"
                                )}
                                style={{
                                    "--hover-bg": `rgba(${service.glow}, 0.05)`
                                } as React.CSSProperties}
                            >
                                <motion.div variants={hoverVariants} className="absolute inset-0" /> {/* Dummy logic mostly, variants applied to parent usually propagates but here we want parent transform */}

                                {/* Inner Glow on Hover */}


                                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-[var(--text-primary)]/5 group-hover:bg-[var(--text-primary)]/10 transition-colors z-10", service.color)}>
                                    <motion.div variants={{ hover: { scale: 1.2, rotate: 5 } }} transition={{ type: "spring", stiffness: 300 }}>
                                        {service.icon}
                                    </motion.div>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 z-10 transition-colors">{service.title}</h3>
                                <p className="text-xs font-mono text-[var(--text-secondary)] mb-4 tracking-widest uppercase z-10">{service.subtitle}</p>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 flex-grow z-10 group-hover:text-[var(--text-primary)] transition-colors">
                                    {service.desc}
                                </p>

                                <div className="space-y-3 mb-8 z-10">
                                    {service.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-2 text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                                            <div className={clsx("w-1.5 h-1.5 rounded-full", service.bg)} />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-[var(--glass-border)] flex items-center justify-between z-10">
                                    <span className={clsx("text-lg font-bold group-hover:scale-105 transition-transform origin-left", service.color)}>{service.price}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ROW 2: Creative Services */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {creativeServices.map((service, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover="hover"
                                onClick={() => handleServiceClick(service.template)}
                                className={clsx(
                                    "glass-panel group p-6 md:p-8 rounded-[24px]",
                                    "hover:bg-[var(--hover-bg)] hover:border-[var(--glass-highlight)]",
                                    "transition-all duration-300 flex flex-col items-start gap-4 relative overflow-hidden cursor-pointer"
                                )}
                                style={{
                                    "--hover-bg": `rgba(${service.glow}, 0.05)`
                                } as React.CSSProperties}
                            >


                                <div className="flex items-start gap-6 w-full z-10">
                                    <div className={clsx("shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--text-primary)]/5 group-hover:bg-[var(--text-primary)]/10 transition-colors", service.color)}>
                                        <motion.div variants={{ hover: { scale: 1.2, rotate: 5 } }} transition={{ type: "spring", stiffness: 300 }}>
                                            {service.icon}
                                        </motion.div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{service.title}</h3>
                                        <p className="text-xs font-mono text-[var(--text-secondary)] mb-3 tracking-widest uppercase">{service.subtitle}</p>
                                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">
                                            {service.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Rates Section */}
                                <div className="mt-auto pt-6 border-t border-[var(--glass-border)] w-full z-10">
                                    <div className="space-y-2">
                                        {service.rates.map((rate, rIdx) => (
                                            <div key={rIdx} className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                                                <div className={clsx("w-1.5 h-1.5 rounded-full", service.bg)} />
                                                {rate}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ROW 3: Management */}
                    <motion.div
                        variants={itemVariants}
                        whileHover="hover"
                        onClick={() => handleServiceClick(managementService.template)}
                        className={clsx(
                            "glass-panel group p-6 md:p-8 rounded-[24px] will-change-transform", // Added hint
                            "hover:bg-[var(--hover-bg)] hover:border-[var(--glass-highlight)]",
                            "transition-all duration-300 flex flex-col md:flex-row items-center text-center md:text-left gap-8 mb-8 relative overflow-hidden cursor-pointer"
                        )}
                        style={{
                            "--hover-bg": `rgba(${managementService.glow}, 0.05)`
                        } as React.CSSProperties}
                    >


                        <div className={clsx("shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center bg-[var(--text-primary)]/5 group-hover:bg-[var(--text-primary)]/10 transition-colors z-10", managementService.color)}>
                            <motion.div variants={{ hover: { scale: 1.2, rotate: -5 } }} transition={{ type: "spring", stiffness: 300 }}>
                                {managementService.icon}
                            </motion.div>
                        </div>
                        <div className="flex-grow z-10">
                            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{managementService.title}</h3>
                            <p className="text-xs font-mono text-[var(--text-secondary)] mb-3 tracking-widest uppercase">{managementService.subtitle}</p>
                            <p className="text-[var(--text-secondary)] max-w-2xl text-lg leading-relaxed mb-4 md:mb-0 group-hover:text-[var(--text-primary)] transition-colors">
                                {managementService.desc}
                            </p>
                        </div>
                        <div className="shrink-0 z-10">
                            <span className={clsx("text-xl font-bold block text-center md:text-right mb-1 group-hover:scale-105 transition-transform", managementService.color)}>{managementService.price}</span>
                            <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest block text-center md:text-right">Retainer</span>
                        </div>
                    </motion.div>

                    {/* Rules of Engagement */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        className="px-6 py-6 rounded-2xl bg-[var(--glass-surface)] border border-[var(--glass-border)] flex flex-col md:flex-row items-start md:items-center gap-6 text-xs text-[var(--text-secondary)] hover:border-[var(--glass-highlight)] hover:bg-[var(--glass-highlight)] transition-colors cursor-help"
                    >
                        <div className="flex items-center gap-2 text-rose-400 shrink-0">
                            <span className="font-bold uppercase tracking-wider text-sm">Rules of Engagement</span>
                        </div>
                        <div className="h-4 w-px bg-[var(--glass-border)] hidden md:block" />
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
                            <div className="flex-1">
                                <span className="text-[var(--text-primary)] font-bold block mb-1">Hosting</span>
                                Hosting, domains & plugins are client’s responsibility.
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
