import React, { useEffect, useRef } from 'react';

/**
 * ParticleBackground – dimmed light-theme version.
 * Soft grey particles on a white/gray gradient background.
 */
const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let particles = [];

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);

        const createP = () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2.5 + 0.5,
            sx: (Math.random() - 0.5) * 0.3,
            sy: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.15 + 0.05,
        });

        const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
        for (let i = 0; i < count; i++) particles.push(createP());

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Particles
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 0, 0, ${p.opacity})`;
                ctx.fill();
                p.x += p.sx;
                p.y += p.sy;
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;
            });

            // Subtle connecting lines
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    if (Math.sqrt(dx * dx + dy * dy) < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed', top: 0, left: 0,
                width: '100vw', height: '100vh',
                zIndex: -1, pointerEvents: 'none',
                background: 'linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)',
            }}
        />
    );
};

export default ParticleBackground;
