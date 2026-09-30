# Privacy implementation audit — 30 September 2026

## Current authored site

- No Google Analytics, GTM, Meta/TikTok/LinkedIn/Bing pixel, Hotjar, Clarity, advertising, conversion or analytics integration was found in the authored source or reachable production JavaScript.
- Google Maps was an unconditional iframe. It is now absent from HTML and created only after Functional consent. Withdrawal removes the iframe immediately.
- Google Fonts requests were replaced by local copies of the same seven font faces; OFL licences are included with those assets.
- Hero video, project screenshots and other visual assets are first-party files. Legacy Spline bundles in the build directory are not referenced by current entrypoints and are not active embeds.
- Facebook, Instagram, WhatsApp and portfolio destinations are ordinary links, not embeds or pixels.
- There is no enquiry/quotation submission form or newsletter subscription on this site. Contact links open email or WhatsApp. No invented form notice or marketing opt-in was added.
- The only authored persistent browser record is `amplifyiq_consent` in localStorage. It contains category booleans, timestamp, expiry and policy version, without a visitor ID. Logical expiry is 180 days; invalid/expired records are removed when checked.
- Google may use provider-controlled cookies/storage after map consent. Individual cookie names and durations were not asserted without evidence. The inventory identifies the actual embed, its purpose and provider, and explains this limitation. Google-owned cookies cannot be deleted by AmplifyIQ's origin.
- Hosting infrastructure/account authentication is outside this static application's source. Re-audit production infrastructure if hosting, scripts or providers change; do not treat this code audit as a guarantee about services injected by another host.

## Implementation and validation

- First-visit browser DOM: no iframe and no external script, image, stylesheet or preconnect load elements. All three optional categories unchecked; unused Analytics and Marketing are disabled and labelled not in use.
- Browser checks: Accept All enables the map; custom Functional choice persists across pages; Reject/withdrawal removes the iframe; rejection survives reload; settings accessible from footer and legal pages; keyboard activation and Escape work.
- Node tests cover serialization, rejection, withdrawal, exact 180-day expiry, old policy versions, malformed records and future timestamps.
- Legal pages have clean directory routes, one H1, headings/contents navigation, canonical/description metadata and sitemap entries. Mobile layout checked for horizontal overflow.
- The supplied legal text is preserved in `src/legal/legal-pack.md`. The generator omits unknown legal-identity lines and adjusts the two incomplete introductory labels. It adds a clearly separated current-technology inventory; it does not invent business details. Source legal content is not copied into the public build.

## Maintenance

Supply the legal operator, structure, full address and applicable registration/VAT details before treating the disclosures as complete. Rebuild after updating the legal source. Business practices and supplied terms still need the owner's review.

New optional integrations must be gated before any script/iframe/network initiation, documented in the inventory, and require a new policy version in `dist/consent-core.mjs`. Do not activate future analytics merely because Functional consent exists. There are currently no optional first-party cookies to delete.

Irish DPC references used: https://www.dataprotection.ie/en/dpc-guidance/guidance-cookies-and-other-tracking-technologies and https://www.dataprotection.ie/en/faqs/cookies/my-website-or-app-uses-cookies-and-other-tracking-do-i-have-get-consent-users
