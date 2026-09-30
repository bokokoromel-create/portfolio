"use client";

import {
  useLayoutEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type FitTextProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "p";
  children: ReactNode;
};

/**
 * Ajuste la taille de police pour que le texte (sur une ligne)
 * occupe exactement la largeur de son parent.
 */
export function FitText({ as: Tag = "h2", children, style, ...rest }: FitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      const parentStyle = getComputedStyle(parent);
      const available =
        parent.clientWidth -
        parseFloat(parentStyle.paddingLeft) -
        parseFloat(parentStyle.paddingRight);
      if (available <= 0) return;

      let size = parseFloat(getComputedStyle(el).fontSize) || 16;
      for (let i = 0; i < 5; i++) {
        const width = el.getBoundingClientRect().width;
        if (width <= 0) break;
        const ratio = available / width;
        if (Math.abs(ratio - 1) < 0.002) break;
        size *= ratio;
        el.style.fontSize = `${size}px`;
      }
    };

    let raf: number | null = null;
    const schedule = () => {
      if (raf == null) {
        raf = requestAnimationFrame(() => {
          raf = null;
          fit();
        });
      }
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(parent);
    fit();
    // Recalcule une fois la police d'affichage chargée.
    document.fonts?.ready.then(schedule);

    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      observer.disconnect();
      el.style.fontSize = "";
    };
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ whiteSpace: "nowrap", width: "fit-content", ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
