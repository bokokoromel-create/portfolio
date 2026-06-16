# Effets du portfolio — inventaire numéroté

Liste des effets visuels, animations et interactions actuellement présents dans le projet (fichiers concernés entre parenthèses).

---

## Scroll global

1. **Lenis — défilement inertiel**  
   Scroll fluide (`duration: 1.2`, molette lissée), RAF piloté par GSAP au lieu du RAF natif Lenis.  
   (`components/scroll/smooth-scroll-provider.tsx`)

2. **Lenis ↔ ScrollTrigger**  
   À chaque événement scroll Lenis : `ScrollTrigger.update()` pour que les repères de scroll restent alignés.  
   (`components/scroll/smooth-scroll-provider.tsx`)

3. **GSAP `ticker` + `lagSmoothing(0)`**  
   Le ticker GSAP appelle `lenis.raf(time * 1000)` ; `lagSmoothing(0)` évite le lissage de latence du ticker.  
   (`components/scroll/smooth-scroll-provider.tsx`)

4. **Rafraîchissement ScrollTrigger**  
   `ScrollTrigger.refresh()` au montage (requestAnimationFrame + timeout), listener `refresh` pour `lenis.resize()`.  
   (`components/scroll/smooth-scroll-provider.tsx`)

5. **Événement personnalisé `lenis:scroll`**  
   `window.dispatchEvent` avec la position de scroll pour synchroniser d’autres composants (ex. header).  
   (`components/scroll/smooth-scroll-provider.tsx`)

---

## Révélations au scroll (sections)

6. **Reveal par section (`.section` / `.reveal`)**  
   Pour chaque `<section class="section">`, tous les descendants `.reveal` sont animés au scroll avec **GSAP `ScrollTrigger`** (`toggleActions: play none none none`, `immediateRender: true`). **Désactivé** si `prefers-reduced-motion: reduce`.  
   (`components/scroll/section-reveal-init.tsx`)

   - **Comportement standard** (accueil, footer, CTA, etc.) : état initial `y: 60`, `opacity: 0`, `clipPath: inset(100% 0 0 0)` → entrée vers la position finale, **`duration: 1`**, **`stagger: 0.1`**, ease **`power3.out`**, fenêtre **`start: top 80%`** / **`end: top 30%`**.

   - **Variante page « Mon processus »** : les sections portent **`data-reveal-variant="process"`** (`components/process/process-hero.tsx`, `components/process/process-editorial-sections.tsx`). Chaque section alterne une **translation horizontale** d’entrée (**`-44px` / `+44px`**), **`y: 52`**, **`filter: blur(10px)`** → **`blur(0px)`**, même **clip-path** vertical, **`duration: 1.12`**, **`stagger: 0.12`**, ease **`power4.out`**, fenêtre **`start: top 82%`** / **`end: top 28%`**. En fin de tween : **`clearProps: "filter,x"`** sur les éléments animés.

   - **Changement de route** : le hook utilise **`usePathname()`** (Next.js) en dépendance du `useLayoutEffect` — à chaque navigation, le contexte GSAP est **reconstruit** et **`ScrollTrigger.refresh()`** est rappelé, pour que les sections des pages visitées ensuite (ex. `/processus`) aient bien leurs animations.

---

## Hero

7. **Masked reveal — lignes du titre**  
   `MaskedRevealLines` : chaque ligne dans un masque overflow, animation GSAP `yPercent` 100 → 0 en cascade (ease `power4.out`).  
   (`components/masked-reveal.tsx`, `components/home-hero-main.tsx`)

8. **Masked reveal — mots du sous-titre**  
   `MaskedRevealWords` : même principe par mot pour la accroche sous le titre.  
   (`components/masked-reveal.tsx`, `components/home-hero-main.tsx`)

9. **Tampons « Oui ! » en trail au pointeur**  
   Sur la zone hero : entrée / mouvement du pointeur crée des tampons espacés (distance mini, file limitée), rotation et échelle aléatoires, police accent + couleur orange ; disparition via `onAnimationEnd`.  
   Désactivé si `prefers-reduced-motion: reduce`.  
   (`components/home-hero-main.tsx`)

