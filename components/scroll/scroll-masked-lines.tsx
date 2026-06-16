"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ScrollMaskedLine =
  | string
  | {
      key: string;
      content: ReactNode;
    };

type ScrollMaskedLinesProps = {
  lines: ScrollMaskedLine[];
  lineClassName?: string;
  lineClassNames?: string[];
  className?: string;
  stagger?: number;
  duration?: number;
  /** Déclenchement ScrollTrigger (ex. `top 82%`). */
  scrollStart?: string;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function normalizeLines(lines: ScrollMaskedLine[]) {
  return lines.map((line, i) =>
    typeof line === "string"
      ? { key: `line-${i}`, content: line }
      : line,
  );
}

/**
 * Révèle des lignes (masque vertical) au scroll — même principe que le hero, déclenché par ScrollTrigger.
 */
export function ScrollMaskedLines({
  lines,
  lineClassName = "",
  lineClassNames,
  className = "",
  stagger = 0.14,
  duration = 0.95,
  scrollStart = "top 82%",
}: ScrollMaskedLinesProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const normalizedLines = normalizeLines(lines);

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
        scrollTrigger: {
          trigger: root,
          start: scrollStart,
          toggleActions: "play none none none",
        },
        onComplete: () => {
          gsap.set(inners, { clearProps: "willChange" });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [normalizedLines.length, stagger, duration, scrollStart]);

  return (
    <div ref={rootRef} className={className}>
      {normalizedLines.map(({ key, content }, i) => (
        <div key={key} className="overflow-hidden">
          <div
            data-mask-inner
            className={lineClassNames?.[i] ?? lineClassName}
            style={{ willChange: "transform" }}
          >
            {content}
          </div>
        </div>
      ))}
    </div>
  );
}
