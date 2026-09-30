import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  /** Hauteur du logo (classes Tailwind, ex. `h-8`). */
  className?: string;
  asLink?: boolean;
  priority?: boolean;
  /** `dark` = logo noir (fonds clairs), `light` = logo blanc (fonds sombres). */
  tone?: "dark" | "light";
  /** Charge les deux versions et fond de l'une à l'autre quand `tone` change. */
  switchable?: boolean;
};

const LOGO_SRC = { dark: "/rm.png", light: "/rm2.png" } as const;

export function SiteLogo({
  className = "h-8 w-auto sm:h-9",
  asLink = true,
  priority = false,
  tone = "dark",
  switchable = false,
}: SiteLogoProps) {
  const imageClassName = `object-contain object-left ${className}`;

  const image = switchable ? (
    <span className="relative inline-flex">
      <Image
        src={LOGO_SRC.dark}
        alt="RM — Romel Matsonda"
        width={96}
        height={48}
        className={`${imageClassName} transition-opacity duration-300 ${tone === "dark" ? "opacity-100" : "opacity-0"}`}
        priority={priority}
      />
      <Image
        src={LOGO_SRC.light}
        alt=""
        aria-hidden
        width={96}
        height={48}
        className={`${imageClassName} absolute inset-0 transition-opacity duration-300 ${tone === "light" ? "opacity-100" : "opacity-0"}`}
        priority={priority}
      />
    </span>
  ) : (
    <Image
      src={LOGO_SRC[tone]}
      alt="RM — Romel Matsonda"
      width={96}
      height={48}
      className={imageClassName}
      priority={priority}
    />
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="inline-flex shrink-0 items-center outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-neutral-950/25 focus-visible:ring-offset-2"
      >
        {image}
      </Link>
    );
  }

  return <span className="inline-flex shrink-0 items-center align-middle">{image}</span>;
}
