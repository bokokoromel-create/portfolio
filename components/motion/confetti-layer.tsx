"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#E24A2E", "#0a0a0a", "#F5C84B", "#ffffff", "#F2A48F"];
const COUNT = 70;
const GRAVITY = 0.32;
const DRAG = 0.985;
const LIFETIME = 2200;

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  w: number;
  h: number;
  color: string;
  born: number;
};

/**
 * Canvas plein écran : un clic sur un élément `[data-confetti]`
 * (les « oui » accentués) déclenche une salve de confettis.
 */
export function ConfettiLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let pieces: Piece[] = [];
    let raf: number | null = null;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();

    const tick = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      pieces = pieces.filter((p) => now - p.born < LIFETIME);
      for (const p of pieces) {
        p.vx *= DRAG;
        p.vy = p.vy * DRAG + GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        const life = (now - p.born) / LIFETIME;
        ctx.save();
        ctx.globalAlpha = life > 0.75 ? (1 - life) / 0.25 : 1;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        // Aplatissement périodique = effet de papier qui tourne.
        ctx.scale(1, Math.cos(p.rot * 1.7));
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      raf = pieces.length ? requestAnimationFrame(tick) : null;
    };

    const burst = (x: number, y: number) => {
      const now = performance.now();
      for (let i = 0; i < COUNT; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
        const speed = 7 + Math.random() * 9;
        pieces.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.35,
          w: 6 + Math.random() * 6,
          h: 9 + Math.random() * 8,
          color: COLORS[i % COLORS.length],
          born: now,
        });
      }
      if (raf == null) raf = requestAnimationFrame(tick);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest("[data-confetti]")) {
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      burst(event.clientX, event.clientY);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[300] h-full w-full"
      aria-hidden
    />
  );
}
