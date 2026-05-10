"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SlideDoubleLabel } from "./slide-double-label";

const SCROLL_THRESHOLD = 40;

export type NavItem = { href: string; label: string };

type SiteHeaderProps = {
  nav: NavItem[];
};

function NavDoubleTextLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-block text-current outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-neutral-950/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2EFE9]"
    >
      <SlideDoubleLabel label={label} />
    </Link>
  );
}

function CtaDiscutonsLink({ scrolled }: { scrolled: boolean }) {
  return (
    <Link
      href="/#contact"
      className={`group relative inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-900 font-semibold uppercase tracking-wide text-white transition-[padding,font-size,background-color] duration-300 ease-out hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
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
  const [scrolled, setScrolled] = useState(false);

  const syncFromPixels = useCallback((y: number) => {
    setScrolled(y > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    const onLenisScroll = (e: Event) => {
      const detail = (e as CustomEvent<{ scroll: number }>).detail;
      if (detail && typeof detail.scroll === "number") {
        syncFromPixels(detail.scroll);
      }
    };

    const onWindowScroll = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      syncFromPixels(y);
    };

    window.addEventListener("lenis:scroll", onLenisScroll);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    onWindowScroll();

    return () => {
      window.removeEventListener("lenis:scroll", onLenisScroll);
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, [syncFromPixels]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[padding,background-color,box-shadow,border-color] duration-300 ease-out ${
        scrolled
          ? "border-b border-neutral-900/10 bg-[#F2EFE9]/92 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-[#F2EFE9]/80 sm:py-2.5"
          : "border-b border-transparent bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className={`font-sans font-bold tracking-tight text-neutral-950 transition-[font-size] duration-300 ease-out ${
            scrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
          }`}
        >
          RM
        </Link>

        <nav
          className={`absolute left-1/2 hidden -translate-x-1/2 font-sans font-medium uppercase tracking-[0.2em] text-neutral-900 transition-[font-size,letter-spacing] duration-300 ease-out md:flex ${
            scrolled ? "gap-8 text-[10px] tracking-[0.16em]" : "gap-10 text-xs"
          }`}
          aria-label="Navigation principale"
        >
          {nav.map((item) => (
            <NavDoubleTextLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <CtaDiscutonsLink scrolled={scrolled} />
      </div>

      <nav
        className={`mx-auto flex justify-center px-4 font-sans font-medium uppercase tracking-[0.18em] text-neutral-900 transition-[margin,gap,font-size,padding] duration-300 ease-out md:hidden ${
          scrolled
            ? "mt-2 gap-4 pb-1 text-[9px] tracking-[0.14em]"
            : "mt-4 gap-6 pb-0 text-[10px]"
        }`}
        aria-label="Navigation principale"
      >
        {nav.map((item) => (
          <NavDoubleTextLink key={item.href} href={item.href} label={item.label} />
        ))}
      </nav>
    </header>
  );
}
