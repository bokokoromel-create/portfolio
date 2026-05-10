"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionRevealInit } from "./section-reveal-init";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      autoRaf: false,
    });

    const onLenisScroll = (instance: Lenis) => {
      ScrollTrigger.update();
      window.dispatchEvent(
        new CustomEvent("lenis:scroll", {
          detail: { scroll: instance.scroll },
        }),
      );
    };
    const unsubscribeLenisScroll = lenis.on("scroll", onLenisScroll);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    const onRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(t);
      unsubscribeLenisScroll();
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {children}
      <SectionRevealInit />
    </>
  );
}
