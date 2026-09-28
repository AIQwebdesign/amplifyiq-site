# AmplifyIQ redesign

An accessible website with an ice-blue cloud atmosphere, an interactive Spline robot, expanding-circle calls to action, a circular scroll reveal and a cinematic footer.

## Run locally

Run `pnpm install --frozen-lockfile`, `pnpm build`, then `pnpm start` and open http://127.0.0.1:4173. Deploy the contents of `dist` to a static host. The small React/TypeScript hero is built with esbuild; the main content remains semantic static HTML. `pnpm typecheck` checks the React component. The included lockfile pins dependencies.

## Audit and content provenance

The supplied workspace contained only an empty Git repository, with no application code or package manifest. The live amplifyiq.ie page was inspected on 25 September 2026. Its published build uses a bundled JavaScript application, Manrope/DM Mono/Oxanium fonts, and a violet, dark-ink palette. This rebuild keeps Manrope and DM Mono, the original AIQ logo/favicon, four published project screenshots and external links, four exact testimonial texts and attributions, the existing email, WhatsApp number and social links, six process stages, location, response promise and starting price. No business results or awards were added.

The FORM STUDIO comparison is explicitly labelled as a conceptual demonstration and is not a client case study. The canonical URL remains the business's existing public domain. No domain or live-site changes are made.

## Architecture

- `dist/index.html`: semantic, indexable page sections, local-business structured data and content.
- `dist/styles.css`: shared visual tokens, responsive layouts, focus states and reduced-motion presentation.
- `dist/responsive.css`: mobile-first sizing, touch targets and a shared desktop/mobile curtain reveal.
- `dist/app.js`: native dialog menu, accessible range comparison, manual testimonial navigation and scroll-driven process.
- `src/work.tsx` and `src/components/ui/3-d-coverflow-carousel.tsx`: landscape 3D project carousel using the original four project cards, with arrows, pagination, scoped keyboard controls, swipe and pausable autoplay. Replaces the pinned portfolio scroll. Static project cards remain available without JavaScript.
- `src/hero.tsx` and `src/components/ui/splite.tsx`: supplied lazy React Spline component with a transparent background, mobile sizing, loading/error states and lifecycle handling. Bundled to `dist/interactive`.
- `dist/refinements.css` and `dist/scroll-effects.js`: supplied liquid-glass, circle inversion and cinematic footer adapted to the existing page.
- `dist/components.js`: native WebGL adaptation of UI Capsule's Gradient Orb and a pointer-driven adaptation of Manu Arora's Glowing Effect from 21st.dev.
- `dist/assets`: preserved public brand and project assets plus the generated cloud background (the previous sculpture is retained but unused).
- `THIRD-PARTY.md`: component provenance and generated-image prompt. Retrieved component source is retained in `reference-components`.

Animation uses scheduled scroll updates and an orb rendering loop capped at 1.5 device pixel ratio and approximately 30fps. The orb and robot stop offscreen, when hidden and with reduced motion. The hero background uses a 12-second CSS cloud drift on desktop and mobile. The visible pause button was removed as requested. Reduced motion disables ambient animation and switches the portfolio and circle to ordinary/static layouts. Phones use the same swipeable coverflow and a native sticky curtain footer reveal, avoiding scroll-driven transforms and expensive blur. Short screens can scroll through the entire footer. Contact actions open email or WhatsApp; there is no backend form or first-party analytics tracker. The robot scene requires network access to the supplied Spline URL; static text and the cloud hero remain if its loading fails.

## Validation

TypeScript, JavaScript syntax and the production bundle are checked. Latest browser checks cover desktop and phone layouts, loaded Spline canvas, removal of the pause control, 21 glass links, both phases of the circle reveal and footer access. No captured browser errors were found. Earlier checks cover comparison keyboard input, testimonial navigation and menu behavior. Reduced-motion behavior is implemented but no operating-system preference emulation was run. No Lighthouse or Core Web Vitals score is claimed.

Responsive update: checked all sections at 320px and 390px phone widths, 768px tablet and 1440px desktop. Verified footer curtain geometry, reachable footer links, menu, comparison keyboard input, carousel controls and testimonials. These are desktop browser viewport checks, not physical iOS/Android device tests.

Hero update: user-supplied fantasy landscape image and native-scroll expanding video. hero-pingpong.mp4 contains 0-5 seconds forward followed by 5-0 seconds in reverse; the complete 10-second file loops. Mobile uses hero-pingpong-mobile.mp4. Styles: dist/expansion-hero.css; React: src/components/ui/scroll-expansion-hero.tsx. Local preview server supports MP4 byte ranges.

High-quality hero: hero-hq-loop.mp4 replaces the earlier desktop/mobile renditions. Both device sizes now use the supplied finalvid.mp4 at 2560x1440, 60fps, encoded as a silent 10-second forward/reverse loop. Service heading decorative arrows and the project slideshow play/pause icon were removed; carousel navigation and pause-on-interaction remain.
