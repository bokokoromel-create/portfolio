"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteLogo } from "../site-logo";

gsap.registerPlugin(ScrollTrigger);

type TestimonialsSectionProps = {
  accentClassName: string;
};

type Card = {
  quote: string;
  body: string | ReactNode;
  name: string;
  role: string;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const CARDS: Card[] = [
  {
    quote: "« Une présence premium, sans en faire trop »",
    body: (
      <>
        <SiteLogo asLink={false} className="mr-0.5 inline h-[1em] w-auto align-[-0.1em]" />
        nous a aidés à passer d’un site Squarespace générique à quelque chose de
        beaucoup plus raffiné et aligné sur notre niveau. Le rendu est premium
        sans surcharger, et capture exactement l’équilibre qu’on visait.
      </>
    ),
    name: "Ariel",
    role: "Directrice, studio d’intérieur",
  },
  {
    quote: "« Enfin un site à la hauteur de notre activité »",
    body: "Process clair, collaboration simple, et un résultat qui nous ressemble : professionnel, confiant, fidèle à ce qu’on fait au quotidien.",
    name: "Khris",
    role: "Fondateur, agence marketing",
  },
  {
    quote: "« Du générique au niveau au-dessus »",
    body: "La différence s’est vue tout de suite : un site plus focalisé, plus premium, et en phase avec la qualité de nos missions.",
    name: "Clara",
    role: "Fondatrice, cabinet conseil",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "q1",
    question: "À qui est destiné ceci ?",
    answer:
      "Je travaille avec des structures bâties sur l’expertise — cabinets, studios, freelances senior. Si votre travail est solide mais que votre site ne le reflète pas, je vous aide à aligner votre présence en ligne sur votre niveau réel.",
  },
  {
    id: "q2",
    question: "À qui cela ne s’adresse-t-il pas ?",
    answer:
      "Si vous cherchez une refonte « miracle » sans contenu ni positionnement clair, ou un prix au plus bas sans exigence qualité, ce ne sera pas un bon match. En revanche, si vous voulez quelque chose de soigné et durable, on peut en parler.",
  },
  {
    id: "q3",
    question: "Vous faites uniquement de la conception, ou aussi du développement ?",
    answer:
      "Les deux : de la définition du message jusqu’au site prêt à mettre en ligne, avec une stack moderne (ici Next.js) et un rendu fidèle à la maquette.",
  },
  {
    id: "q4",
    question: "Combien coûte un site web ?",
    answer:
      "Ça dépend du périmètre et de la complexité. En général, comptez une fourchette raisonnable pour un site vitrine / portfolio sur mesuré — on fixe un budget et un périmètre clairs avant de démarrer.",
  },
  {
    id: "q5",
    question: "Combien de temps faut-il pour créer un site web ?",
    answer:
      "Souvent entre quelques semaines et deux mois selon les allers-retours et le volume de pages. Vous avez une vision du calendrier dès le départ.",
  },
  {
    id: "q6",
    question: "Garantissez-vous des résultats ?",
    answer:
      "Je m’engage sur la qualité du livrable : clarté, performance, accessibilité de base, code propre. Pour les « conversions x10 », personne ne peut promettre l’impossible — en revanche, un bon site donne les meilleures chances à une offre déjà solide.",
  },
  {
    id: "q7",
    question: "Par où commencer ?",
    answer:
      "Écrivez-moi via le bouton « Discutons » ou un message direct avec un lien vers votre site actuel et vos objectifs. On échange 15–20 minutes pour voir si ça colle, puis on décide d’une suite ou pas.",
  },
];

const STACK_OFFSETS = [
  { x: 0, y: 0, rotate: -2.5, scale: 1 },
  { x: 18, y: 28, rotate: 3.5, scale: 0.97 },
  { x: -14, y: 56, rotate: -1.5, scale: 0.94 },
] as const;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function TestimonialDeck({ accentClassName }: { accentClassName: string }) {
  const deckRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragDeltaX = useRef(0);
  const isDragging = useRef(false);
  const wheelLock = useRef(false);

  const count = CARDS.length;

  const goTo = useCallback(
    (next: number) => {
      const wrapped = ((next % count) + count) % count;
      setActiveIndex(wrapped);
    },
    [count],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useLayoutEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const cards = deck.querySelectorAll<HTMLElement>("[data-testimonial-card]");
    const reduced = prefersReducedMotion();

    cards.forEach((card) => {
      const visualIndex = Number(card.dataset.stack ?? 0);
      const offset =
        STACK_OFFSETS[Math.min(visualIndex, STACK_OFFSETS.length - 1)] ??
        STACK_OFFSETS[0];
      const isTop = visualIndex === 0;

      gsap.set(card, {
        zIndex: count - visualIndex,
        pointerEvents: isTop ? "auto" : "none",
      });

      const vars = {
        x: offset.x,
        y: offset.y,
        rotation: offset.rotate,
        scale: offset.scale,
        opacity: 1,
        duration: reduced ? 0 : 0.55,
        ease: "power3.out",
      };

      if (reduced) gsap.set(card, vars);
      else gsap.to(card, vars);
    });
  }, [activeIndex, count]);

  const onPointerDown = (event: React.PointerEvent) => {
    if (event.button !== 0) return;
    isDragging.current = true;
    dragStartX.current = event.clientX;
    dragDeltaX.current = 0;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isDragging.current || dragStartX.current == null) return;
    dragDeltaX.current = event.clientX - dragStartX.current;

    const topCard = deckRef.current?.querySelector<HTMLElement>(
      '[data-testimonial-card][data-stack="0"]',
    );
    if (!topCard || prefersReducedMotion()) return;

    gsap.set(topCard, {
      x: dragDeltaX.current * 0.35,
      rotation: dragDeltaX.current * 0.04 - 2.5,
    });
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);

    const delta = dragDeltaX.current;
    dragStartX.current = null;
    dragDeltaX.current = 0;

    if (Math.abs(delta) > 56) {
      if (delta < 0) goNext();
      else goPrev();
      return;
    }

    const topCard = deckRef.current?.querySelector<HTMLElement>(
      '[data-testimonial-card][data-stack="0"]',
    );
    if (topCard) {
      gsap.to(topCard, {
        x: STACK_OFFSETS[0].x,
        rotation: STACK_OFFSETS[0].rotate,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const onWheel = (event: React.WheelEvent) => {
    if (Math.abs(event.deltaY) < 8 && Math.abs(event.deltaX) < 8) return;
    if (wheelLock.current) return;
    wheelLock.current = true;

    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (delta > 0) goNext();
    else goPrev();

    window.setTimeout(() => {
      wheelLock.current = false;
    }, 450);
  };

  return (
    <div className="mx-auto mt-14 w-full max-w-lg sm:mt-16 sm:max-w-xl">
      <div
        ref={deckRef}
        className="relative mx-auto h-[min(420px,62vh)] w-full touch-pan-y select-none sm:h-[460px]"
        onWheel={onWheel}
        aria-roledescription="carousel"
        aria-label="Témoignages clients"
      >
        {CARDS.map((card, index) => {
          const stackPos = (index - activeIndex + count) % count;
          return (
            <div
              key={card.name}
              data-testimonial-card
              data-stack={stackPos}
              className="absolute inset-x-0 top-6 mx-auto w-[min(92vw,380px)] will-change-transform"
              style={{ zIndex: count - stackPos }}
              onPointerDown={stackPos === 0 ? onPointerDown : undefined}
              onPointerMove={stackPos === 0 ? onPointerMove : undefined}
              onPointerUp={stackPos === 0 ? onPointerUp : undefined}
              onPointerCancel={stackPos === 0 ? onPointerUp : undefined}
            >
              <article
                className={`rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-8 ${
                  stackPos === 0 ? "cursor-grab active:cursor-grabbing" : ""
                }`}
                aria-hidden={stackPos !== 0}
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase leading-snug tracking-tight text-neutral-950 sm:text-2xl">
                  {card.quote}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
                  {card.body}
                </p>
                <footer className="mt-6 border-t border-neutral-200 pt-4 font-sans text-xs font-semibold uppercase tracking-wide text-neutral-900 sm:text-sm">
                  {card.name}
                  <span className="mt-1 block font-normal normal-case tracking-normal text-neutral-500">
                    {card.role}
                  </span>
                </footer>
              </article>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 sm:mt-6">
        <button
          type="button"
          onClick={goPrev}
          className="flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition-colors hover:bg-neutral-950 hover:text-white"
          aria-label="Témoignage précédent"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Pagination témoignages">
          {CARDS.map((card, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={card.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Voir le témoignage de ${card.name}`}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive ? "w-7 bg-[#E24A2E]" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition-colors hover:bg-neutral-950 hover:text-white"
          aria-label="Témoignage suivant"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p
        className={`${accentClassName} mt-3 text-center text-sm text-neutral-400`}
        aria-hidden
      >
        Glissez ou faites défiler →
      </p>
    </div>
  );
}

export function TestimonialsSection({ accentClassName }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const faq = faqRef.current;
    if (!section || !header) return;

    if (prefersReducedMotion()) return;

    const faqRows = faq
      ? gsap.utils.toArray<HTMLElement>(faq.querySelectorAll("[data-faq-item]"))
      : [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: 36, opacity: 0, willChange: "transform, opacity" },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
          },
          onComplete: () => gsap.set(header, { clearProps: "willChange" }),
        },
      );

      if (faqRows.length && faq) {
        gsap.fromTo(
          faqRows,
          { y: 24, opacity: 0, willChange: "transform, opacity" },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faq,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            onComplete: () => {
              faqRows.forEach((el) => gsap.set(el, { clearProps: "willChange" }));
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="temoignages"
      className="section relative bg-[#F4F1EC] px-4 py-20 sm:px-10 sm:py-32 md:py-40"
      aria-labelledby="temoignages-heading"
    >
      <div ref={headerRef} className="mx-auto max-w-4xl text-center">
        <h2
          id="temoignages-heading"
          className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,8vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight text-neutral-950"
        >
          Ils ont dit{" "}
          <span className={`${accentClassName} text-[#E24A2E]`}>« oui ! »</span>
        </h2>
      </div>

      <TestimonialDeck accentClassName={accentClassName} />

      <div
        ref={faqRef}
        className="mx-auto mt-24 w-full max-w-2xl space-y-2 sm:mt-32"
        aria-labelledby="faq-heading"
      >
        <h3
          id="faq-heading"
          className="mb-6 text-center font-sans text-xs font-semibold uppercase tracking-[0.28em] text-neutral-600"
        >
          Des questions ?
        </h3>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={item.id}
                data-faq-item
                className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-sm"
              >
                <button
                  type="button"
                  id={`faq-trigger-${item.id}`}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span className="shrink-0 font-sans text-xs font-semibold tabular-nums text-neutral-500 sm:text-sm">
                    (Q{index + 1})
                  </span>
                  <span className="min-w-0 flex-1 font-sans text-sm font-medium leading-snug text-neutral-950 sm:text-[15px]">
                    {item.question}
                  </span>
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-neutral-950 text-white"
                    aria-hidden
                  >
                    <svg
                      className={`h-4 w-4 transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-neutral-100 px-4 pb-4 pt-1 sm:px-5 sm:pb-5">
                      <p className="font-sans text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
