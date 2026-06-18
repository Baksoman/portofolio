"use client";

import { useEffect, useRef } from "react";

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fontSize = 16;
    const chars =
      "アァカサタナハマヤラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨロヲゴゾドボポヴッン0123456789";

    let w = 0;
    let h = 0;
    let cols = 0;
    let drops: number[] = [];

    const isDark = () =>
      document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.getAttribute("data-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    const palette = () =>
      isDark()
        ? { bg: [10, 14, 21], fade: 0.08, glyph: "#3fe8b0", highlight: "#eafff5" }
        : { bg: [221, 227, 226], fade: 0.12, glyph: "#2f7a6e", highlight: "#163b34" };

    const fillBg = () => {
      const [r, g, b] = palette().bg;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, 0, w, h);
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * (-h / fontSize));
      fillBg();
    };
    resize();
    window.addEventListener("resize", resize);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const draw = () => {
      const colors = palette();
      const [r, g, b] = colors.bg;
      ctx.fillStyle = `rgba(${r},${g},${b},${colors.fade})`;
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (y >= -fontSize && y < h) {
          const isLead = Math.random() > 0.92;
          ctx.globalAlpha = isLead ? 1 : 0.65 + Math.random() * 0.25;
          ctx.fillStyle = isLead ? colors.highlight : colors.glyph;
          ctx.fillText(char, x, y);
          ctx.globalAlpha = 1;
        }

        drops[i]++;
        if (y > h && Math.random() > 0.975) {
          drops[i] = Math.random() * -40;
        }
      }

      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}