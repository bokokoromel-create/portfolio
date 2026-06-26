import Link from "next/link";
import { MaskedRevealLines, MaskedRevealWords } from "../masked-reveal";

type ProcessHeroProps = {
  accentClassName: string;
};

const titleLineOneClass =
  "block text-[clamp(2.5rem,13vw,12rem)] sm:text-[clamp(3.5rem,15vw,12rem)] md:text-[clamp(4.25rem,13vw,13.5rem)]";

const titleLineTwoClass =
  "mt-[-0.02em] block text-[clamp(2.25rem,11vw,11rem)] sm:text-[clamp(3rem,13.5vw,11rem)] md:text-[clamp(3.75rem,12vw,12.5rem)]";

/**
 * Section 1 — pleine page crème, label + « MON PROCESSUS » + accent manuscrit.
 */
export function ProcessHero({ accentClassName }: ProcessHeroProps) {
  return (
    <section
      data-reveal-variant="process"
      className="section relative flex min-h-[min(84dvh,820px)] flex-col justify-center bg-[#EFEBE3] px-4 py-16 text-black sm:min-h-[min(92dvh,900px)] sm:px-10 sm:py-28"
      aria-labelledby="process-hero-heading"
    >
      <MaskedRevealWords
        text="Ce que je fais"
        className="mb-8 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-black sm:mb-10 sm:text-xs sm:tracking-[0.32em]"
        delay={0.04}
        stagger={0.08}
        duration={0.55}
      />

      <h1
        id="process-hero-heading"
        className="mx-auto max-w-[min(96vw,1100px)] text-balance text-center font-[family-name:var(--font-display)] font-normal uppercase leading-[0.76] tracking-[-0.02em] text-black"
      >
        <MaskedRevealLines
          lines={[
            { key: "mon", content: "Mon" },
            {
              key: "processus",
              content: (
                <>
                  processus{" "}
                  <span
                    className={`${accentClassName} ml-0.5 inline-block align-baseline text-[clamp(1.5rem,6vw,5rem)] font-bold normal-case tracking-normal text-[#E24A2E] sm:ml-2`}
                  >
                    « oui »
                  </span>
                </>
              ),
            },
          ]}
          lineClassNames={[titleLineOneClass, titleLineTwoClass]}
          delay={0.1}
          stagger={0.14}
          duration={0.95}
        />
      </h1>

      <p className="reveal mt-10 text-center font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-black sm:mt-16 sm:text-[10px] sm:tracking-[0.26em]">
        <Link
          href="#process-section-2"
          className="outline-none transition-opacity hover:opacity-60 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-4 focus-visible:ring-offset-[#EFEBE3]"
        >
          (Faites défiler jusqu&apos;à la suite)
        </Link>
      </p>
    </section>
  );
}
