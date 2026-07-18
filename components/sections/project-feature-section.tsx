"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { portfolioProjects, type PortfolioProject } from "@/lib/projects";

type ProjectFeatureSectionProps = {
  accentClassName: string;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ProjectImageStrip({
  images,
  priority = false,
}: {
  images: PortfolioProject["images"];
  priority?: boolean;
}) {
  const isSingle = images.length === 1;

  return (
    <div
      className={
        isSingle
          ? "w-full"
          : "flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 sm:gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      }
      aria-label="Aperçus du projet"
    >
      {images.map((image, imageIndex) => (
        <figure
          key={image.src}
          className={
            isSingle
              ? "mx-auto w-full max-w-[min(100%,360px)] sm:max-w-[min(100%,420px)] lg:mx-0 lg:max-w-[min(100%,480px)]"
              : "relative w-[min(72vw,300px)] shrink-0 snap-center sm:w-[min(42vw,380px)]"
          }
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 1600}
            height={image.height ?? 900}
            priority={priority && imageIndex === 0}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 480px"
            className="h-auto max-h-[min(48vw,240px)] w-full object-contain sm:max-h-[300px] lg:max-h-[340px]"
          />
        </figure>
      ))}
    </div>
  );
}

function ProjectSlide({
  project,
  index,
  accentClassName,
  isActive,
}: {
  project: PortfolioProject;
  index: number;
  accentClassName: string;
  isActive: boolean;
}) {
  return (
    <article
      className="w-full shrink-0 px-4 sm:px-8"
      aria-hidden={!isActive}
      id={`portfolio-project-${project.num}`}
    >
      <div className="mx-auto grid max-w-5xl items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
        <ProjectImageStrip images={project.images} priority={index === 0} />

        <div className="text-center lg:text-left">
          <p
            className={`${accentClassName} mb-2 text-lg text-[#E24A2E] sm:mb-3 sm:text-2xl`}
            aria-hidden
          >
            ({project.num})
          </p>
          {index === 0 ? (
            <h2
              id="portfolio-feature-heading"
              className="text-balance font-[family-name:var(--font-display)] text-[clamp(2rem,7.5vw,4.25rem)] font-black uppercase leading-[0.92] tracking-tight"
            >
              {project.title}
            </h2>
          ) : (
            <h3 className="text-balance font-[family-name:var(--font-display)] text-[clamp(1.65rem,6vw,3.5rem)] font-black uppercase leading-[0.92] tracking-tight">
              {project.title}
            </h3>
          )}
          <p className="mt-4 font-sans text-sm leading-relaxed text-white/85 sm:mt-5">
            {project.description}
          </p>
          <Link
            href={project.href}
            {...(project.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="mt-6 inline-block border border-white bg-white px-6 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-950 transition-colors hover:bg-transparent hover:text-white sm:mt-8 sm:px-7 sm:py-3 sm:text-[11px]"
          >
            Voir le projet
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProjectFeatureSection({ accentClassName }: ProjectFeatureSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);

  const projectCount = portfolioProjects.length;

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(projectCount - 1, index));
      setActiveIndex(next);
    },
    [projectCount],
  );

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const x = -activeIndex * container.offsetWidth;
    const reduced = prefersReducedMotion();

    if (reduced) {
      gsap.set(track, { x });
      return;
    }

    gsap.to(track, {
      x,
      duration: 0.9,
      ease: "power3.inOut",
    });
  }, [activeIndex]);

  useEffect(() => {
    const onResize = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;
      gsap.set(track, { x: -activeIndex * container.offsetWidth });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? 0;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const delta = touchStartX.current - endX;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) goTo(activeIndex + 1);
    else goTo(activeIndex - 1);
  };

  return (
    <section
      id="portfolio"
      className="section relative overflow-hidden bg-neutral-950 py-16 text-white sm:py-24 md:py-28"
      aria-labelledby="portfolio-feature-heading"
    >
      <p className="reveal mx-auto mb-8 max-w-xl px-4 text-center font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.24em] text-white/90 sm:mb-12 sm:px-10 sm:text-xs sm:tracking-[0.28em]">
        À quoi ressemble le fait de dire{" "}
        <span className={`${accentClassName} text-base tracking-normal text-[#E24A2E] sm:text-xl`}>
          « oui ! »
        </span>
      </p>

      <div
        ref={containerRef}
        className="relative touch-pan-x"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div ref={trackRef} className="flex will-change-transform">
          {portfolioProjects.map((project, index) => (
            <ProjectSlide
              key={project.num}
              project={project}
              index={index}
              accentClassName={accentClassName}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      </div>

      <nav
        className="reveal mx-auto mt-8 flex max-w-md items-center justify-center gap-5 px-4 sm:mt-12 sm:gap-8 sm:px-5"
        aria-label="Navigation des projets"
      >
        {portfolioProjects.map((project, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={project.num}
              type="button"
              onClick={() => goTo(index)}
              aria-current={isActive ? "true" : undefined}
              aria-controls={`portfolio-project-${project.num}`}
              className={`group relative min-h-11 min-w-11 font-sans text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${
                isActive ? "text-white" : "text-white/35 hover:text-white/65"
              }`}
            >
              <span
                className={`${accentClassName} text-lg sm:text-xl ${
                  isActive ? "text-[#E24A2E]" : "text-white/40 group-hover:text-white/70"
                }`}
              >
                ({project.num})
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mx-auto mt-4 flex max-w-xs items-center gap-3 px-4 sm:mt-5 sm:px-5">
        <div className="h-px flex-1 overflow-hidden bg-white/15">
          <div
            className="h-full origin-left bg-[#E24A2E] transition-transform duration-500 ease-out"
            style={{
              transform: `scaleX(${projectCount > 1 ? activeIndex / (projectCount - 1) : 1})`,
            }}
          />
        </div>
      </div>

      <p
        className={`${accentClassName} mt-3 px-4 text-center text-[11px] text-white/40 sm:mt-4 sm:text-xs`}
        aria-hidden
      >
        Glissez ou choisissez un numéro →
      </p>
    </section>
  );
}
