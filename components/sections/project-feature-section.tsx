"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { portfolioProjects, type PortfolioProject } from "@/lib/projects";
import { useMediaQuery } from "../motion/use-media-query";

gsap.registerPlugin(ScrollTrigger, SplitText);

type ProjectFeatureSectionProps = {
  accentClassName: string;
};

/** Fils suspendus au-dessus de chaque visuel : [x, longueur] dans un viewBox 360×200. */
const STRINGS: [number, number][][] = [
  [
    [36, 150],
    [112, 70],
    [190, 128],
    [268, 46],
    [330, 184],
  ],
  [
    [44, 96],
    [150, 176],
    [236, 60],
    [318, 138],
  ],
];

/** Vitesse de chute du visuel, en fraction de la hauteur de la figure. */
const FALL_DEPTH = [0.08, 0.11, 0.06];

/** Décalages d'entrée : titre, numéro, description, bouton. */
const PART_OFFSETS = [0, 0.1, 0.2, 0.4];

function isExternal(href: string) {
  return href.startsWith("http");
}

function ProjectLink({ project }: { project: PortfolioProject }) {
  return (
    <Link
      href={project.href}
      {...(isExternal(project.href)
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="inline-block border border-white bg-white px-6 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-950 transition-colors hover:bg-transparent hover:text-white sm:px-7 sm:py-3 sm:text-[11px]"
    >
      Voir le projet
    </Link>
  );
}

function Eyebrow({ accentClassName }: { accentClassName: string }) {
  return (
    <h2
      id="portfolio-feature-heading"
      className="mx-auto max-w-xl px-4 text-center font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.24em] text-white/90 sm:text-xs sm:tracking-[0.28em]"
    >
      À quoi ressemble le fait de dire{" "}
      <span
        data-confetti
        className={`${accentClassName} pointer-events-auto text-base tracking-normal text-[#E24A2E] sm:text-xl`}
      >
        « oui ! »
      </span>
    </h2>
  );
}

function HangingStrings({ index }: { index: number }) {
  const strings = STRINGS[index % STRINGS.length];
  return (
    <svg
      viewBox="0 0 360 200"
      width="100%"
      fill="none"
      aria-hidden
      className="block"
    >
      {strings.map(([x, length]) => (
        <path
          key={x}
          d={`M${x} ${200 - length}V200`}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/** Version statique (sans JS, ou mouvement réduit) : liste verticale. */
function ProjectList({ accentClassName }: { accentClassName: string }) {
  return (
    <div className="section px-4 py-16 sm:px-10 sm:py-24 md:py-28">
      <div className="reveal mb-12 sm:mb-16">
        <Eyebrow accentClassName={accentClassName} />
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-20 sm:gap-28">
        {portfolioProjects.map((project) => (
          <article
            key={project.num}
            className="reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-10"
          >
            <Image
              src={project.images[0].src}
              alt={project.images[0].alt}
              width={project.images[0].width ?? 1600}
              height={project.images[0].height ?? 900}
              sizes="(max-width: 1024px) 90vw, 480px"
              className="mx-auto h-auto w-full max-w-[480px] object-contain"
            />
            <div className="text-center lg:text-left">
              <p className={`${accentClassName} mb-2 text-2xl text-[#E24A2E]`} aria-hidden>
                ({project.num})
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.9] tracking-tight">
                {project.title}
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-white/85">
                {project.description}
              </p>
              <div className="mt-8">
                <ProjectLink project={project} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/**
 * Scène au scroll : panneau central collant dont le contenu change selon le
 * projet traversé, visuels suspendus qui « tombent » en parallaxe.
 */
function ProjectScene({ accentClassName }: { accentClassName: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rangeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef<number | null>(null);
  const partsRef = useRef<Element[][][]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const showProject = useCallback((next: number | null) => {
    const prev = activeRef.current;
    if (next === prev) return;
    activeRef.current = next;

    const panels = panelRefs.current;
    const parts = partsRef.current;
    timelineRef.current?.kill();
    const tl = gsap.timeline();
    timelineRef.current = tl;

    panels.forEach((panel, i) => {
      if (!panel) return;
      panel.toggleAttribute("data-active", i === next);
      if (i !== prev && i !== next) gsap.set(panel, { opacity: 0 });
    });

    if (prev != null && panels[prev]) {
      tl.to(parts[prev].flat(), {
        yPercent: -110,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      }, 0);
      tl.set(panels[prev], { opacity: 0 }, 0.35);
    }

    if (next == null || !panels[next]) return;
    const at = prev == null ? 0 : 0.35;
    tl.set(panels[next], { opacity: 1 }, at);
    parts[next].forEach((group, i) => {
      tl.fromTo(
        group,
        { yPercent: 150, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          ease: i < 2 ? "back.out(1.7)" : "power2.out",
        },
        at + PART_OFFSETS[i],
      );
    });
  }, []);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const ctx = gsap.context(() => {
      partsRef.current = panelRefs.current.map((panel) => {
        if (!panel) return [];
        const title = panel.querySelector('[data-part="title"]');
        const split = title
          ? SplitText.create(title, { type: "words", mask: "words", wordsClass: "rise-word" })
          : null;
        gsap.set(panel, { opacity: 0 });
        return [
          split?.words ?? [],
          Array.from(panel.querySelectorAll('[data-part="accent"]')),
          Array.from(panel.querySelectorAll('[data-part="description"]')),
          Array.from(panel.querySelectorAll('[data-part="button"]')),
        ];
      });

      const update = () => {
        const ranges = rangeRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!ranges.length) return;
        const mid = window.innerHeight / 2;
        if (ranges[0].getBoundingClientRect().top > mid) {
          showProject(null);
          return;
        }
        const index = ranges.findIndex(
          (range) => range.getBoundingClientRect().bottom > mid,
        );
        showProject(index < 0 ? ranges.length - 1 : index);
      };

      ScrollTrigger.create({
        trigger: scene,
        start: "top bottom",
        end: "bottom top",
        onUpdate: update,
        onRefresh: update,
      });

      scene.querySelectorAll<HTMLElement>("[data-figure]").forEach((figure, i) => {
        const vector = figure.querySelector("[data-vector]");
        const media = figure.querySelector("[data-falling-image]");
        if (!vector || !media) return;
        const depth = FALL_DEPTH[i % FALL_DEPTH.length];

        gsap
          .timeline({
            scrollTrigger: {
              trigger: vector,
              start: "top bottom",
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(vector, { y: 0 }, { y: () => figure.offsetHeight * 0.25, ease: "none" }, 0)
          .fromTo(media, { y: 0 }, { y: () => figure.offsetHeight * depth, ease: "none" }, 0);
      });

      update();
    }, scene);

    // La hauteur de la scène diffère de la liste statique rendue côté serveur.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      timelineRef.current?.kill();
      activeRef.current = null;
      ctx.revert();
    };
  }, [showProject]);

  /** Au clavier : amène le projet ciblé dans la zone active. */
  const focusProject = (index: number) => {
    const range = rangeRefs.current[index];
    if (!range || activeRef.current === index) return;
    const rect = range.getBoundingClientRect();
    const top = rect.top + window.scrollY + rect.height * 0.3 - window.innerHeight / 2;
    window.scrollTo({ top, behavior: "instant" });
    showProject(index);
  };

  return (
    <div ref={sceneRef} className="relative">
      <div className="pointer-events-none sticky top-0 z-10 flex h-svh flex-col items-center justify-center px-4">
        <div className="mb-8 sm:mb-10">
          <Eyebrow accentClassName={accentClassName} />
        </div>
        <div className="grid w-full max-w-5xl">
          {portfolioProjects.map((project, index) => (
            <div
              key={project.num}
              ref={(el) => {
                panelRefs.current[index] = el;
              }}
              className="col-start-1 row-start-1 flex flex-col items-center text-center [&[data-active]]:pointer-events-auto"
              onFocus={() => focusProject(index)}
            >
              <div className="relative max-w-full">
                <h3
                  data-part="title"
                  className="text-balance font-[family-name:var(--font-display)] text-[clamp(3.25rem,12vw,9.5rem)] uppercase leading-[0.9] tracking-tight"
                >
                  {project.title}
                </h3>
                <span
                  data-part="accent"
                  className={`${accentClassName} absolute right-0 top-0 translate-x-[70%] -translate-y-1/2 text-3xl text-[#E24A2E] sm:text-5xl`}
                  aria-hidden
                >
                  ({project.num})
                </span>
              </div>
              <div className="mt-4 overflow-hidden sm:mt-5">
                <p
                  data-part="description"
                  className="mx-auto max-w-xl font-sans text-xs uppercase leading-relaxed tracking-wide text-white sm:text-sm"
                >
                  {project.description}
                </p>
              </div>
              <div className="mt-7 overflow-hidden p-1 sm:mt-9">
                <div data-part="button">
                  <ProjectLink project={project} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none relative z-20 -mt-[100svh]" aria-hidden>
        {portfolioProjects.map((project, index) => {
          const image = project.images[0];
          const isLeft = index % 2 === 0;
          return (
            <div
              key={project.num}
              ref={(el) => {
                rangeRefs.current[index] = el;
              }}
              className="relative h-[150svh] sm:h-[180svh]"
            >
              <figure
                data-figure
                className={`absolute top-[38%] w-[min(64vw,320px)] sm:w-[36vw] lg:w-[30vw] ${
                  isLeft ? "left-[3vw] sm:left-[4vw]" : "right-[3vw] sm:right-[4vw]"
                }`}
              >
                <div data-vector className="relative z-[1] mb-[6%] px-[12%] text-white">
                  <HangingStrings index={index} />
                </div>
                <div data-falling-image>
                  <Image
                    src={image.src}
                    alt=""
                    width={image.width ?? 1600}
                    height={image.height ?? 900}
                    sizes="(max-width: 640px) 64vw, (max-width: 1024px) 36vw, 30vw"
                    className="h-auto w-full object-contain"
                  />
                </div>
              </figure>
            </div>
          );
        })}
        <div className="h-[40svh]" />
      </div>
    </div>
  );
}

export function ProjectFeatureSection({ accentClassName }: ProjectFeatureSectionProps) {
  const enhanced = useMediaQuery("(prefers-reduced-motion: no-preference)");

  return (
    <section
      id="portfolio"
      data-theme-section="dark"
      className="relative bg-neutral-950 text-white"
      aria-labelledby="portfolio-feature-heading"
    >
      {enhanced ? (
        <ProjectScene accentClassName={accentClassName} />
      ) : (
        <ProjectList accentClassName={accentClassName} />
      )}
    </section>
  );
}
