"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pour chaque `.section`, anime les enfants `.reveal` (clip + fade + y)
 * au passage du viewport — même logique que la combinaison Lenis + ScrollTrigger fournie.
 */
export function SectionRevealInit() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const sections = gsap.utils.toArray<HTMLElement>(".section");

    let processSectionIndex = 0;

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const elements = section.querySelectorAll(".reveal");
        if (!elements.length) return;

        const isEditorial =
          section.dataset.revealVariant === "process" ||
          section.dataset.revealVariant === "about";
        const slideX = isEditorial
          ? processSectionIndex++ % 2 === 0
            ? -44
            : 44
          : 0;

        const fromVars = isEditorial
          ? {
              x: slideX,
              y: 52,
              opacity: 0,
              clipPath: "inset(100% 0 0 0)",
              filter: "blur(10px)",
            }
          : {
              y: 60,
              opacity: 0,
              clipPath: "inset(100% 0 0 0)",
            };

        const toVars = isEditorial
          ? {
              x: 0,
              y: 0,
              opacity: 1,
              clipPath: "inset(0% 0 0 0)",
              filter: "blur(0px)",
              duration: 1.12,
              stagger: 0.12,
              ease: "power4.out",
              immediateRender: true,
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                end: "top 28%",
                toggleActions: "play none none none",
              },
              onComplete: () => {
                gsap.set(elements, { clearProps: "filter,x" });
              },
            }
          : {
              y: 0,
              opacity: 1,
              clipPath: "inset(0% 0 0 0)",
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
              immediateRender: true,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 30%",
                toggleActions: "play none none none",
              },
            };

        gsap.fromTo(elements, fromVars, toVars);
      });
    });

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
