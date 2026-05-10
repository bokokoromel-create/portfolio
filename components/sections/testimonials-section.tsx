"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TestimonialsSectionProps = {
  accentClassName: string;
};

type Card = {
  quote: string;
  body: string;
  name: string;
  role: string;
  x: number;
  y: number;
  rotate: number;
  z: number;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const CARDS: Card[] = [
  {
    quote: "« Une présence premium, sans en faire trop »",
    body:
      "RM nous a aidés à passer d’un site Squarespace générique à quelque chose de beaucoup plus raffiné et aligné sur notre niveau. Le rendu est premium sans surcharger, et capture exactement l’équilibre qu’on visait.",
    name: "Ariel",
    role: "Directrice, studio d’intérieur",
    x: -6,
    y: 22,
    rotate: -5.5,
    z: 10,
  },
  {
    quote: "« Enfin un site à la hauteur de notre activité »",
    body:
      "Process clair, collaboration simple, et un résultat qui nous ressemble : professionnel, confiant, fidèle à ce qu’on fait au quotidien.",
    name: "Khris",
    role: "Fondateur, agence marketing",
    x: 14,
    y: -6,
    rotate: 4.2,
    z: 20,
  },
  {
    quote: "« Du générique au niveau au-dessus »",
    body:
      "La différence s’est vue tout de suite : un site plus focalisé, plus premium, et en phase avec la qualité de nos missions.",
    name: "Clara",
    role: "Fondatrice, cabinet conseil",
    x: -18,
    y: -42,
    rotate: -2.8,
    z: 30,
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

export function TestimonialsSection({ accentClassName }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const deck = cardsRef.current;
    const faq = faqRef.current;
    if (!section || !header || !deck) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const wrappers = gsap.utils.toArray<HTMLElement>(
      deck.querySelectorAll("[data-testimonial-card]"),
    );
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

      gsap.fromTo(
        wrappers,
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
          willChange: "transform, opacity",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            wrappers.forEach((w) => gsap.set(w, { clearProps: "willChange" }));
          },
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
      className="section relative bg-[#F4F1EC] px-5 py-24 sm:px-10 sm:py-32 md:py-40"
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

      <div
        ref={cardsRef}
        className="relative mx-auto mt-16 h-[min(520px,70vh)] w-full max-w-lg sm:h-[560px] sm:max-w-xl"
      >
        {CARDS.map((c) => (
          <div
            key={c.quote}
            data-testimonial-card
            className="absolute inset-x-0 top-[46%] mx-auto w-[min(92vw,380px)]"
            style={{ zIndex: c.z }}
          >
            <article
              className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-8"
              style={{
                transform: `translate(${c.x}px, ${c.y}px) rotate(${c.rotate}deg)`,
              }}
            >
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase leading-snug tracking-tight text-neutral-950 sm:text-2xl">
                {c.quote}
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
                {c.body}
              </p>
              <footer className="mt-6 border-t border-neutral-200 pt-4 font-sans text-xs font-semibold uppercase tracking-wide text-neutral-900 sm:text-sm">
                {c.name}
                <span className="mt-1 block font-normal normal-case tracking-normal text-neutral-500">
                  {c.role}
                </span>
              </footer>
            </article>
          </div>
        ))}
      </div>

      <div
        ref={faqRef}
        className="mx-auto mt-28 w-full max-w-2xl space-y-2 sm:mt-36"
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
