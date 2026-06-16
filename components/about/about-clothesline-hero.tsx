"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

const POLAROIDS = [
  {
    src: "/romel.jpg",
    alt: "Moment du quotidien",
    restAngle: -7,
    offset: "translate-y-4 sm:translate-y-10",
  },
  {
    src: "/Ro.jpg",
    alt: "Portrait — Romel Matsonda",
    restAngle: 0,
    offset: "translate-y-0",
  },
  {
    src: "/rome.png",
    alt: "En coulisses",
    restAngle: 6,
    offset: "translate-y-6 sm:translate-y-12",
  },
] as const;

const STIFFNESS = 0.028;
const DAMPING = 0.968;
const MAX_SWING = 28;
const POINTER_INFLUENCE = 1.2;
/** Plus bas = suivi plus lent et fluide au survol. */
const HOVER_SMOOTH = 0.045;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

type SwingingPolaroidProps = {
  src: string;
  alt: string;
  restAngle: number;
  offset: string;
};

function SwingingPolaroid({
  src,
  alt,
  restAngle,
  offset,
}: SwingingPolaroidProps) {
  const swingRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(restAngle);
  const targetAngleRef = useRef(restAngle);
  const velocityRef = useRef(0);
  const hoveringRef = useRef(false);
  const reduceMotionRef = useRef(false);

  const applyAngle = useCallback((angle: number) => {
    if (swingRef.current) {
      swingRef.current.style.transform = `rotate(${angle}deg)`;
    }
  }, []);

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const el = swingRef.current;
      if (!el || reduceMotionRef.current) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const normalized = (clientX - centerX) / (rect.width * 0.5);
      targetAngleRef.current = clamp(
        restAngle + normalized * MAX_SWING * POINTER_INFLUENCE,
        restAngle - MAX_SWING,
        restAngle + MAX_SWING,
      );
    },
    [restAngle],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const sync = () => {
      reduceMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    angleRef.current = restAngle;
    targetAngleRef.current = restAngle;
    applyAngle(restAngle);
  }, [restAngle, applyAngle]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (reduceMotionRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (hoveringRef.current) {
        const diff = targetAngleRef.current - angleRef.current;
        const step = diff * HOVER_SMOOTH;
        angleRef.current += step;
        velocityRef.current = step;
        applyAngle(angleRef.current);
      } else {
        const angle = angleRef.current;
        const velocity = velocityRef.current;
        const force = -STIFFNESS * (angle - restAngle);
        const newVelocity = (velocity + force) * DAMPING;
        const newAngle = angle + newVelocity;

        if (
          Math.abs(newVelocity) < 0.008 &&
          Math.abs(newAngle - restAngle) < 0.03
        ) {
          angleRef.current = restAngle;
          targetAngleRef.current = restAngle;
          velocityRef.current = 0;
          applyAngle(restAngle);
        } else {
          angleRef.current = newAngle;
          velocityRef.current = newVelocity;
          applyAngle(newAngle);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [restAngle, applyAngle]);

  const onPointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotionRef.current) return;
    hoveringRef.current = true;
    if (swingRef.current?.parentElement) {
      swingRef.current.parentElement.style.zIndex = "30";
    }
    updateFromPointer(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hoveringRef.current || reduceMotionRef.current) return;
    updateFromPointer(e.clientX);
  };

  const onPointerLeave = () => {
    hoveringRef.current = false;
    targetAngleRef.current = restAngle;
    if (swingRef.current?.parentElement) {
      swingRef.current.parentElement.style.zIndex = "";
    }
  };

  return (
    <div
      className={`relative z-0 w-[min(42vw,260px)] shrink-0 sm:w-[min(36vw,300px)] md:w-[min(32vw,340px)] ${offset}`}
    >
      <div
        ref={swingRef}
        className="origin-top touch-none select-none will-change-transform"
        style={{ transform: `rotate(${restAngle}deg)` }}
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div
          className="absolute left-1/2 top-0 z-10 h-8 w-14 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] bg-[#F2E8A8]/95 shadow-sm sm:h-9 sm:w-16"
          aria-hidden
        />
        <figure className="relative pt-1">
          <div className="bg-white p-2.5 pb-9 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-3 sm:pb-11">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
              <Image
                src={src}
                alt={alt}
                fill
                className="pointer-events-none object-cover object-center"
                sizes="(max-width: 640px) 42vw, 340px"
                draggable={false}
              />
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
}

export function AboutClotheslineHero() {
  return (
    <section
      data-reveal-variant="about"
      className="section relative bg-[#E24A2E] px-5 pb-24 pt-28 sm:px-10 sm:pb-32 sm:pt-36"
      aria-label="Galerie à propos"
    >
      <div className="relative mx-auto h-[min(62vh,640px)] max-w-7xl overflow-visible sm:h-[min(68vh,720px)]">
        <svg
          className="pointer-events-none absolute inset-x-[-5%] top-[4%] h-[160px] w-[110%] sm:top-[3%] sm:h-[200px]"
          viewBox="0 0 1000 180"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 0 120 Q 500 10 1000 120"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="absolute inset-x-0 top-[14%] flex items-start justify-center gap-4 overflow-visible py-6 sm:top-[12%] sm:gap-8 sm:py-10 md:gap-12">
          {POLAROIDS.map((photo) => (
            <SwingingPolaroid key={photo.src} {...photo} />
          ))}
        </div>
      </div>
    </section>
  );
}
