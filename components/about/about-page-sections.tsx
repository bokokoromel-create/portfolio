import type { ReactNode } from "react";
import { ScrollMaskedLines } from "../scroll/scroll-masked-lines";

type AboutPageSectionsProps = {
  accentClassName: string;
};

function ScriptUnderline({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-[1]">{children}</span>
      <span
        className="absolute bottom-[0.12em] left-0 right-0 z-0 h-px bg-black"
        aria-hidden
      />
    </span>
  );
}

type GridBlock = {
  num: string;
  title: string;
  body: string;
};

const PHILOSOPHY_BLOCKS: GridBlock[] = [
  {
    num: "(01)",
    title: "Des visuels sans stratégie ne fonctionnent pas à grande échelle.",
    body:
      "Des mises en page soignées ne concluent pas de deals. Votre site doit gagner la confiance, vous positionner comme expert et faire en sorte que le « oui » paraisse évident — pas seulement remporter des prix.",
  },
  {
    num: "(02)",
    title: "Bonne nouvelle : les sites web n’ont pas à être nuls.",
    body:
      "Je privilégie l’efficacité à l’esthétique, mais un look bas de gamme mine la crédibilité. Design bon marché et tarifs premium ne coexistent pas.",
  },
  {
    num: "(03)",
    title: "Votre site web devrait parler pour votre expertise.",
    body:
      "Les visiteurs devraient comprendre ce que vous faites, pour qui, et pourquoi c’est important — avant la première conversation.",
  },
  {
    num: "(04)",
    title: "Un site web est un outil business, pas une solution miracle.",
    body:
      "Il résout des problèmes business précis. Un site ne résout pas tout — et si vous n’en avez pas vraiment besoin, je vous le dirai franchement.",
  },
];

function PhilosophyCell({
  num,
  title,
  body,
  index,
}: GridBlock & { index: number }) {
  return (
    <div
      className={`border-b border-black p-8 sm:p-10 lg:p-12 ${
        index % 2 === 0 ? "md:border-r" : ""
      }`}
    >
      <p className="reveal font-sans text-xs font-medium text-black">{num}</p>
      <h3 className="reveal mt-4 font-[family-name:var(--font-display)] text-2xl font-normal uppercase leading-[0.95] tracking-tight text-black sm:text-3xl md:text-[clamp(1.75rem,2.5vw,2.5rem)]">
        {title}
      </h3>
      <p className="reveal mt-5 font-sans text-sm leading-relaxed text-black sm:text-[15px]">
        {body}
      </p>
    </div>
  );
}

