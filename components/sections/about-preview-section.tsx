import { SiteLogo } from "../site-logo";

type AboutPreviewSectionProps = {
  accentClassName: string;
};

export function AboutPreviewSection({ accentClassName }: AboutPreviewSectionProps) {
  return (
    <section
      id="about-section"
      className="section relative overflow-hidden bg-[#F2F0EB] px-4 pb-16 pt-12 sm:px-10 sm:pb-28 sm:pt-16 md:pb-32"
      aria-labelledby="about-preview-heading"
    >
      <div className="relative mx-auto max-w-6xl">
        <h2
          id="about-preview-heading"
          className="reveal relative z-10 text-center font-[family-name:var(--font-display)] text-[clamp(2.5rem,12vw,10.5rem)] font-black uppercase leading-[0.88] tracking-tight text-neutral-950 sm:text-[clamp(3.25rem,15vw,10.5rem)]"
        >
          À propos
        </h2>

        <div className="relative z-[1] mx-auto mt-6 flex justify-center px-2 sm:mt-10">
          <figure className="reveal relative w-[min(100%,240px)] rotate-[-4deg] shadow-[8px_16px_40px_rgba(0,0,0,0.12)] sm:w-[min(100%,300px)]">
            <div className="bg-white p-3 pb-10 sm:p-4 sm:pb-12">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200">
                <picture className="absolute inset-0 block h-full w-full">
                  <source srcSet="/ro.HEIC" type="image/heic" />
                  <source srcSet="/ro.HEIC" type="image/heif" />
                  <img
                    src="/Ro.jpg"
                    alt="Portrait — Romel Matsonda"
                    width={760}
                    height={950}
                    className="h-full w-full object-cover object-center"
                    decoding="async"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
          </figure>
        </div>
      </div>

      <div className="relative z-[2] mx-auto mt-10 grid max-w-6xl gap-8 font-sans text-sm leading-relaxed text-neutral-800 sm:mt-14 sm:grid-cols-2 sm:gap-14 sm:text-[15px] md:text-base">
        <p className="reveal sm:pr-4">
          Bonjour, je suis{" "}
          <SiteLogo asLink={false} className="mx-0.5 inline h-[1.1em] w-auto align-[-0.12em]" />
          . Je crée des sites web qui positionnent les métiers de l’expertise
          comme le choix évident — sans sur-expliquer ni sur-vendre.
        </p>
        <p className="reveal sm:pl-4">
          La plupart des sites des entreprises fondées sur l’expertise
          ressemblent à de mauvais premiers rendez-vous : ils en font trop,
          embrouillent tout le monde, et personne n’ose s’engager. Je conçois des
          sites qui communiquent clairement, inspirent confiance et donnent
          envie de dire{" "}
          <span className={`${accentClassName} text-lg text-[#E24A2E]`}>
            « oui »
          </span>
          .
        </p>
      </div>
    </section>
  );
}
