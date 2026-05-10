"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type MotionPrefs = {
  delay?: number;
  stagger?: number;
  duration?: number;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MaskedRevealLines({
  lines,
  lineClassName = "",
  lineClassNames,
  className = "",
  delay = 0.12,
  stagger = 0.14,
  duration = 0.95,
}: MotionPrefs & {
  lines: string[];
  lineClassName?: string;
  /** Si fourni, une classe par ligne (prioritaire sur `lineClassName`). */
  lineClassNames?: string[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const inners = root.querySelectorAll<HTMLElement>("[data-mask-inner]");
    if (!inners.length) return;

    if (prefersReducedMotion()) {
      gsap.set(inners, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 100 });
      gsap.to(inners, {
        yPercent: 0,
        duration,
        ease: "power4.out",
        stagger,
        delay,
      });
    }, root);

    return () => ctx.revert();
  }, [lines.join("\u0001"), delay, stagger, duration]);

  return (
    <div ref={rootRef} className={className}>
      {lines.map((line, i) => (
        <div key={`${line}-${i}`} className="overflow-hidden">
          <div
            data-mask-inner
            className={lineClassNames?.[i] ?? lineClassName}
            style={{ willChange: "transform" }}
          >
            {line}
          </div>
        </div>
      ))}
    </div>
  );
}

export function MaskedRevealWords({
  text,
  className = "",
  wordClassName = "",
  delay = 0.55,
  stagger = 0.06,
  duration = 0.75,
}: MotionPrefs & {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  const rootRef = useRef<HTMLParagraphElement>(null);
  const words = text.trim().split(/\s+/);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const inners = root.querySelectorAll<HTMLElement>("[data-mask-inner]");
    if (!inners.length) return;

    if (prefersReducedMotion()) {
      gsap.set(inners, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 100 });
      gsap.to(inners, {
        yPercent: 0,
        duration,
        ease: "power3.out",
        stagger,
        delay,
      });
    }, root);

    return () => ctx.revert();
  }, [text, delay, stagger, duration]);

  return (
    <p ref={rootRef} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.3em] inline-block overflow-hidden align-top last:mr-0"
        >
          <span
            data-mask-inner
            className={`inline-block ${wordClassName}`}
            style={{ willChange: "transform" }}
          >
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}

export function MaskedRevealChars({
  text,
  className = "",
  charWrapClassName = "inline-block overflow-hidden align-top",
  charInnerClassName = "inline-block",
  delay = 0.05,
  stagger = 0.035,
  duration = 0.55,
  /**
   * `undefined` : animation au montage (comportement par défaut).
   * `boolean` : masque tant que `false`, révèle au passage à `true` (ex. survol).
   */
  active,
}: MotionPrefs & {
  text: string;
  className?: string;
  charWrapClassName?: string;
  charInnerClassName?: string;
  active?: boolean;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const chars = Array.from(text);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const inners = root.querySelectorAll<HTMLElement>("[data-mask-inner]");
    if (!inners.length) return;

    if (prefersReducedMotion()) {
      if (active === undefined) {
        gsap.set(inners, { yPercent: 0 });
      } else {
        gsap.set(inners, {
          yPercent: 0,
          opacity: active ? 1 : 0,
        });
      }
      return;
    }

    if (active === undefined) {
      const ctx = gsap.context(() => {
        gsap.set(inners, { yPercent: 100 });
        gsap.to(inners, {
          yPercent: 0,
          duration,
          ease: "power3.out",
          stagger,
          delay,
        });
      }, root);
      return () => ctx.revert();
    }

    gsap.killTweensOf(inners);

    if (!active) {
      gsap.set(inners, { yPercent: 100 });
      return;
    }

    gsap.fromTo(
      inners,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration,
        ease: "power3.out",
        stagger,
        delay,
      },
    );
  }, [active, text, delay, stagger, duration]);

  return (
    <span ref={rootRef} className={className}>
      {chars.map((char, i) => (
        <span key={`${i}-${char}`} className={charWrapClassName}>
          <span
            data-mask-inner
            className={charInnerClassName}
            style={{ willChange: "transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}