10. **Keyframes CSS `oui-stamp-pop`**  
    Animation d’opacité + échelle sur la classe `.oui-stamp-label` (apparition, léger bounce, puis disparition).  
    (`app/globals.css`)

---

## En-tête (header)

11. **Header « sticky » selon le scroll**  
    Au-delà d’un seuil de pixels : fond flouté, bordure, ombre, paddings réduits ; tailles de typo logo / nav / CTA adaptées.  
    Écoute `lenis:scroll` et `scroll` fenêtre.  
    (`components/site-header.tsx`)

12. **Double libellé + slide vertical (`SlideDoubleLabel`)**  
    Deux copies du texte empilées ; au survol / focus, translation `-translate-y-1/2` avec courbe `cubic-bezier(0.33,1,0.68,1)` ; respect `motion-reduce`.  
    Utilisé pour les liens de navigation et le bouton « Discutons ».  
    (`components/slide-double-label.tsx`, `components/site-header.tsx`)

---

## Boutons / liens type CTA

13. **Bouton CTA contact « Dis oui ! »**  
    Même `SlideDoubleLabel` que le header + survol `hover:bg-neutral-100` sur le bouton blanc.  
    (`components/sections/work-with-me-cta-section.tsx`)

14. **Lien e-mail sous le CTA**  
    Transitions couleur + soulignement au survol.  
    (`components/sections/work-with-me-cta-section.tsx`)

---

## Section portfolio mise en avant

15. **Bouton « Voir le projet »**  
    Transition de couleurs : fond blanc → transparent, texte sombre → blanc au survol.  
    (`components/sections/project-feature-section.tsx`)

---

## Témoignages & FAQ

16. **ScrollTrigger — titre de section témoignages**  
    `fromTo` vertical + opacité sur le bloc titre (`start: top 78%`, lecture unique).  
    (`components/sections/testimonials-section.tsx`)

17. **ScrollTrigger — cartes témoignages**  
    `fromTo` (y, opacité, scale) avec `stagger` sur les cartes empilées (`start: top 72%`).  
    (`components/sections/testimonials-section.tsx`)

18. **ScrollTrigger — lignes FAQ**  
    Entrée en cascade des items FAQ (`start: top 90%` sur le bloc FAQ).  
    (`components/sections/testimonials-section.tsx`)

19. **Accordéon FAQ**  
    Ouverture / fermeture via `grid-template-rows` (`0fr` ↔ `1fr`) + transition 300 ms.  
    (`components/sections/testimonials-section.tsx`)

20. **Icône chevron FAQ**  
    Rotation 180° quand la question est ouverte (`transition-transform`).  
    (`components/sections/testimonials-section.tsx`)

---

## Pied de page

21. **`SlideDoubleLabel` sur les liens du footer**  
    Menu, réseaux sociaux et adresse e-mail : même effet de double ligne au survol / focus que la nav.  
    (`components/site-footer.tsx`, `components/slide-double-label.tsx`)

---

## Fond décoratif (page d’accueil)

22. **Dégradé vertical en arrière-plan (hero)**  
    Calque fixe en bas de viewport (crème → orange très léger) derrière le contenu ; pas d’animation, effet visuel statique.  
    (`app/page.tsx`)

23. **Dégradé du footer**  
    Fond `linear-gradient` crème → pêche → orange sur toute la hauteur du pied de page.  
    (`components/site-footer.tsx`)

---

## Composant présent mais non branché sur la page actuelle

24. **`MaskedRevealChars`**  
    Révélation caractère par caractère (yPercent), avec variante pilotée par une prop `active` ; exporté dans `masked-reveal.tsx` mais **non utilisé** dans les pages actuelles.  
    (`components/masked-reveal.tsx`)

---

## Page « Mon processus » (`/processus`)

25. **Contenu éditorial + mêmes effets reveal « process »**  
    La route **`app/processus/page.tsx`** enchaîne hero, blocs éditoriaux numérotés en colonnes, CTA et footer. Les **transitions visuelles entre sections** sont celles du point **6** (variante `data-reveal-variant="process"`).  
    (`app/processus/page.tsx`, `components/process/`)

---

*Dernière mise à jour : aligné sur `section-reveal-init.tsx` (variante process + `usePathname`) et pages du dépôt.*
