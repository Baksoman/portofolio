"use client";

import { useEffect, useRef } from "react";

export function CPUBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isDark = () =>
      document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.getAttribute("data-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    type Circuit = {
      x: number;
      y: number;
      width: number;
      height: number;
      horizontal: boolean;
    };

    type Particle = {
      x: number;
      y: number;
      speed: number;
      path: Circuit;
      progress: number;
    };

    const circuits: Circuit[] = [];
    const particles: Particle[] = [];

    // Generate circuit paths
    const generateCircuits = () => {
      circuits.length = 0;
      const cols = Math.floor(canvas.width / 120);
      const rows = Math.floor(canvas.height / 120);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > 0.3) {
            const x = i * 120 + 40;
            const y = j * 120 + 40;
            const horizontal = Math.random() > 0.5;
            const length = Math.random() * 80 + 40;

            circuits.push({
              x,
              y,
              width: horizontal ? length : 2,
              height: horizontal ? 2 : length,
              horizontal,
            });
          }
        }
      }

      // Add connections
      for (let i = 0; i < 20; i++) {
        circuits.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          width: Math.random() > 0.5 ? Math.random() * 100 + 50 : 2,
          height: Math.random() > 0.5 ? 2 : Math.random() * 100 + 50,
          horizontal: Math.random() > 0.5,
        });
      }
    };

    // Generate particles
    const generateParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 40; i++) {
        const path = circuits[Math.floor(Math.random() * circuits.length)];
        particles.push({
          x: path.x,
          y: path.y,
          speed: Math.random() * 0.5 + 0.3,
          path,
          progress: Math.random(),
        });
      }
    };

    generateCircuits();
    generateParticles();

    const getColors = () => {
      const dark = isDark();
      return {
        bg: dark ? "#0f1217" : "#d8dede",
        circuit: dark ? "rgba(46, 184, 184, 0.15)" : "rgba(76, 122, 140, 0.15)",
        particle: dark ? "#2eb8b8" : "#4c7a8c",
        glow: dark ? "rgba(46, 184, 184, 0.4)" : "rgba(76, 122, 140, 0.3)",
        node: dark ? "#f5d1a6" : "#4c3e3e",
      };
    };

    let animationId: number;

    const animate = () => {
      const colors = getColors();
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw circuits
      ctx.strokeStyle = colors.circuit;
      ctx.lineWidth = 2;
      circuits.forEach((c) => {
        ctx.strokeRect(c.x, c.y, c.width, c.height);
      });

      // Draw and update particles
      particles.forEach((p) => {
        p.progress += p.speed * 0.01;
        
        if (p.progress >= 1) {
          p.progress = 0;
          p.path = circuits[Math.floor(Math.random() * circuits.length)];
        }

        if (p.path.horizontal) {
          p.x = p.path.x + p.path.width * p.progress;
          p.y = p.path.y;
        } else {
          p.x = p.path.x;
          p.y = p.path.y + p.path.height * p.progress;
        }

        // Draw glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 15);
        gradient.addColorStop(0, colors.glow);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(p.x - 15, p.y - 15, 30, 30);

        // Draw particle
        ctx.fillStyle = colors.particle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw trail
        ctx.strokeStyle = colors.particle;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        if (p.path.horizontal) {
          ctx.moveTo(p.x - 20, p.y);
          ctx.lineTo(p.x, p.y);
        } else {
          ctx.moveTo(p.x, p.y - 20);
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw nodes at intersections
      ctx.fillStyle = colors.node;
      for (let i = 0; i < circuits.length; i++) {
        const c1 = circuits[i];
        ctx.beginPath();
        ctx.arc(c1.x, c1.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
