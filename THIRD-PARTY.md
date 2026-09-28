# Component provenance

Components were retrieved through the user's connected 21st.dev account on 25 September 2026. Original TSX is retained in `reference-components/` for traceability; only the adapted implementation in `dist/components.js` ships to the browser.

- [Gradient Orb by UI Capsule](https://21st.dev/@uicapsule/components/gradient-orb), demo 18486. The retrieved GLSL noise, light attenuation, hue conversion and orb rendering are reused. Changes: native WebGL renderer instead of React Three Fiber; blue/ice palette; slower breathing; 30fps cap; bounded pixel ratio; offscreen/hidden-tab pause; reduced-motion still frame; manual pause; static fallback.
- [Glowing Effect by Manu Arora / Aceternity](https://21st.dev/@manuarora700/components/glowing-effect), demo 1567. The pointer-to-centre angle, inactive zone and proximity calculation are adapted to vanilla JavaScript with a conic border mask. Changes: restrained blue palette; interaction only on two service surfaces; reduced-motion and touch-device opt-out; no React/Motion dependency.

Reference screenshots from Roobinium and HALO LAB on Dribbble were used for composition and mood only. They are not shipped as site assets.

The original sculpture in `dist/assets/amplify-sculpture.png` was generated with the built-in ImageGen tool. Prompt: a premium landscape 3D image of a monumental folded optical-glass and brushed-chrome A on the right, layered glass amplification sheets, icy-blue sky, midnight-navy mist and reflective floor, empty left for live typography, no text or interface. Original generation retained outside the project.

## User-supplied components, 25 September update

- SplineScene: the supplied lazy React wrapper is implemented in `src/components/ui/splite.tsx`, mounted as a React island by `src/hero.tsx`. Uses the supplied Spline scene at `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`. Transparent scene background, mobile zoom, reduced-motion, hidden-tab and offscreen lifecycle handling are added. The scene remains served by Spline and requires network access; failed loading has a text fallback.
- LiquidButton: reused layered inset highlights and the supplied SVG turbulence/displacement/blur filter. Adapted to existing semantic links with one shared filter ID instead of a duplicate filter per button. CSS backdrop blur provides the base treatment where SVG backdrop filtering is unsupported.
- InversionCircleScrollAnimation: preserved the Power4 rise, squared expansion and matching circular text clip. Adapted to normal page scrolling, AmplifyIQ copy, ice/navy colors and a reduced-motion static presentation.
- CinematicFooter: adapted curtain reveal, aurora, grid, scrolling marquee, giant background type, scroll-driven entrance and magnetic links to the existing static page. Native scroll and CSS replace GSAP. Desktop and mobile share a clipped, translated curtain reveal; taller footer content scrolls naturally on short screens. The marquee has been removed at the user's request. Original demo app-store, SOBERS and Volvox content is replaced with the business's real contact/social links.
- The two supplied liquid button prompts are duplicates. Their unrelated MetalButton example is not used.

The four distinct original prompts are archived in `reference-components/supplied-*.md`. React/TypeScript is used for the robot; the rest preserves the site's HTML/CSS architecture. A full Shadcn/Tailwind migration is unnecessary for these scoped adaptations.

Cloud asset: `dist/assets/amplify-clouds.png`, edited using built-in ImageGen from the previous sculpture image. Prompt: Remove ALL glass and chrome A sculptures, all architectural objects, and their reflections completely. Reconstruct the missing environment naturally. Preserve the beautiful pale icy blue cloudy sky across the upper half, drifting layered photographic clouds through the middle frame, and dark navy reflective horizon and gently rippling water at the bottom. Keep the original wide landscape framing, cool blue palette, photographic cloud texture, soft natural lighting, and atmospheric depth. Only sky, clouds and dark reflective water; no text, letters, sculptures, robots, buildings, objects, logos, or watermark.

The visible pause control was removed at the user's request. Operating-system reduced-motion preferences continue to stop ambient animations.

## Selected Work coverflow

`src/components/ui/3-d-coverflow-carousel.tsx` adapts the user's supplied React CoverFlowCarousel (archived as `reference-components/supplied-coverflow.md`). Preserves circular indexing, perspective, scaled/rotated neighboring slides, screenshot ambience, autoplay, swipe, navigation arrows and pagination. Replaces food/demo content with the four original project cards and their exact destination URLs. Landscape screenshots use their native 1265:712 aspect ratio and contain sizing. Content sits below the screenshot; colors and CTA styling match AmplifyIQ.

Keyboard navigation is scoped to the carousel; inactive slides are inert. Autoplay starts 900ms after at least 15% of the carousel enters view, then advances every three seconds. Hover does not block playback. Autoplay pauses on keyboard-visible focus, hidden tabs, offscreen and reduced-motion, and stops after manual navigation until resumed. A visible slideshow control is local to Selected Work. The former pinned horizontal-scroll implementation is removed. Original HTML project cards remain as the no-JavaScript fallback and are the source of the React carousel's project data.

## Mobile Circle Menu

src/components/ui/circle-menu.tsx adapts the supplied CircleMenu prompt (reference-components/supplied-circle-menu.md), retaining radial positions, staggered spring expansion, rotating collapse and a pulsing close trigger. Uses Framer Motion and Lucide icons. Adapted to AmplifyIQ's six section anchors and ice-blue glass palette. A native modal dialog adds focus containment, Escape dismissal and scroll locking; links have persistent touch labels, no nested buttons, and reduced-motion support. Desktop navigation is unchanged. Existing CSS is used instead of a Tailwind/Shadcn migration; React UI components remain under src/components/ui.

## Unique testimonials

src/components/ui/unique-testimonial.tsx adapts the supplied Unique Testimonial component (reference-components/supplied-unique-testimonial.md): centered quote, blur/fade transitions, role caption and expanding author pills. The four existing quotes and attributions are read from semantic HTML without edits. Initials replace demo portraits so no unrelated people are represented as customers. Adds pressed-state labels, keyboard focus expansion, cancellable transition timers and reduced-motion support. Existing React/TypeScript and CSS architecture is retained; no additional dependencies or Tailwind/Shadcn migration are needed.
Testimonial autoplay advances every three seconds while visible. Touching the quote or selecting/focusing an author permanently switches to manual mode until reload. Hidden tabs, offscreen sections and reduced-motion preferences pause automatic playback.
Redesign comparison update: original code-native SVG pavilion illustration (dist/assets/form-pavilion.svg), editorial typography, glass concept card, pointer parallax and animated Before/Compare/Amplified presets. The architectural project remains explicitly a conceptual demonstration. Existing range keyboard/touch control and reduced-motion behavior are preserved.

## Motion CTA and mobile performance update

The supplied MotionButton expanding-circle and moving-arrow interaction is adapted in src/components/ui/motion-button.tsx with semantic anchors, Lucide ArrowRight, visible keyboard focus and reduced-motion support. Static page CTAs use the shared content renderer; coverflow uses the full React component. Existing CSS replaces Tailwind utility classes, so clsx and tailwind-merge are not required. Mobile footer now uses native CSS sticky positioning beneath the preceding page, with no scroll-driven footer transforms, animated blur or SVG glass refraction. Long footers remain scrollable on short screens. The header uses the user's transparent AIQ logo. SEO metadata, service catalog schema, sitemap and robots file target the existing amplifyiq.ie canonical domain.
Hero alignment update: removed studio badge and changed intro to Design is Everything. Mobile hero uses normal-flow grid rows, stable small-viewport height, and a 16px gap between CTA and robot canvas. Native sticky footer reveal now applies at all widths; scroll-driven footer transforms and ambient blur are removed on laptop/tablet too.

## Scroll-expansion video hero
The supplied ScrollExpandMedia prompt is archived in reference-components/supplied-scroll-expansion.md and adapted in src/components/ui/scroll-expansion-hero.tsx. Native page scrolling expands a clipped video while the title separates. The user supplied both hero background and video. The first five seconds were encoded forward and backward into a silent ten-second H.264 loop, with a 960px mobile rendition. Reduced-motion, hidden-tab and offscreen playback handling are included. The former Spline hero is no longer mounted.

## Glyph Portal process section
Adapted the user-supplied Glyph Portal by Christian Katzmann (MIT, 2026); copyright and origin notice are retained in src/components/ui/glyph-portal.tsx. The full supplied prompt is archived in reference-components/supplied-glyph-portal.md. Native page scroll drives the same SVG glyph camera on desktop and mobile with stable small-viewport sizing. The PROCESS instance uses the existing six stage descriptions and a blue landscape backdrop. Reduced-motion and no-JavaScript reading layouts remain available. No new dependencies were required; the existing React/TypeScript components/ui structure and CSS are retained.

Client strip and social update: Bubblehub.ie was inspected as a layout reference for its monochrome moving strip and social rail. AmplifyIQ retains its own client names, Facebook/Instagram destinations, navy palette and original wordmark styling. Added Wonder Dent Repair to the five-client strip; motion pauses on hover/focus and becomes a static wrapped list for reduced-motion preferences. User-provided Digital Growth copy and tags replace the former Grow introduction.
