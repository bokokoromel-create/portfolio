import Link from "next/link";

type ProcessHeroProps = {
  accentClassName: string;
};

/**
 * Section 1 — pleine page crème, label + « MON PROCESSUS » + accent manuscrit.
 */
export function ProcessHero({ accentClassName }: ProcessHeroProps) {
  return (
    <section
      data-reveal-variant="process"
      className="section relative flex min-h-[min(88dvh,880px)] flex-col justify-center bg-[#EFEBE3] px-4 py-14 text-black sm:min-h-[min(92dvh,900px)] sm:px-10 sm:py-28"
      aria-labelledby="process-hero-heading"
    >
      <p className="reveal mb-10 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-black sm:text-xs">
        Ce que je fais
      </p>

      <h1
        id="process-hero-heading"
        className="reveal mx-auto max-w-[min(96vw,1100px)] text-balance text-center font-[family-name:var(--font-display)] font-normal uppercase leading-[0.76] tracking-[-0.02em] text-black"
      >
        <span className="block text-[clamp(2.5rem,calc(6vw+1.15rem),12rem)] sm:text-[clamp(4.25rem,13vw,13.5rem)]">
          Mon
        </span>
        <span className="mt-[-0.02em] block text-[clamp(2.2rem,calc(5.5vw+1rem),11rem)] sm:mt-[-0.04em] sm:text-[clamp(3.75rem,12vw,12.5rem)]">
          processus{" "}
          <span
            className={`${accentClassName} ml-1 inline-block align-baseline text-[clamp(1.65rem,calc(4.5vw+0.6rem),5rem)] font-bold normal-case tracking-normal text-[#E24A2E] sm:ml-2`}
          >
            « oui »
          </span>
        </span>
      </h1>

      <p className="reveal mt-14 text-center font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-black sm:mt-16 sm:text-[10px] sm:tracking-[0.26em]">
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
