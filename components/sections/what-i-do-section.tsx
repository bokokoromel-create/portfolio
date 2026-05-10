type WhatIDoSectionProps = {
  accentClassName: string;
};

/**
 * Bloc typographique type manifeste (fond crème, gros titres condensés).
 */
export function WhatIDoSection({ accentClassName }: WhatIDoSectionProps) {
  return (
    <section
      id="approche"
      className="section relative border-t border-neutral-900/10 bg-[#F2EDE4] px-5 py-24 sm:px-10 sm:py-32 md:py-40"
      aria-labelledby="approche-heading"
    >
      <p
        id="approche-heading"
        className="reveal mb-14 text-center font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-800 sm:text-xs"
      >
        Ce que je fais
      </p>

      <div className="mx-auto max-w-[1100px] text-center font-[family-name:var(--font-display)] font-black uppercase leading-[0.88] tracking-tight text-neutral-950">
        <p className="reveal text-[clamp(1.35rem,5.2vw,3.75rem)]">
          Je conçois des sites pour des
        </p>
        <p className="reveal text-[clamp(1.35rem,5.2vw,3.75rem)]">
          entreprises portées par l’expertise —
        </p>
        <p className="reveal text-[clamp(1.35rem,5.2vw,3.75rem)]">
          des interfaces qui rendent votre
        </p>
        <p className="reveal text-[clamp(1.35rem,5.2vw,3.75rem)]">valeur</p>
        <p className="reveal mt-2 text-[clamp(1.35rem,5.2vw,3.75rem)]">
          indéniable et le{" "}
          <span className={`${accentClassName} text-[#E24A2E]`}>oui !</span>
        </p>
      </div>
    </section>
  );
}
