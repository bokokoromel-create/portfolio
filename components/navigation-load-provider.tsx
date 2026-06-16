"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const MIN_VISIBLE_MS = 400;

function isSamePageNavigation(href: string) {
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return true;
  }

  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return false;

    const current = `${window.location.pathname}${window.location.search}`;
    const next = `${url.pathname}${url.search}`;
    return current === next;
  } catch {
    return true;
  }
}

function PageLoadScreen({ visible }: { visible: boolean }) {
  const ringSize = 88;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-[400ms] ease-out ${
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
      aria-busy={visible}
      aria-live="polite"
    >
      <div className="relative flex h-[88px] w-[88px] items-center justify-center sm:h-[104px] sm:w-[104px]">
        <svg
          className={`absolute inset-0 h-full w-full ${visible ? "animate-load-ring-spin" : ""}`}
          viewBox={`0 0 ${ringSize} ${ringSize}`}
          aria-hidden
        >
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="2"
          />
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.24} ${circumference * 0.76}`}
          />
        </svg>
        <Image
          src="/rm3.png"
          alt="Chargement"
          width={96}
          height={48}
          priority
          className="relative z-10 h-10 w-auto object-contain sm:h-12"
        />
      </div>
    </div>
  );
}

export function NavigationLoadProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isFirstPathRef = useRef(true);
  const shownAtRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoading = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    shownAtRef.current = Date.now();
    setIsLoading(true);
  }, []);

  const finishLoading = useCallback(() => {
    const elapsed = Date.now() - shownAtRef.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

    hideTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      hideTimerRef.current = null;
    }, remaining);
  }, []);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || isSamePageNavigation(href)) return;

      startLoading();
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, [startLoading]);

  useEffect(() => {
    if (isFirstPathRef.current) {
      isFirstPathRef.current = false;
      return;
    }

    finishLoading();
  }, [pathname, finishLoading]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  return (
    <>
      <PageLoadScreen visible={isLoading} />
      {children}
    </>
  );
}
