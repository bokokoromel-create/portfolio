"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Grand nom du footer : les lettres remontent, liées au scroll. */
export function FooterName({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(el, {
        type: "chars",
        mask: "chars",
        charsClass: "rise-word",
      });
      gsap.fromTo(
        split.chars,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "power1.out",
          stagger: { amount: 0.5 },
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <h2 ref={ref} id={id} className={className}>
      {children}
    </h2>
  );
}

/** Dégradé de marque qui monte en fondu quand le footer entre à l'écran. */
export function FooterGlow({ className }: { className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const footer = el?.parentElement;
    if (!el || !footer || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, yPercent: 40, transformOrigin: "50% 100%" });
      gsap.to(el, {
        opacity: 1,
        yPercent: 0,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: { trigger: footer, start: "20% 80%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref} className={className} aria-hidden />;
}
