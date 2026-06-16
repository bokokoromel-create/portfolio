import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  /** Hauteur du logo (classes Tailwind, ex. `h-8`). */
  className?: string;
  asLink?: boolean;
  priority?: boolean;
};

export function SiteLogo({
  className = "h-8 w-auto sm:h-9",
  asLink = true,
  priority = false,
}: SiteLogoProps) {
  const image = (
    <Image
      src="/rm2.png"
      alt="RM — Romel Matsonda"
      width={96}
      height={48}
      className={`object-contain object-left ${className}`}
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
