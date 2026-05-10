import Link from "next/link";
import { SlideDoubleLabel } from "./slide-double-label";

export type FooterNavItem = { href: string; label: string };

export type SiteFooterProps = {
  nav: FooterNavItem[];
  contactEmail: string;
  /** Liens réseaux — remplace les href par tes profils. */
  socialLinks?: { label: string; href: string }[];
};

const defaultSocialLinks: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Dribbble", href: "https://dribbble.com/" },
];

export function SiteFooter({
  nav,
  contactEmail,
  socialLinks = defaultSocialLinks,
}: SiteFooterProps) {
  const menuLinks: FooterNavItem[] = [
    { href: "/", label: "Accueil" },
    ...nav,
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <footer
      className="section relative overflow-hidden bg-[linear-gradient(180deg,#F2EFE9_0%,#F2EFE9_24%,#e8b09c_52%,#E24A2E_92%,#c73d24_100%)] text-neutral-950"
      aria-labelledby="footer-name-heading"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 pb-[max(2.5rem,calc(2.5rem+env(safe-area-inset-bottom,0px)))] pt-14 sm:px-8 md:grid-cols-3 md:gap-10 md:pb-[max(1.5rem,calc(1.5rem+env(safe-area-inset-bottom,0px)))]">
        <div className="reveal">
          <p className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-600 sm:text-xs">
            (Menu)
          </p>
          <ul className="flex flex-col gap-3 font-sans text-sm font-medium text-neutral-900">
            {menuLinks.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="group relative inline-block outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2EFE9]"
                >
                  <SlideDoubleLabel label={item.label} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal">
          <p className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-600 sm:text-xs">
            (Réseaux sociaux)
          </p>
          <ul className="flex flex-col gap-3 font-sans text-sm font-medium text-neutral-900">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2EFE9]"
                >
                  <SlideDoubleLabel label={item.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal md:text-right">
          <p className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-600 sm:text-xs">
            (Dites « bonjour »)
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="group relative inline-block font-sans text-sm font-medium text-neutral-900 outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2EFE9]"
          >
            <SlideDoubleLabel
              label={contactEmail}
              lineClassName="items-center justify-end"
            />
          </a>
        </div>
      </div>

      <div className="relative px-5 pb-[max(1.5rem,calc(1.5rem+env(safe-area-inset-bottom,0px)))] sm:px-8">
        <h2
          id="footer-name-heading"
          className="reveal mx-auto max-w-[100vw] text-center font-[family-name:var(--font-display)] text-[clamp(2.75rem,12vw,9.5rem)] font-normal uppercase leading-[0.88] tracking-tight text-neutral-950"
        >
          Romel Matsonda
        </h2>

        <div className="reveal mx-auto mt-16 max-w-6xl border-t border-white/25 pt-8 font-sans text-[11px] text-white/95 sm:text-xs md:mt-24 md:pt-10">
          <p>©2026 Romel Matsonda</p>
        </div>
      </div>
    </footer>
  );
}
