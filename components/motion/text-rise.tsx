"use client";

import {
  useLayoutEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type TextRiseTag = "h1" | "h2" | "h3" | "p" | "div" | "span";

type TextRiseProps = HTMLAttributes<HTMLElement> & {
  as?: TextRiseTag;
  children: ReactNode;
  /** Déclenchement ScrollTrigger ; `false` = joue au montage. */
  start?: string | false;
  stagger?: number;
  delay?: number;
  duration?: number;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Découpe le texte en mots masqués et les fait monter au passage du viewport
 * (effet « rise » : yPercent 150 → 0, un mot après l'autre).
 */
export function TextRise({
  as: Tag = "div",
  children,
  start = "top 85%",
  stagger = 0.05,
  delay = 0,
  duration = 0.7,
  ...rest
}: TextRiseProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.setAttribute("data-text-ready", "");
      return;
    }

    const ctx = gsap.context(() => {
      const split = SplitText.create(el, {
        type: "words",
        mask: "words",
        wordsClass: "rise-word",
      });

      gsap.set(split.words, { yPercent: 150 });
      el.setAttribute("data-text-ready", "");

      gsap.to(split.words, {
        yPercent: 0,
        duration,
        ease: "power3.out",
        stagger,
        delay,
        scrollTrigger: start
          ? { trigger: el, start, once: true }
          : undefined,
      });
    }, el);

    return () => {
      ctx.revert();
      el.removeAttribute("data-text-ready");
    };
  }, [start, stagger, delay, duration]);

  return (
    <Tag ref={ref as never} data-text-rise="" {...rest}>
      {children}
    </Tag>
  );
}
