"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SiteLogo } from "./site-logo";
import { SlideDoubleLabel } from "./slide-double-label";

const SCROLL_THRESHOLD = 40;
/** Au-delà de cette fraction du viewport, le header se cache en descendant. */
const HIDE_AFTER_VIEWPORT = 0.1;
/** Déplacement minimal (px) pour considérer un changement de direction. */
const DIRECTION_TOLERANCE = 4;

export type NavItem = { href: string; label: string };

type SiteHeaderProps = {
  nav: NavItem[];
};

/** Enveloppe masquée : l'élément remonte depuis le bas à l'entrée de page. */
function Rise({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex" data-nav-rise-mask>
      <span className="inline-flex" data-nav-rise>
        {children}
      </span>
    </span>
  );
}

function NavDoubleTextLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-block text-current outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-current/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <SlideDoubleLabel label={label} />
    </Link>
  );
}

function CtaDiscutonsLink({
  scrolled,
  dark,
}: {
  scrolled: boolean;
  dark: boolean;
}) {
  return (
    <Link
      href="/#contact"
      className={`group relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold uppercase tracking-wide transition-[padding,font-size,background-color,color] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
        dark
          ? "bg-white text-neutral-950 hover:bg-neutral-200"
          : "bg-neutral-900 text-white hover:bg-neutral-800"
      } ${
        scrolled
          ? "px-4 py-2 text-[10px] sm:px-5 sm:text-xs"
          : "px-5 py-2.5 text-xs sm:px-6 sm:text-sm"
      }`}
    >
      <SlideDoubleLabel label="Discutons" lineClassName="items-center justify-center" />
    </Link>
  );
}

export function SiteHeader({ nav }: SiteHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf: number | null = null;

    const update = () => {
      raf = null;
      const y = Math.max(window.scrollY, 0);
      setScrolled(y > SCROLL_THRESHOLD);

      if (y < window.innerHeight * HIDE_AFTER_VIEWPORT) {
        setHidden(false);
      } else if (y > lastY + DIRECTION_TOLERANCE) {
        const focusInside = headerRef.current?.contains(document.activeElement);
        if (!focusInside) setHidden(true);
      } else if (y < lastY - DIRECTION_TOLERANCE) {
        setHidden(false);
      }
      if (Math.abs(y - lastY) > DIRECTION_TOLERANCE) lastY = y;

      // Thème sombre quand le milieu du header survole une section sombre.
      const header = headerRef.current;
      const probe = header ? header.offsetHeight / 2 : 32;
      const overDark = Array.from(
        document.querySelectorAll<HTMLElement>('[data-theme-section="dark"]'),
      ).some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probe && rect.bottom >= probe;
      });
      setDark(overDark);
    };

    const schedule = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };

    window.addEventListener("lenis:scroll", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      window.removeEventListener("lenis:scroll", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const masks = header.querySelectorAll<HTMLElement>("[data-nav-rise-mask]");
    const items = header.querySelectorAll<HTMLElement>("[data-nav-rise]");
    masks.forEach((mask) => (mask.style.overflow = "hidden"));

    const tween = gsap.fromTo(
      items,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.075,
        delay: 0.1,
        clearProps: "transform",
        onComplete: () => {
          // Libère le masque pour ne pas rogner les anneaux de focus.
          masks.forEach((mask) => (mask.style.overflow = ""));
        },
      },
    );

    return () => {
      tween.kill();
      gsap.set(items, { clearProps: "transform" });
      masks.forEach((mask) => (mask.style.overflow = ""));
    };
  }, []);

  const textTone = dark ? "text-white" : "text-neutral-900";

  return (
    <header
      ref={headerRef}
      onFocusCapture={() => setHidden(false)}
      className={`sticky top-0 z-50 transition-[padding,background-color,box-shadow,border-color,transform] duration-[450ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? dark
            ? "border-b border-white/10 bg-neutral-950/80 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md sm:py-2.5"
            : "border-b border-neutral-900/10 bg-[#F2EFE9]/92 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-[#F2EFE9]/80 sm:py-2.5"
          : "border-b border-transparent bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-8">
        <Rise>
          <SiteLogo
            priority
            switchable
            tone={dark ? "light" : "dark"}
            className={`w-auto object-contain object-left transition-[height] duration-300 ease-out ${
              scrolled ? "h-7 sm:h-8" : "h-8 sm:h-9"
            }`}
          />
        </Rise>

        <nav
          className={`absolute left-1/2 hidden -translate-x-1/2 font-sans font-medium uppercase tracking-[0.2em] transition-[font-size,letter-spacing,color] duration-300 ease-out md:flex ${textTone} ${
            scrolled ? "gap-8 text-[10px] tracking-[0.16em]" : "gap-10 text-xs"
          }`}
          aria-label="Navigation principale"
        >
          {nav.map((item) => (
            <Rise key={item.href}>
              <NavDoubleTextLink href={item.href} label={item.label} />
            </Rise>
          ))}
        </nav>

        <Rise>
          <CtaDiscutonsLink scrolled={scrolled} dark={dark} />
        </Rise>
      </div>

      <nav
        className={`mx-auto flex justify-center px-4 font-sans font-medium uppercase tracking-[0.18em] transition-[margin,gap,font-size,padding,color] duration-300 ease-out md:hidden ${textTone} ${
          scrolled
            ? "mt-2 gap-4 pb-1 text-[9px] tracking-[0.14em]"
            : "mt-4 gap-6 pb-0 text-[10px]"
        }`}
        aria-label="Navigation principale"
      >
        {nav.map((item) => (
          <Rise key={item.href}>
            <NavDoubleTextLink href={item.href} label={item.label} />
          </Rise>
        ))}
      </nav>
    </header>
  );
}
