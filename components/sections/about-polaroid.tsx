"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

/** Inclinaison 3D maximale (deg) vers le curseur. */
const MAX_TILT = 20;
/** Tactile : inclinaison liée au scroll pendant la traversée de l'écran. */
const SCROLL_TILT_X = 16;
const SCROLL_TILT_Y = 7;
/** Tactile : déplacement max (px) au-delà duquel on considère un scroll, pas un tap. */
const TAP_SLOP = 10;
const clampXY = gsap.utils.clamp(-1080, 1080);
const clampRotation = gsap.utils.clamp(-60, 60);

type AboutPolaroidProps = {
  src: string;
  alt: string;
};

/**
 * Écrans tactiles (pas de curseur) : le polaroid bascule en 3D au fil du
 * scroll, et un tap le fait balancer (inertie) selon l'endroit touché.
 */
function initTouchMotion(tilt: HTMLElement, swing: HTMLElement) {
  gsap.set(tilt, { transformPerspective: 900 });

  const tiltTween = gsap.fromTo(
    tilt,
    { rotationX: SCROLL_TILT_X, rotationY: -SCROLL_TILT_Y },
    {
      rotationX: -SCROLL_TILT_X,
      rotationY: SCROLL_TILT_Y,
      ease: "none",
      scrollTrigger: {
        trigger: tilt,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    },
  );

  let startX = 0;
  let startY = 0;

  const onPointerDown = (event: PointerEvent) => {
    startX = event.clientX;
    startY = event.clientY;
  };

  const onPointerUp = (event: PointerEvent) => {
    if (Math.hypot(event.clientX - startX, event.clientY - startY) > TAP_SLOP) return;
    const rect = swing.getBoundingClientRect();
    // -1 (bord gauche) → 1 (bord droit) : un tap décentré fait tourner davantage.
    const side = gsap.utils.clamp(-1, 1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1));
    const push = side === 0 ? 1 : Math.sign(side);

    gsap.to(swing, {
      inertia: {
        x: { velocity: clampXY(push * 700), end: 0 },
        y: { velocity: -260, end: 0 },
        rotation: { velocity: clampRotation(side * 60 || 30), end: 0 },
        resistance: 200,
      },
    });
  };

  swing.addEventListener("pointerdown", onPointerDown, { passive: true });
  swing.addEventListener("pointerup", onPointerUp);

  return () => {
    swing.removeEventListener("pointerdown", onPointerDown);
    swing.removeEventListener("pointerup", onPointerUp);
    tiltTween.scrollTrigger?.kill();
    tiltTween.kill();
    gsap.killTweensOf(swing);
    gsap.set([tilt, swing], { clearProps: "transform" });
  };
}

/**
 * Polaroid qui s'incline en 3D en suivant le curseur, et qui prend
 * de l'élan (inertie) quand la souris arrive dessus.
 */
export function AboutPolaroid({ src, alt }: AboutPolaroidProps) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const swingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tilt = tiltRef.current;
    const swing = swingRef.current;
    if (!tilt || !swing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return initTouchMotion(tilt, swing);
    }

    gsap.set(tilt, { transformPerspective: 900 });
    const proxy = { rx: 0, ry: 0 };
    const setRotationX = gsap.quickSetter(tilt, "rotationX", "deg");
    const setRotationY = gsap.quickSetter(tilt, "rotationY", "deg");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let lastX = pointerX;
    let lastY = pointerY;
    let velocityX = 0;
    let velocityY = 0;
    let queued = false;

    const applyTilt = () => {
      queued = false;
      const rect = tilt.getBoundingClientRect();
      const dx = gsap.utils.clamp(-1, 1, (pointerX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1));
      const dy = gsap.utils.clamp(-1, 1, (pointerY - (rect.top + rect.height / 2)) / (rect.height / 2 || 1));
      gsap.to(proxy, {
        rx: -dy * MAX_TILT,
        ry: dx * MAX_TILT,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => {
          setRotationX(proxy.rx);
          setRotationY(proxy.ry);
        },
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      velocityX = event.clientX - lastX;
      velocityY = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      if (!queued) {
        queued = true;
        requestAnimationFrame(applyTilt);
      }
    };

    const onPointerEnter = (event: PointerEvent) => {
      const rect = swing.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      // Couple : l'entrée décentrée fait tourner le polaroid.
      const torque =
        (offsetX * velocityY * 1.2 - offsetY * velocityX) /
        (Math.hypot(offsetX, offsetY) || 1);

      gsap.to(swing, {
        inertia: {
          x: { velocity: clampXY(velocityX * 1000), end: 0 },
          y: { velocity: clampXY(velocityY * 2), end: 0 },
          rotation: { velocity: clampRotation(torque * 20), end: 0 },
          resistance: 200,
        },
      });
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    swing.addEventListener("pointerenter", onPointerEnter);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      swing.removeEventListener("pointerenter", onPointerEnter);
      gsap.killTweensOf([proxy, swing]);
      gsap.set([tilt, swing], { clearProps: "transform" });
    };
  }, []);

  return (
    <div ref={tiltRef} className="will-change-transform">
      <div
        ref={swingRef}
        className="bg-white p-3 pb-10 shadow-[8px_16px_40px_rgba(0,0,0,0.12)] sm:p-4 sm:pb-12"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 240px, 300px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
