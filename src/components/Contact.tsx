"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Facebook, Instagram, Linkedin, MessageCircle, Gamepad2, Copy, Check } from "lucide-react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import LiquidOrb from "@/components/LiquidOrb";

// Correct Fiverr SVG Icon
// Official Discord SVG Path
const DiscordIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
    </svg>
);

// Official WhatsApp SVG Path
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
);

// Correct Fiverr SVG Icon
const FiverrIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z"/>
    </svg>
);

// Upwork SVG Icon
const UpworkIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.214-1.832-2.148-4.032-2.687-5.886H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.498H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
    </svg>
);

const socialLinks = [
    {
        name: "WhatsApp",
        url: "https://wa.me/+8801572909866",
        icon: <WhatsAppIcon />,
        color: "text-[#25D366]",
        bg: "bg-[#25D366]",
        desc: "Direct & Fast"
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/abid-zaman-1a9709288/",
        icon: <Linkedin className="w-6 h-6" />,
        color: "text-[#0A66C2]",
        bg: "bg-[#0A66C2]",
        desc: "Professional"
    },
    {
        name: "Discord",
        url: "https://discordapp.com/users/866313775144370217",
        icon: <DiscordIcon />,
        color: "text-[#5865F2]",
        bg: "bg-[#5865F2]",
        desc: "Omieo#0000"
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/omieozaman",
        icon: <Facebook className="w-6 h-6" />,
        color: "text-[#1877F2]",
        bg: "bg-[#1877F2]",
        desc: "Social"
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/omieozaman/",
        icon: <Instagram className="w-6 h-6" />,
        color: "text-[#E4405F]",
        bg: "bg-[#E4405F]",
        desc: "Visuals"
    },
    {
        name: "Fiverr",
        url: "https://www.fiverr.com/omieozaman",
        icon: <FiverrIcon />,
        color: "text-[#1DBF73]",
        bg: "bg-[#1DBF73]",
        desc: "Freelance"
    },
    {
        name: "Upwork",
        url: "https://www.upwork.com/freelancers/~01d0019fdd7a74382b",
        icon: <UpworkIcon />,
        color: "text-[#14a800]",
        bg: "bg-[#14a800]",
        desc: "Freelance"
    },
];

const socialVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Contact() {
    const [message, setMessage] = useState("");
    const [copied, setCopied] = useState(false);

    // Listen for "prefill-contact" event from Services
    useEffect(() => {
        const handlePrefill = (e: CustomEvent<string>) => {
            setMessage(e.detail);
            const textarea = document.getElementById("message");
            if (textarea) textarea.focus();
        };

        window.addEventListener("prefill-contact" as any, handlePrefill as any);
        return () => {
            window.removeEventListener("prefill-contact" as any, handlePrefill as any);
        };
    }, []);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText("abidomieo@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const textArea = document.createElement("textarea");
            textArea.value = "abidomieo@gmail.com";
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section id="contact" className="relative w-full section-spacing px-4 md:px-6 flex flex-col items-center overflow-hidden">

            <div className="relative z-10 max-w-7xl w-full">

                {/* Big Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-center mb-16"
                >
                    <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-normal">
                        The Shadow <span className="inline-block text-[var(--text-secondary)] pr-3 pb-1 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-tertiary)]">Exchange.</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] mt-4 text-lg">Connect with me.</p>

                    {/* Email with copy button */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <span className="text-sm font-mono text-[var(--text-secondary)]">abidomieo@gmail.com</span>
                        <button
                            onClick={handleCopyEmail}
                            className={clsx(
                                "p-2 rounded-lg glass-pill transition-all hover:bg-[rgba(255,255,255,0.1)]",
                                copied && "copy-flash"
                            )}
                            aria-label="Copy email"
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                                <Copy className="w-4 h-4 text-[var(--text-secondary)]" />
                            )}
                        </button>
                        {copied && (
                            <span className="text-xs text-emerald-400 font-mono">Copied!</span>
                        )}
                    </div>
                </motion.div>

                {/* Main Content: Form + Orb */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24 will-change-transform"
                >

                    {/* Left: Contact Form */}
                    <div className="liquid-glass p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-8 transition-colors">Send a message</h3>

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
                                    const fname = (document.getElementById('firstName') as HTMLInputElement).value;
                                    const lname = (document.getElementById('lastName') as HTMLInputElement).value;
                                    const emailVal = (document.getElementById('email') as HTMLInputElement).value;
                                    const phone = (document.getElementById('phone') as HTMLInputElement).value;
                                    const msg = message;

                                    const subject = `Contact from ${fname} ${lname}`;
                                    const body = `Name: ${fname} ${lname}\nEmail: ${emailVal}\nPhone: ${phone}\n\nMessage:\n${msg}`;

                                    window.open(`mailto:abidomieo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                                }}
                                type="button"
                                className="w-full py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-deep)] font-bold text-sm tracking-wide hover:opacity-90 transition-opacity mt-4"
                            >
                                Submit
                            </button>
                        </form>

                        {/* Muted text below form */}
                        <p className="text-xs text-[var(--text-tertiary)] mt-6 text-center">
                            There isn&apos;t a complex gating process. Just reach out.
                        </p>
                    </div>

                    {/* Right: Liquid Orb */}
                    <div className="relative min-h-[350px] md:min-h-[500px] h-full rounded-[20px] overflow-hidden">
                        <LiquidOrb />
                    </div>

                </motion.div>

                {/* Social Grid */}
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
                            viewport={{ once: true }}
                            whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
                            className={clsx(
                                "liquid-glass group p-4 flex flex-col items-center justify-center gap-3 cursor-pointer",
                                "w-[45%] md:w-auto md:flex-1 md:min-w-[120px]",
                            )}
                        >
                            <div className={clsx("p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-[var(--text-primary)]/5", link.color)}>
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
