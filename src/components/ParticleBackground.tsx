"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    pulseSpeed: number;
    pulsePhase: number;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        setIsDesktop(window.innerWidth > 768);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        const createParticles = () => {
            const count = isDesktop ? 80 : 40;
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.5 + 0.1,
                    pulseSpeed: Math.random() * 0.02 + 0.005,
                    pulsePhase: Math.random() * Math.PI * 2,
                });
            }
        };

        const drawGrid = (w: number, h: number) => {
            const gridSize = 60;
            ctx.strokeStyle = "rgba(167, 139, 250, 0.04)";
            ctx.lineWidth = 0.5;

            for (let x = 0; x < w; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
            }
            for (let y = 0; y < h; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
        };

        const animate = (time: number) => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;

            ctx.clearRect(0, 0, w, h);

            // Draw subtle grid
            drawGrid(w, h);

            // Update & draw particles
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.5 + 0.5;
                const currentOpacity = p.opacity * (0.5 + pulse * 0.5);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(167, 139, 250, ${currentOpacity})`;
                ctx.fill();

                // Glow effect for larger particles
                if (p.size > 1.2) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(167, 139, 250, ${currentOpacity * 0.1})`;
                    ctx.fill();
                }
            }

            // Draw connections between nearby particles
            if (isDesktop) {
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < 120) {
                            const lineOpacity = (1 - dist / 120) * 0.08;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(167, 139, 250, ${lineOpacity})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        };

        resize();
        createParticles();
        animationId = requestAnimationFrame(animate);

        window.addEventListener("resize", () => {
            resize();
            createParticles();
        });

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [isDesktop]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.7 }}
        />
    );
}
