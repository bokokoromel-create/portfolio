import { Bebas_Neue, Caveat } from "next/font/google";
import { ProcessEditorialSections } from "@/components/process/process-editorial-sections";
import { ProcessHero } from "@/components/process/process-hero";
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
  title: "Mon processus — Romel Matsonda",
  description:
    "Découverte, design, développement et mise en ligne — la façon dont j’accompagne vos projets web.",
};

export default function ProcessusPage() {
  return (
    <div
      className={`${display.variable} ${accent.variable} relative min-h-dvh overflow-x-clip bg-[#F2ECE4] text-neutral-950`}
    >
      <SiteHeader nav={mainNav} />
      <ProcessHero accentClassName={accent.className} />
      <ProcessEditorialSections accentClassName={accent.className} />
      <WorkWithMeCtaSection
        accentClassName={accent.className}
        contactEmail={CONTACT_EMAIL}
      />
      <SiteFooter nav={mainNav} contactEmail={CONTACT_EMAIL} />
    </div>
  );
}