export function AboutPageSections({ accentClassName }: AboutPageSectionsProps) {
  const displayLine =
    "font-[family-name:var(--font-display)] text-[clamp(1.5rem,5.5vw,4rem)] font-normal uppercase tracking-tight text-black";
  const scriptLine = `${accentClassName} text-[clamp(1.75rem,6.5vw,4.75rem)] font-bold normal-case text-white`;
  const statNumber =
    "font-[family-name:var(--font-display)] font-normal uppercase leading-none tracking-tight text-black";
  const statBody =
    "max-w-sm font-sans text-sm leading-relaxed sm:text-[15px]";

  return (
    <>
      {/* Intro + manifeste */}
      <section
        data-reveal-variant="about"
        className="section bg-[#E24A2E] px-5 pb-24 pt-16 text-center text-black sm:px-10 sm:pb-32 sm:pt-20"
        aria-labelledby="about-page-heading"
      >
        <h1 id="about-page-heading">
          <ScrollMaskedLines
            className="mx-auto"
            lines={["À propos"]}
            lineClassNames={[
              "font-[family-name:var(--font-display)] text-[clamp(3.5rem,16vw,10rem)] font-normal uppercase leading-[0.82] tracking-tight",
            ]}
            stagger={0.1}
            scrollStart="top 88%"
          />
        </h1>

        <ScrollMaskedLines
          className="mx-auto mt-8 max-w-xl"
          lines={[
            "Depuis 2 ans, je comble le fossé entre la performance de votre entreprise et son image en ligne.",
          ]}
          lineClassNames={["font-sans text-sm leading-relaxed sm:text-base"]}
          stagger={0.08}
          duration={0.85}
          scrollStart="top 85%"
        />

        <ScrollMaskedLines
          className="mx-auto mt-16 max-w-5xl text-balance leading-[1.15] sm:mt-24"
          lines={[
            {
              key: "manifesto-1",
              content: (
                <>
                  <span className={displayLine}>Je travaille avec </span>
                  <ScriptUnderline className={scriptLine}>
                    des entreprises
                  </ScriptUnderline>
                  <span className={displayLine}> qui </span>
                </>
              ),
            },
            {
              key: "manifesto-2",
              content: (
                <ScriptUnderline className={scriptLine}>
                  vendent de l&apos;expertise, pas du volume
                </ScriptUnderline>
              ),
            },
            {
              key: "manifesto-3",
              content: (
                <ScriptUnderline className={scriptLine}>
                  , et qui ont besoin que leur site web le reflète.
                </ScriptUnderline>
              ),
            },
          ]}
          stagger={0.14}
          duration={1}
          scrollStart="top 82%"
        />
      </section>

      {/* Chiffres + promesse */}
      <section
        data-reveal-variant="about"
        className="section bg-[#E24A2E] px-5 py-20 text-black sm:px-10 sm:py-28"
        aria-labelledby="about-credibility-heading"
      >
        <h2 id="about-credibility-heading" className="sr-only">
          Parcours et approche
        </h2>
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-14 lg:col-span-5">
            <ScrollMaskedLines
              lines={[
                "10+",
                "Sites à fort impact pour les entreprises qui veulent être perçues différemment.",
              ]}
              lineClassNames={[
                `${statNumber} text-[clamp(3rem,10vw,6rem)]`,
                `mt-4 ${statBody}`,
              ]}
              stagger={0.12}
              scrollStart="top 84%"
            />
            <ScrollMaskedLines
              lines={[
                "2+ ans",
                "À construire des sites web qui reflètent une vraie expertise.",
              ]}
              lineClassNames={[
                `${statNumber} text-[clamp(2rem,7vw,4.5rem)]`,
                `mt-4 ${statBody}`,
              ]}
              stagger={0.12}
              scrollStart="top 84%"
            />
            <ScrollMaskedLines
              lines={[
                "Clients internationaux",
                "Les entreprises fondées sur l'expertise, partout dans le monde, font face au même défi : des sites qui sous-valorisent leur niveau.",
              ]}
              lineClassNames={[
                `${statNumber} text-[clamp(1.75rem,6vw,3.5rem)] leading-[0.95]`,
                `mt-4 ${statBody}`,
              ]}
              stagger={0.12}
              scrollStart="top 84%"
            />
          </div>

          <div className="flex items-center lg:col-span-7 lg:pl-8">
            <ScrollMaskedLines
              className="lg:ml-auto"
              lines={[
                "Je suis celui qui répond aux e-mails le week-end, se souvient de vos objectifs business et ne vous facture pas chaque virgule modifiée.",
                "Un seul interlocuteur, de l'appel stratégique au jour du lancement.",
              ]}
              lineClassNames={[
                "max-w-lg font-sans text-sm leading-relaxed sm:text-[15px] lg:text-base",
                "mt-4 max-w-lg font-sans text-sm leading-relaxed sm:text-[15px] lg:text-base",
              ]}
              stagger={0.1}
              duration={0.9}
              scrollStart="top 82%"
            />
          </div>
        </div>

        <h2 className="mx-auto mt-24 max-w-5xl text-center sm:mt-32">
          <ScrollMaskedLines
            lines={[
              "Comment je pense",
              {
                key: "think-accent",
                content: (
                  <span
                    className={`${accentClassName} text-[clamp(2.25rem,10vw,7rem)] font-bold normal-case leading-none text-white`}
                  >
                    aux sites web
                  </span>
                ),
              },
            ]}
            lineClassNames={[
              "font-[family-name:var(--font-display)] text-[clamp(2.5rem,11vw,7.5rem)] font-normal uppercase leading-[0.88] tracking-tight",
              "-mt-1 block sm:-mt-2",
            ]}
            stagger={0.12}
            scrollStart="top 80%"
          />
        </h2>
      </section>

      {/* Grille philosophie 2×2 */}
      <section
        data-reveal-variant="about"
        className="section border-t border-black bg-[#E24A2E] sm:border-t-0"
        aria-labelledby="about-philosophy-heading"
      >
        <h2 id="about-philosophy-heading" className="sr-only">
          Philosophie web
        </h2>
        <div className="mx-auto grid max-w-6xl border-t border-black md:grid-cols-2">
          {PHILOSOPHY_BLOCKS.map((block, index) => (
            <PhilosophyCell key={block.num} {...block} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
