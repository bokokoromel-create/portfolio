import { Bebas_Neue, Caveat } from "next/font/google";
import { HomeHeroMain } from "../components/home-hero-main";
import { SiteHeader } from "../components/site-header";
import { mainNav } from "../lib/main-nav";
import { AboutPreviewSection } from "../components/sections/about-preview-section";
import { ProjectFeatureSection } from "../components/sections/project-feature-section";
import { TestimonialsSection } from "../components/sections/testimonials-section";
import { WhatIDoSection } from "../components/sections/what-i-do-section";
import { WorkWithMeCtaSection } from "../components/sections/work-with-me-cta-section";
import { SiteFooter } from "../components/site-footer";

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

const heroLines = ["Développeur", "Web &", "Créatif"];

const heroLineClasses = [
  "block text-center text-[clamp(2rem,calc(5.5vw+0.9rem),11rem)] tracking-tight",
  "block text-center text-[clamp(1.875rem,calc(4.75vw+0.75rem),9.5rem)] tracking-tight",
  "block text-center text-[clamp(2rem,calc(5.5vw+0.9rem),11rem)] tracking-tight",
];

const tagline =
  "Je conçois des interfaces nettes et des expériences web soignées — du concept au déploiement.";

const CONTACT_EMAIL = "bokokoromel@gmail.com";

export default function Home() {
  return (
    <div
      className={`${display.variable} ${accent.variable} relative min-h-dvh overflow-x-hidden bg-[#F2EFE9] text-neutral-950`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[45vh] bg-gradient-to-t from-[#E24A2E] from-15% via-[#F2EFE9]/80 via-55% to-transparent"
        aria-hidden
      />

      <SiteHeader nav={mainNav} />

      <HomeHeroMain
        accentClassName={accent.className}
        heroLines={heroLines}
        heroLineClasses={heroLineClasses}
        tagline={tagline}
      />

      <WhatIDoSection accentClassName={accent.className} />
      <ProjectFeatureSection accentClassName={accent.className} />
      <TestimonialsSection accentClassName={accent.className} />
      <AboutPreviewSection accentClassName={accent.className} />
      <WorkWithMeCtaSection
        accentClassName={accent.className}
        contactEmail={CONTACT_EMAIL}
      />
      <SiteFooter nav={mainNav} contactEmail={CONTACT_EMAIL} />
    </div>
  );
}
