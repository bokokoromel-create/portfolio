"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SlideDoubleLabel } from "./slide-double-label";

const SCROLL_THRESHOLD = 40;

export type NavItem = { href: string; label: string };

type SiteHeaderProps = {
  nav: NavItem[];
};

function NavDoubleTextLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex min-h-[44px] items-center justify-center text-current outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-neutral-950/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2EFE9] md:min-h-0 md:inline-block ${className}`}
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
          ? "px-3 py-1.5 text-[9px] sm:px-5 sm:py-2 sm:text-xs"
          : "px-4 py-2 text-[10px] sm:px-6 sm:py-2.5 sm:text-sm"
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
          : "border-b border-transparent bg-transparent py-3 sm:py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-2 px-4 sm:gap-4 sm:px-8">
        <Link
          href="/"
          className={`shrink-0 font-sans font-bold tracking-tight text-neutral-950 transition-[font-size] duration-300 ease-out ${
            scrolled ? "text-base sm:text-xl" : "text-lg sm:text-2xl"
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
        className={`mx-auto flex w-full max-w-md flex-col items-center gap-2.5 px-4 font-sans font-medium uppercase tracking-[0.16em] text-neutral-900 transition-[margin,gap,font-size,padding] duration-300 ease-out sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2 sm:tracking-[0.18em] md:hidden ${
          scrolled
            ? "mt-2 pb-1 text-[9px] tracking-[0.12em] sm:text-[10px] sm:tracking-[0.14em]"
            : "mt-3 pb-1 text-[10px] sm:mt-4 sm:pb-0 sm:text-[10px]"
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
