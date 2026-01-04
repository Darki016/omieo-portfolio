"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { Mail, Phone, Facebook, Instagram, Linkedin, MessageCircle, Gamepad2, Copy, Check } from "lucide-react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import LiquidOrb from "@/components/LiquidOrb";

const socialLinks = [
    {
        name: "WhatsApp",
        url: "https://wa.me/+8801572909866",
        icon: <MessageCircle className="w-6 h-6" />,
        color: "text-emerald-400",
        bg: "bg-emerald-500",
        border: "border-emerald-500/20",
        shadow: "shadow-emerald-500/20",
        desc: "Direct & Fast"
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/abid-zaman-1a9709288/",
        icon: <Linkedin className="w-6 h-6" />,
        color: "text-blue-400",
        bg: "bg-blue-500",
        border: "border-blue-500/20",
        shadow: "shadow-blue-500/20",
        desc: "Professional"
    },
    {
        name: "Discord",
        url: "https://discordapp.com/users/866313775144370217",
        icon: <Gamepad2 className="w-6 h-6" />,
        color: "text-indigo-400",
        bg: "bg-indigo-500",
        border: "border-indigo-500/20",
        shadow: "shadow-indigo-500/20",
        desc: "Omieo#0000"
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/omieozaman",
        icon: <Facebook className="w-6 h-6" />,
        color: "text-sky-400",
        bg: "bg-sky-500",
        border: "border-sky-500/20",
        shadow: "shadow-sky-500/20",
        desc: "Social"
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/omieozaman/",
        icon: <Instagram className="w-6 h-6" />,
        color: "text-pink-400",
        bg: "bg-pink-500",
        border: "border-pink-500/20",
        shadow: "shadow-pink-500/20",
        desc: "Visuals"
    }
];

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const socialVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const [message, setMessage] = useState(""); // Controlled state
    const email = "abidomieo@gmail.com";

    // Listen for "prefill-contact" event from Services
    useEffect(() => {
        const handlePrefill = (e: CustomEvent<string>) => {
            setMessage(e.detail);
            // Optional: smooth scroll focus is handled by the dispatcher mostly, 
            // but we ensure the field is updated.
            const textarea = document.getElementById("message");
            if (textarea) textarea.focus();
        };

        window.addEventListener("prefill-contact" as any, handlePrefill as any);
        return () => {
            window.removeEventListener("prefill-contact" as any, handlePrefill as any);
        };
    }, []);

    const handleCopyEmail = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    return (
        <section id="contact" className="relative w-full py-24 px-4 md:px-6 flex flex-col items-center overflow-hidden">

            <div className="relative z-10 max-w-7xl w-full">

                {/* Big Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-center mb-16"
                >

                    <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-normal">
                        The Shadow <span className="inline-block text-[var(--text-secondary)] pr-3 pb-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-tertiary)]">Exchange.</span>
                    </h2>
                </motion.div>

                {/* Main Content: Form + Orb (Now Animated) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24 will-change-transform" // Added hint
                >

                    {/* Left: Contact Form */}
                    <div className="p-6 md:p-8 rounded-3xl bg-[var(--glass-surface)] border border-[var(--glass-border)] flex flex-col justify-center transition-colors">
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-8 transition-colors">Connect with me</h3>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider">First name *</label>
                                    <input required id="firstName" name="firstName" type="text" placeholder="First name" className="w-full bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--glass-highlight)] transition-colors placeholder:text-[var(--text-tertiary)]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider">Last name</label>
                                    <input id="lastName" name="lastName" type="text" placeholder="Last name" className="w-full bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--glass-highlight)] transition-colors placeholder:text-[var(--text-tertiary)]" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider">Email *</label>
                                    <input required id="email" name="email" type="email" placeholder="Email" className="w-full bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--glass-highlight)] transition-colors placeholder:text-[var(--text-tertiary)]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider">Phone</label>
                                    <input id="phone" name="phone" type="tel" placeholder="Phone" className="w-full bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--glass-highlight)] transition-colors placeholder:text-[var(--text-tertiary)]" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-[var(--text-secondary)] font-mono uppercase tracking-wider">How can I help?</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Feel free to outline your ideas or needs..."
                                    rows={4}
                                    className="w-full bg-[var(--bg-deep)] border border-[var(--glass-border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--glass-highlight)] transition-colors resize-none placeholder:text-[var(--text-tertiary)]"
                                />
                            </div>

                            <button
                                onClick={() => {
                                    // Manual extraction since we aren't using controlled state for simplicity/speed here
                                    const fname = (document.getElementById('firstName') as HTMLInputElement).value;
                                    const lname = (document.getElementById('lastName') as HTMLInputElement).value;
                                    const email = (document.getElementById('email') as HTMLInputElement).value;
                                    const phone = (document.getElementById('phone') as HTMLInputElement).value;
                                    // wrapper: message is already in state
                                    const msg = message;

                                    const subject = `Contact from ${fname} ${lname}`;
                                    const body = `Name: ${fname} ${lname}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${msg}`;

                                    window.open(`mailto:abidomieo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                                }}
                                type="button"
                                className="w-full py-4 rounded-xl bg-[var(--text-primary)] text-[var(--bg-deep)] font-bold text-sm tracking-wide hover:opacity-90 transition-opacity mt-4"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Right: Liquid Orb */}
                    <div className="relative min-h-[350px] md:min-h-[500px] h-full rounded-3xl overflow-hidden">
                        <LiquidOrb />
                    </div>

                </motion.div>

                {/* Social Grid - Centered & Flexible (Kept as secondary) */}
                <div className="flex flex-wrap justify-center gap-4">
                    {socialLinks.map((link, idx) => (
                        <motion.a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={socialVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false }}
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                y: {
                                    duration: 3 + Math.random(), // Randomize duration slightly
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: Math.random() * 2 // Random delay for organic feel
                                },
                                default: { duration: 0.3 } // For hover effects
                            }}
                            whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.2 } }}
                            className={clsx(
                                "group p-4 rounded-2xl border flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer relative overflow-hidden",
                                "w-[45%] md:w-auto md:flex-1 md:min-w-[140px]",
                                "bg-[var(--glass-surface)] hover:bg-[var(--glass-highlight)] border-[var(--glass-border)]",
                                "shadow-md hover:shadow-xl hover:shadow-[var(--glass-shadow)]", // Added base shadow
                            )}
                        >

                            <div className={clsx("p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6", link.bg.replace('bg-', 'bg-') + '/10', link.color)}>
                                {link.icon}
                            </div>
                            <div className="text-center relative z-10">
                                <span className="block text-sm font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{link.name}</span>
                                <span className="block text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-mono mt-1 group-hover:text-[var(--text-secondary)] transition-colors">{link.desc}</span>
                            </div>
                        </motion.a>
                    ))}
                </div>

            </div>
        </section>
    );
}
