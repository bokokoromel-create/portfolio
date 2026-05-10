import Link from "next/link";
import { SlideDoubleLabel } from "../slide-double-label";

type WorkWithMeCtaSectionProps = {
  accentClassName: string;
  /** Remplace par ton adresse e-mail réelle. */
  contactEmail?: string;
};

export function WorkWithMeCtaSection({
  accentClassName,
  contactEmail = "hello@example.com",
}: WorkWithMeCtaSectionProps) {
  return (
    <section
      id="contact"
      className="section relative flex min-h-[min(82svh,860px)] flex-col bg-black px-4 py-16 text-white sm:min-h-[min(90svh,880px)] sm:px-10 sm:py-28"
      aria-labelledby="contact-cta-heading"
    >
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="reveal mb-10 font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-white sm:text-xs">
          Travaillez avec moi
        </p>

        <h2
          id="contact-cta-heading"
          className="max-w-[min(100%,42rem)] px-1 font-[family-name:var(--font-display)] text-[clamp(2.1rem,calc(7.5vw+0.75rem),7rem)] font-normal uppercase leading-[0.92] tracking-tight text-white sm:px-0"
        >
          <span className="reveal block">Prêts à</span>
          <span className="reveal mt-1 block sm:mt-2">
            Entendre plus de{" "}
            <span
              className={`${accentClassName} normal-case text-[clamp(1.85rem,calc(6.5vw+0.65rem),6rem)] tracking-normal text-[#E24A2E]`}
            >
              « OUI »
            </span>{" "}
            ?
          </span>
        </h2>

        <Link
          href={`mailto:${contactEmail}?subject=Projet%20web`}
          className="group reveal mt-10 inline-flex max-w-[calc(100vw-2rem)] items-center justify-center rounded-lg bg-white px-6 py-3.5 font-[family-name:var(--font-display)] text-base font-normal uppercase tracking-wide text-black transition-colors duration-300 ease-out hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:mt-12 sm:max-w-none sm:px-12 sm:py-5 sm:text-xl"
        >
          <SlideDoubleLabel
            label="Hell oui!"
            lineClassName="items-center justify-center"
          />
        </Link>
      </div>

      <p className="reveal mt-auto pt-16 text-center font-sans text-xs text-white/80 sm:text-sm">
        <a
          href={`mailto:${contactEmail}`}
          className="underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          {contactEmail}
        </a>
      </p>
    </section>
  );
}
