import { Bebas_Neue, Caveat } from "next/font/google";
import { AboutClotheslineHero } from "@/components/about/about-clothesline-hero";
import { AboutPageSections } from "@/components/about/about-page-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkWithMeCtaSection } from "@/components/sections/work-with-me-cta-section";
import { mainNav } from "@/lib/main-nav";
import { CONTACT_EMAIL } from "@/lib/site";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const accent = Caveat({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-accent",
});

export const metadata = {
  title: "À propos — Romel Matsonda",
  description:
    "Romel Matsonda — sites web pour entreprises portées par l’expertise. Parcours, philosophie et façon de travailler.",
};

export default function AProposPage() {
  return (
    <div
      className={`${display.variable} ${accent.variable} relative min-h-dvh overflow-x-hidden bg-[#E24A2E] text-neutral-950`}
    >
      <SiteHeader nav={mainNav} />
      <AboutClotheslineHero />
      <AboutPageSections accentClassName={accent.className} />
      <WorkWithMeCtaSection
        accentClassName={accent.className}
        contactEmail={CONTACT_EMAIL}
      />
      <SiteFooter nav={mainNav} contactEmail={CONTACT_EMAIL} />
    </div>
  );
}
