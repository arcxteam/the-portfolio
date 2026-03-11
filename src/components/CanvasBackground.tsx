"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  angle: number;
  opacity: number;
  color: string;
  type: "circle" | "ring" | "cross" | "diamond";
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);

  const getColors = useCallback(() => {
    const isDark = resolvedTheme === "dark";
    return {
      dot: isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(107, 33, 168, 0.06)",
      gridLine: isDark ? "rgba(139, 92, 246, 0.04)" : "rgba(107, 33, 168, 0.03)",
      accent1: isDark ? "rgba(139, 92, 246, 0.25)" : "rgba(107, 33, 168, 0.18)",
      accent2: isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(4, 120, 87, 0.15)",
      glow1: isDark ? "rgba(139, 92, 246, 0.08)" : "rgba(107, 33, 168, 0.05)",
      glow2: isDark ? "rgba(16, 185, 129, 0.06)" : "rgba(4, 120, 87, 0.04)",
    };
  }, [resolvedTheme]);

  const initParticles = useCallback(
    (w: number, h: number) => {
      const colors = getColors();
      // Limit particles: max 6 on mobile, max 10 on desktop
      const isMobile = w < 768;
      const count = isMobile ? 4 : Math.min(Math.floor((w * h) / 200000), 10);
      const particles: Particle[] = [];
      const types: Particle["type"][] = ["circle", "ring", "cross", "diamond"];

      for (let i = 0; i < count; i++) {
        const colorChoice = Math.random() > 0.5 ? colors.accent1 : colors.accent2;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 8 + 3,
          speed: Math.random() * 0.15 + 0.03,
          angle: Math.random() * Math.PI * 2,
          opacity: Math.random() * 0.5 + 0.3,
          color: colorChoice,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
      particlesRef.current = particles;
    },
    [getColors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxOrNull = canvas.getContext("2d", { alpha: true });
    if (!ctxOrNull) return;
    const ctx = ctxOrNull;

    // Only render viewport-sized canvas (NOT full scroll height)
    let w = 0;
    let h = 0;
    const isMobile = window.innerWidth < 768;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
      w = window.innerWidth;
      h = window.innerHeight; // viewport only, not scrollHeight
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(w, h);
    };
    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener("resize", handleResize);

    // Throttled mouse tracking (skip on mobile)
    let mouseThrottle = 0;
    const handleMouse = (e: MouseEvent) => {
      const now = Date.now();
      if (now - mouseThrottle < 50) return; // 20fps max for mouse
      mouseThrottle = now;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouse, { passive: true });
    }

    // Track scroll for parallax offset
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const spacing = isMobile ? 40 : 28;
    const dotRadius = 0.8;
    let time = 0;
    let lastFrame = 0;
    const targetFPS = isMobile ? 24 : 30; // cap framerate
    const frameInterval = 1000 / targetFPS;

    function drawDotGrid() {
      if (isMobile) return; // skip dot grid on mobile entirely

      const colors = getColors();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = colors.dot;
          ctx.fill();

          // Only compute proximity if mouse is nearby (rough check)
          if (mx > -500) {
            const dx = mx - x;
            const dy = my - y;
            if (Math.abs(dx) < 200 && Math.abs(dy) < 200) {
              const dist = Math.sqrt(dx * dx + dy * dy);
              const proximity = Math.max(0, 1 - dist / 180);
              if (proximity > 0.05) {
                const r = dotRadius + proximity * 2.5;
                const alpha = 0.15 + proximity * 0.35;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle =
                  proximity > 0.5
                    ? colors.accent2.replace(/[\d.]+\)$/, alpha.toFixed(2) + ")")
                    : colors.accent1.replace(/[\d.]+\)$/, alpha.toFixed(2) + ")");
                ctx.fill();
              }
            }
          }
        }
      }
    }

    function drawGridLines() {
      const colors = getColors();
      const bigSpacing = spacing * 4;
      ctx.strokeStyle = colors.gridLine;
      ctx.lineWidth = 0.5;

      for (let x = bigSpacing; x < w; x += bigSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = bigSpacing; y < h; y += bigSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    function drawParticles() {
      const particles = particlesRef.current;
      for (const p of particles) {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.angle += (Math.random() - 0.5) * 0.02;

        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        const pulse = 0.7 + Math.sin(time * 0.5 + p.x * 0.01) * 0.3;
        ctx.globalAlpha = p.opacity * pulse;
        ctx.strokeStyle = p.color;
        ctx.fillStyle = p.color;
        ctx.lineWidth = 1.5;

        switch (p.type) {
          case "circle":
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            break;
          case "ring":
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.stroke();
            break;
          case "cross": {
            const s = p.radius;
            ctx.beginPath();
            ctx.moveTo(p.x - s, p.y);
            ctx.lineTo(p.x + s, p.y);
            ctx.moveTo(p.x, p.y - s);
            ctx.lineTo(p.x, p.y + s);
            ctx.stroke();
            break;
          }
          case "diamond": {
            const d = p.radius;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - d);
            ctx.lineTo(p.x + d, p.y);
            ctx.lineTo(p.x, p.y + d);
            ctx.lineTo(p.x - d, p.y);
            ctx.closePath();
            ctx.stroke();
            break;
          }
        }
        ctx.globalAlpha = 1;
      }
    }

    function drawGlowSpots() {
      if (isMobile) return; // skip glow on mobile

      const colors = getColors();
      const spots = [
        { x: w * 0.15, y: h * 0.2, r: 250, color: colors.glow1 },
        { x: w * 0.85, y: h * 0.3, r: 200, color: colors.glow2 },
        { x: w * 0.5, y: h * 0.7, r: 300, color: colors.glow1 },
      ];

      for (const spot of spots) {
        const offsetX = Math.sin(time * 0.3 + spot.x * 0.005) * 20;
        const offsetY = Math.cos(time * 0.2 + spot.y * 0.005) * 15;
        const gradient = ctx.createRadialGradient(
          spot.x + offsetX, spot.y + offsetY, 0,
          spot.x + offsetX, spot.y + offsetY, spot.r
        );
        gradient.addColorStop(0, spot.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(
          spot.x + offsetX - spot.r, spot.y + offsetY - spot.r,
          spot.r * 2, spot.r * 2
        );
      }
    }

    function animate(timestamp: number) {
      animRef.current = requestAnimationFrame(animate);

      // Frame rate limiter
      const elapsed = timestamp - lastFrame;
      if (elapsed < frameInterval) return;
      lastFrame = timestamp - (elapsed % frameInterval);

      time += 0.016;
      ctx.clearRect(0, 0, w, h);
      drawGlowSpots();
      drawGridLines();
      drawDotGrid();
      drawParticles();
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouse);
      }
    };
  }, [resolvedTheme, getColors, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
