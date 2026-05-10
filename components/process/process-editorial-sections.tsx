type ColBlock = {
  num?: string;
  title: string;
  body: string | string[];
};

function Col({ num, title, body }: ColBlock) {
  const paras = Array.isArray(body) ? body : [body];
  return (
    <div className="reveal border-t border-black pt-8 sm:pt-10">
      {num ? (
        <p className="font-sans text-xs font-medium text-black">{num}</p>
      ) : null}
      <h2
        className={`font-[family-name:var(--font-display)] text-2xl font-normal uppercase leading-[0.95] tracking-tight text-black sm:text-3xl md:text-[clamp(1.75rem,2.8vw,2.75rem)] ${num ? "mt-4" : "mt-6"}`}
      >
        {title}
      </h2>
      <div className="mt-5 space-y-4 font-sans text-sm leading-relaxed text-black sm:text-[15px]">
        {paras.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}

type ProcessEditorialSectionsProps = {
  accentClassName: string;
};

/**
 * Ordre demandé : 9 → 5 → 8 → 3 → 4 → 2, puis 6, 7, 10.
 */
export function ProcessEditorialSections({
  accentClassName,
}: ProcessEditorialSectionsProps) {
  return (
    <>
      {/* 9 — Centré typographique (en premier) */}
      <section
        id="process-section-2"
        data-reveal-variant="process"
        className="section flex flex-col items-center justify-center bg-[#F2EEE4] px-5 py-24 text-center sm:px-10 sm:py-32"
        aria-labelledby="process-s9-heading"
      >
        <h2
          id="process-s9-heading"
          className="reveal max-w-[min(96vw,920px)] font-[family-name:var(--font-display)] text-[clamp(2rem,7.5vw,5rem)] font-normal uppercase leading-[0.88] tracking-tight text-black sm:text-[clamp(2.25rem,6.5vw,5.5rem)]"
        >
          <span
            className={`${accentClassName} mr-2 inline-block align-middle text-[clamp(2.5rem,9vw,6rem)] font-bold text-[#E24A2E] sm:mr-3`}
          >
            80%
          </span>
          <span className="align-middle">
            de la réussite d&apos;un site, c&apos;est la clarté du message — le
            reste, c&apos;est l&apos;exécution.
          </span>
        </h2>
      </section>

      {/* 5 — Centré : ligne script + titrage massif */}
      <section
        data-reveal-variant="process"
        className="section flex flex-col items-center justify-center bg-[#F2ECE4] px-5 py-24 text-center text-black sm:px-10 sm:py-32"
        aria-labelledby="process-s5-heading"
      >
        <p
          className={`reveal ${accentClassName} mb-6 max-w-2xl text-xl text-[#E24A2E] sm:text-2xl md:text-3xl`}
          id="process-s5-heading"
        >
          Je vous construis un système
        </p>
        <h2 className="reveal max-w-[min(96vw,900px)] font-[family-name:var(--font-display)] text-[clamp(2.5rem,9vw,6.5rem)] font-normal uppercase leading-[0.82] tracking-tight">
          <span className="block">Qui fonctionne</span>
          <span className="block">Pour votre activité</span>
        </h2>
      </section>

      {/* 8 — Split « Comment je travaille » + grille 2×2 */}
      <section
        data-reveal-variant="process"
        className="section bg-[#F2EDE4] px-5 py-20 sm:px-10 sm:py-28"
        aria-labelledby="process-s8-heading"
      >
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="reveal lg:col-span-5">
            <p
              id="process-s8-heading"
              className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-black sm:text-xs"
            >
              Comment je travaille
            </p>
            <div className="relative mt-6 inline-block">
              <span
                className={`${accentClassName} block text-[clamp(3rem,10vw,6rem)] leading-none text-[#E24A2E]`}
              >
                Mon
              </span>
              <span className="mt-1 block font-[family-name:var(--font-display)] text-[clamp(3.5rem,12vw,7.5rem)] font-normal uppercase leading-[0.8] tracking-tight text-black">
                processus
              </span>
            </div>
          </div>
          <div className="grid gap-12 border-t border-black pt-10 sm:gap-14 lg:col-span-7 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
            <div className="grid gap-12 md:grid-cols-2 md:gap-10">
              <Col
                title="Nous cartographions soigneusement votre projet avant de commencer la construction."
                body="Première étape : une compréhension approfondie de votre activité : ce que vous vendez, qui l’achète et ce qui les convainc. Vous obtenez un plan complet de votre site avant même le début de la conception : structure, objectif et fonction de chaque page."
              />
              <Col
                title="Maquette figée avant le début de la conception visuelle"
                body="Les écrans restent secondaires tant que la stratégie n’est pas claire. On définit positionnement, hiérarchie de contenu et parcours utilisateurs, pour que chaque bloc du site réponde à un besoin réel — et ne serve pas uniquement de décoration."
              />
            </div>
            <div className="grid gap-12 border-t border-black pt-12 md:grid-cols-2 md:gap-10 md:pt-14">
              <Col
                title="Un site qui semble coûter le prix que vous payez."
                body="Un design qui reflète votre expertise et vos tarifs. Épuré, affirmé et sans distractions visuelles, il permet à vos clients de percevoir instantanément votre compétence et votre fiabilité, sans avoir à deviner."
              />
              <Col
                title="Des sites web professionnels que vous pouvez facilement mettre à jour"
                body="Je crée des sites performants, pensés pour le référencement, avec une structure claire et un système de contenu adapté. Votre équipe peut mettre à jour services, études de cas et pages sans friction."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Split : visuel gauche + (01)(02) */}
      <section
        data-reveal-variant="process"
        className="section bg-[#F2EFE6] px-5 py-20 sm:px-10 sm:py-28"
        aria-labelledby="process-s3-heading"
      >
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal relative flex flex-col justify-center lg:col-span-5">
            <h2 id="process-s3-heading" className="sr-only">
              Réalité
            </h2>
            <div className="relative inline-block max-w-full">
              <p className="font-[family-name:var(--font-display)] text-[clamp(4rem,14vw,9rem)] font-normal uppercase leading-[0.82] tracking-tight text-black">
                Réalité
              </p>
              <span
                className={`${accentClassName} absolute bottom-[8%] right-[-4%] z-[1] text-[clamp(2.25rem,8vw,5rem)] font-bold leading-none text-[#E24A2E] sm:right-[-8%]`}
              >
                Vérifier
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-14 lg:col-span-7">
            <Col
              num="(01)"
              title="Aucune garantie « payez-moi, devenez riche »"
              body={[
                "Ici, pas de promesses du genre « investissez 5 000 € et gagnez-en 50 000 le mois prochain ». C’est du pur fantasme. Vous trouverez des tas de gens en ligne qui vendent ce genre de choses. Je ne compte pas en faire partie.",
                "Ce que je vous garantis : un site qui attire les bons clients, met en valeur votre expertise et inspire confiance avant même que quiconque ne vous contacte. Votre présence sur le marché et la qualité de votre offre sont les facteurs clés de votre réussite.",
              ]}
            />
            <Col
              num="(02)"
              title="Votre site web ne vous trouvera pas de clients par magie."
              body="Un site ne remplace pas une offre solide ni une prospection réfléchie. En revanche, il peut amplifier ce qui fonctionne déjà : clarifier votre message, rassurer, et faire gagner un temps précieux à chaque échange."
            />
          </div>
        </div>
      </section>

      {/* 4 — Note manuscrite + colonne (02)(03) */}
      <section
        data-reveal-variant="process"
        className="section bg-[#F2EFE9] px-5 py-20 sm:px-10 sm:py-28"
        aria-labelledby="process-s4-heading"
      >
        <h2 id="process-s4-heading" className="sr-only">
          Méthode et livrables
        </h2>
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="reveal flex max-w-md flex-col gap-6 lg:col-span-4">
            <p
              className={`${accentClassName} text-xl leading-snug text-[#E24A2E] sm:text-2xl`}
            >
              C&apos;est littéralement moi, en tant que chef d&apos;entreprise, qui
              dis tout ça.
            </p>
            <div
              className="relative max-w-[220px] rotate-[-3deg] border border-black/15 bg-white/60 p-3 shadow-sm"
              aria-hidden
            >
              <div className="aspect-[3/4] w-full rounded-sm bg-gradient-to-br from-neutral-200 to-neutral-300" />
              <p className="mt-2 font-sans text-[10px] uppercase tracking-wider text-neutral-500">
                Illustration — remplace par ton visuel
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-14 lg:col-span-8">
            <Col
              num="(02)"
              title="Votre site web ne vous trouvera pas de clients par magie."
              body="Un site ne remplace pas une offre solide ni une prospection réfléchie. En revanche, il peut amplifier ce qui fonctionne déjà : clarifier votre message, rassurer, et faire gagner un temps précieux à chaque échange."
            />
            <Col
              num="(03)"
              title="Nous cartographions soigneusement votre projet avant de commencer la construction."
              body="Première étape : une compréhension approfondie de votre activité — ce que vous vendez, qui l’achète et ce qui les convainc. Vous obtenez un plan complet de votre site avant même le début de la conception : structure, objectif et fonction de chaque page."
            />
          </div>
        </div>
      </section>

      {/* 2 — Deux colonnes (03) / (04) */}
      <section
        data-reveal-variant="process"
        className="section bg-[#F2EFE9] px-5 py-20 sm:px-10 sm:py-28"
        aria-labelledby="process-s2-heading"
      >
        <h2 id="process-s2-heading" className="sr-only">
          Confiance et décisions
        </h2>
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <Col
            num="(03)"
            title="Instaure la confiance avant même une seule conversation."
            body="Les clients constateront que votre site web reflète une entreprise réelle et professionnelle, et non quelque chose de bâclé, ce qui augmentera considérablement leur confiance en vous. Ainsi, vos affirmations concernant votre expertise auront du poids au lieu d’être remises en question."
          />
          <Col
            num="(04)"
            title="Transforme l’intérêt passager en décisions assurées."
            body="Le site filtrera les clients non compatibles, tout en rassurant les clients idéaux sur le fait que vous êtes le choix évident. Résultat : des échanges plus courts et des opportunités plus pertinentes et de meilleure qualité."
          />
        </div>
      </section>

      {/* 6 — Deux colonnes (prix / CMS) */}
      <section
        data-reveal-variant="process"
        className="section bg-[#F2EFE9] px-5 py-20 sm:px-10 sm:py-28"
        aria-labelledby="process-s6-heading"
      >
        <h2 id="process-s6-heading" className="sr-only">
          Qualité perçue et autonomie
        </h2>
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <Col
            title="Un site qui semble coûter le prix que vous payez."
            body="Un design qui reflète votre expertise et vos tarifs. Épuré, affirmé et sans distractions visuelles, il permet à vos clients de percevoir instantanément votre compétence et votre fiabilité, sans avoir à deviner."
          />
          <Col
            title="Des sites web professionnels que vous pouvez facilement mettre à jour"
            body="Je crée des sites performants, pensés pour le référencement, avec une structure claire et un système de contenu adapté. Votre équipe peut mettre à jour services, études de cas et pages sans friction — sans dépendre de moi pour chaque micro-modification."
          />
        </div>
      </section>

      {/* 7 — Deux colonnes retours / lancement */}
      <section
        data-reveal-variant="process"
        className="section bg-[#EAE6DD] px-5 py-20 sm:px-10 sm:py-28"
        aria-labelledby="process-s7-heading"
      >
        <h2 id="process-s7-heading" className="sr-only">
          Collaboration et après-lancement
        </h2>
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <Col
            title="Des retours sans drame"
            body="Vous voyez le travail par étapes, et non d’un seul coup. Nous affinons au fur et à mesure, avec des cycles de retours clairs, pour que le projet ne se transforme pas en cauchemar de révisions."
          />
          <Col
            title="Lancement et la suite"
            body="Je ne disparais pas après le lancement. Vous bénéficiez d’une période d’assistance après mise en ligne : corrections, optimisations et repères pour mettre à jour votre contenu sereinement, même en autonomie."
          />
        </div>
      </section>

      {/* 10 — En-tête deux tons + grille (01)(02) */}
      <section
        data-reveal-variant="process"
        className="section bg-[#F2F0E9] px-5 py-20 sm:px-10 sm:py-28"
        aria-labelledby="process-s10-heading"
      >
        <h2
          id="process-s10-heading"
          className="mx-auto mb-16 max-w-4xl text-center font-normal lg:mb-20"
        >
          <span className="reveal block font-[family-name:var(--font-display)] text-[clamp(2.25rem,8vw,4.5rem)] uppercase leading-[0.9] tracking-tight text-black">
            Un site aligné
          </span>
          <span
            className={`reveal mt-2 block ${accentClassName} text-[clamp(2rem,7vw,4rem)] font-bold leading-none text-[#E24A2E]`}
          >
            Sur votre niveau
          </span>
        </h2>
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <Col
            num="(01)"
            title="Un site web qui comble le fossé de perception"
            body="Un site conçu avec exigence évite l’effet « bas de gamme ». Hiérarchie claire, formulations nettes, preuves visibles : tout respire la qualité de votre travail avant même le premier échange."
          />
          <Col
            num="(02)"
            title="Plus besoin de vous justifier."
            body="Le site raconte une histoire cohérente et montre votre expertise sans surcharger. Vous passez moins de temps à expliquer votre valeur en rendez-vous : elle est déjà comprise."
          />
        </div>
      </section>
    </>
  );
}
