"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MaskedRevealLines, MaskedRevealWords } from "./masked-reveal";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

type HomeHeroMainProps = {
  accentClassName: string;
  heroLines: string[];
  heroLineClasses: string[];
  tagline: string;
};

const EDGE_PAD = 36;
/** Distance mini (px) entre deux tampons en déplacement — effet « trail ». */
const MIN_STAMP_DISTANCE = 52;
const MAX_STAMPS = 36;
/** Texte affiché sur chaque tampon au curseur. */
const STAMP_TEXT = "Oui !";

type Stamp = {
  id: string;
  x: number;
  y: number;
  /** Rotation en degrés */
  r: number;
  /** Échelle globale du tampon */
  s: number;
};

export function HomeHeroMain({
  accentClassName,
  heroLines,
  heroLineClasses,
  tagline,
}: HomeHeroMainProps) {
  const mainRef = useRef<HTMLElement | null>(null);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const lastSpawnRef = useRef<{ x: number; y: number } | null>(null);
  const pendingRef = useRef<{ cx: number; cy: number; force: boolean } | null>(
    null,
  );
  const rafRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const sync = () => {
      reduceMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const removeStamp = useCallback((id: string) => {
    setStamps((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const maybeSpawnStamp = useCallback(
    (clientX: number, clientY: number, force: boolean) => {
      if (reduceMotionRef.current) return;

      const el = mainRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = clamp(
        clientX - rect.left,
        EDGE_PAD,
        Math.max(EDGE_PAD, rect.width - EDGE_PAD),
      );
      const y = clamp(
        clientY - rect.top,
        EDGE_PAD,
        Math.max(EDGE_PAD, rect.height - EDGE_PAD),
      );

      const last = lastSpawnRef.current;
      if (!force && last) {
        const dx = x - last.x;
        const dy = y - last.y;
        if (dx * dx + dy * dy < MIN_STAMP_DISTANCE * MIN_STAMP_DISTANCE) {
          return;
        }
      }

      lastSpawnRef.current = { x, y };

      const id = `oui-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const r = (Math.random() - 0.5) * 36;
      const s = 0.82 + Math.random() * 0.34;

      setStamps((prev) => [...prev.slice(-(MAX_STAMPS - 1)), { id, x, y, r, s }]);
    },
    [],
  );

  const flushPending = useCallback(() => {
    rafRef.current = null;
    const p = pendingRef.current;
    pendingRef.current = null;
    if (!p) return;
    maybeSpawnStamp(p.cx, p.cy, p.force);
  }, [maybeSpawnStamp]);

  const queuePointer = useCallback(
    (clientX: number, clientY: number, force: boolean) => {
      pendingRef.current = { cx: clientX, cy: clientY, force };
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        flushPending();
      });
    },
    [flushPending],
  );

  const onPointerIn = useCallback(
    (clientX: number, clientY: number) => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      pendingRef.current = null;
      lastSpawnRef.current = null;
      maybeSpawnStamp(clientX, clientY, true);
    },
    [maybeSpawnStamp],
  );

  const clearPointer = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pendingRef.current = null;
    lastSpawnRef.current = null;
    setStamps([]);
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative z-10 mx-auto flex min-h-[min(100dvh,920px)] max-w-[1600px] flex-col items-center px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-8"
    >
      <h1 className="relative z-[2] w-full cursor-default select-none px-2 py-8 text-center font-[family-name:var(--font-display)] leading-[0.82] text-neutral-950 pointer-events-none sm:py-16">
        <MaskedRevealLines
          lines={heroLines}
          lineClassNames={heroLineClasses}
          delay={0.08}
          stagger={0.14}
          duration={0.95}
        />
      </h1>

      <MaskedRevealWords
        text={tagline}
        className="relative z-[3] max-w-md cursor-default text-center font-sans text-sm leading-relaxed text-neutral-700 pointer-events-none sm:text-base"
        delay={0.52}
        stagger={0.045}
        duration={0.62}
      />

      {stamps.map(({ id, x, y, r, s }) => (
        <div
          key={id}
          className="pointer-events-none absolute z-[22]"
          style={{
            left: x,
            top: y,
            transform: `translate(-50%, -50%) rotate(${r}deg) scale(${s})`,
          }}
          aria-hidden
        >
          <span
            className={`oui-stamp-label ${accentClassName} block whitespace-nowrap text-3xl text-[#E24A2E] sm:text-5xl md:text-6xl`}
            onAnimationEnd={() => removeStamp(id)}
          >
            {STAMP_TEXT}
          </span>
        </div>
      ))}

      <div
        role="presentation"
        className="pointer-events-auto absolute inset-0 z-[30]"
        onPointerEnter={(e) => onPointerIn(e.clientX, e.clientY)}
        onPointerDown={(e) => onPointerIn(e.clientX, e.clientY)}
        onPointerMove={(e) => queuePointer(e.clientX, e.clientY, false)}
        onPointerLeave={clearPointer}
        onPointerCancel={clearPointer}
        aria-hidden
      />
    </main>
  );
}
