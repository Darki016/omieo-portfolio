"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className }: { className?: string }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            onClick={toggleTheme}
            className={`w-14 h-7 rounded-full p-1 cursor-pointer flex items-center transition-colors duration-500 shadow-sm border border-white/10 ${theme === 'dark' ? 'bg-black justify-end' : 'bg-gray-200 justify-start'} ${className}`}
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center relative overflow-hidden"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {theme === 'dark' ? (
                        <motion.div
                            key="moon"
                            initial={{ y: -20, opacity: 0, rotate: -45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: 20, opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Moon className="w-3 h-3 text-slate-800 fill-slate-800" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ y: 20, opacity: 0, rotate: 45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: -45 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Sun className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
