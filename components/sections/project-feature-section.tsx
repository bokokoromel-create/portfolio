import Link from "next/link";

type ProjectFeatureSectionProps = {
  accentClassName: string;
};

export function ProjectFeatureSection({ accentClassName }: ProjectFeatureSectionProps) {
  return (
    <section
      id="portfolio"
      className="section relative bg-neutral-950 px-5 py-28 text-white sm:px-10 sm:py-36 md:py-44"
      aria-labelledby="portfolio-feature-heading"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="reveal mb-10 max-w-xl font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.28em] text-white/90 sm:text-xs">
          À quoi ressemble le fait de dire{" "}
          <span className={`${accentClassName} text-lg tracking-normal text-[#E24A2E] sm:text-xl`}>
            « oui ! »
          </span>
        </p>

        <div className="relative w-full">
          <p
            className={`${accentClassName} absolute -right-1 -top-8 text-2xl text-[#E24A2E] sm:-top-10 sm:text-3xl md:-right-4`}
            aria-hidden
          >
            (01)
          </p>
          <h2
            id="portfolio-feature-heading"
            className="reveal font-[family-name:var(--font-display)] text-[clamp(3.5rem,14vw,8.5rem)] font-black uppercase leading-none tracking-tight"
          >
            Estelle
          </h2>
        </div>

        <p className="reveal mt-8 max-w-lg font-sans text-xs font-medium uppercase leading-relaxed tracking-[0.2em] text-white/85 sm:text-sm">
          Site portfolio pour un cabinet d’architecture haut de gamme et
          sophistiqué.
        </p>

        <Link
          href="#contact"
          className="reveal mt-12 border border-white bg-white px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-neutral-950 transition-colors hover:bg-transparent hover:text-white"
        >
          Voir le projet
        </Link>
      </div>
    </section>
  );
}
