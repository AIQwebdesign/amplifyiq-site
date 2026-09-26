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
- CinematicFooter: adapted curtain reveal, aurora, grid, scrolling marquee, giant background type, scroll-driven entrance and magnetic links to the existing static page. Native scroll and CSS replace GSAP. Mobile uses a normal-flow footer to keep every link reachable. Original demo app-store, SOBERS and Volvox content is replaced with the business's real contact/social links.
- The two supplied liquid button prompts are duplicates. Their unrelated MetalButton example is not used.

The four distinct original prompts are archived in `reference-components/supplied-*.md`. React/TypeScript is used for the robot; the rest preserves the site's HTML/CSS architecture. A full Shadcn/Tailwind migration is unnecessary for these scoped adaptations.

Cloud asset: `dist/assets/amplify-clouds.png`, edited using built-in ImageGen from the previous sculpture image. Prompt: Remove ALL glass and chrome A sculptures, all architectural objects, and their reflections completely. Reconstruct the missing environment naturally. Preserve the beautiful pale icy blue cloudy sky across the upper half, drifting layered photographic clouds through the middle frame, and dark navy reflective horizon and gently rippling water at the bottom. Keep the original wide landscape framing, cool blue palette, photographic cloud texture, soft natural lighting, and atmospheric depth. Only sky, clouds and dark reflective water; no text, letters, sculptures, robots, buildings, objects, logos, or watermark.

The visible pause control was removed at the user's request. Operating-system reduced-motion preferences continue to stop ambient animations.

## Selected Work coverflow

`src/components/ui/3-d-coverflow-carousel.tsx` adapts the user's supplied React CoverFlowCarousel (archived as `reference-components/supplied-coverflow.md`). Preserves circular indexing, perspective, scaled/rotated neighboring slides, screenshot ambience, autoplay, swipe, navigation arrows and pagination. Replaces food/demo content with the four original project cards and their exact destination URLs. Landscape screenshots use their native 1265:712 aspect ratio and contain sizing. Content sits below the screenshot; colors and CTA styling match AmplifyIQ.

Keyboard navigation is scoped to the carousel; inactive slides are inert. Autoplay starts 900ms after at least 15% of the carousel enters view, then advances every three seconds. Hover does not block playback. Autoplay pauses on focus, hidden tabs, offscreen and reduced-motion, and stops after manual navigation until resumed. A visible slideshow control is local to Selected Work. The former pinned horizontal-scroll implementation is removed. Original HTML project cards remain as the no-JavaScript fallback and are the source of the React carousel's project data.
