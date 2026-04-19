"use client";

const items = [
    "WEBFLOW",
    "FRAMER",
    "WORDPRESS",
    "FULL STACK",
    "MEDICAL STUDENT",
    "OPEN TO WORK",
];

export default function MarqueeTicker() {
    // The ticker text repeated 4x to make seamless loop
    const tickerContent = [...items, ...items, ...items, ...items];

    return (
        <div className="marquee-ticker-wrap relative w-full overflow-hidden py-6 border-y border-[var(--glass-border)]">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[var(--bg-deep)] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[var(--bg-deep)] to-transparent pointer-events-none" />

            <div className="marquee-ticker-track flex whitespace-nowrap">
                {tickerContent.map((item, idx) => (
                    <span key={idx} className="marquee-ticker-item flex items-center gap-4 mx-4">
                        <span className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-[var(--text-secondary)] font-mono">
                            {item}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[rgba(167,139,250,0.5)] shrink-0" />
                    </span>
                ))}
            </div>
        </div>
    );
}
