# AmplifyIQ website

The current AmplifyIQ marketing website for web design, redesign and digital growth in County Mayo, Ireland. It includes a scroll-controlled video hero, client marquee, services, Quay West Before/After screenshot comparison, project carousel, process presentation, testimonials, contact links, cookie settings and three legal pages. The canonical domain remains https://amplifyiq.ie/.

## Repository and preservation

Use this `amplifyiq-site` directory as the Git repository root, not its parent `AmplifyIQ` folder. The parent contains historical staging folders, archives and screenshots, and a separate empty Git repository. Those files remain untouched. All existing website code and legacy assets are retained here; no visual redesign was made for the account transfer.

**Do not delete or clean `dist/`.** This project uses a hybrid build: checked-in HTML, CSS, JavaScript and assets in `dist/` are source files, while React bundles and legal pages are generated into the same directory. A fresh checkout must include tracked `dist/` files before building.

The latest comparison uses `dist/assets/quay-west-before.png` and `dist/assets/quay-west-after.png`, referenced by `dist/index.html` and styled in `dist/redesign.css`.

## Build and local preview

Validated transfer environment: Node.js 24.19.0 and pnpm 11.19.0. From this directory:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm typecheck
node --test tests/consent.test.mjs
pnpm start
```

Open http://127.0.0.1:4173. The local server supports extensionless legal page paths and video byte ranges. Hostinger serves the static output directly; it does not need this Node server.

`build.mjs` copies the optimized hero video and its poster images from `src/assets/hero/`, bundles seven React/TypeScript entry points with esbuild into `dist/interactive/`, and runs `build-legal.mjs`. The legal generator uses `src/legal/legal-pack.md`, the homepage and cookie inventory to produce the privacy, cookie and terms pages. The original video and legacy assets remain preserved. Dependencies are pinned by `pnpm-lock.yaml`.

## Layout

- `dist/index.html`: homepage content, metadata and Before/After comparison.
- `dist/*.css`, `dist/*.js`, `dist/*.mjs`: shared styles, interactions and consent handling.
- `src/`: React components, source media and legal content.
- `dist/interactive/`: generated browser bundles.
- `dist/assets/`: deployed images, fonts and video, including retained legacy assets.
- `dist/privacy-policy/`, `dist/cookie-policy/`, `dist/terms-of-service/`: generated legal pages.
- `tests/consent.test.mjs`: consent behavior checks.
- `THIRD-PARTY.md`, `21ST-DEV.md`, `reference-components/`: component provenance and references.
- `PRIVACY-AUDIT.md`: existing privacy implementation notes and outstanding content considerations.

Contact uses email and WhatsApp links; there is no application backend. Some optional embedded content needs external network access. Review the existing privacy audit before publishing.

## Hostinger deployment (manual, only after approval)

1. Run the build and checks above. Keep all tracked static files in `dist/`.
2. Create a ZIP of the **contents** of `dist/`, without an enclosing `dist` directory. The account-transfer archive is `../AmplifyIQ-Hostinger-transfer-2026-10-01.zip`.
3. Back up the existing Hostinger website before replacing files.
4. In the intended domain's Hostinger File Manager, upload and extract the archive into its document root (normally `public_html`). Confirm `public_html/index.html` exists directly at the root, alongside `assets/`, `interactive/` and the legal page directories. Do not upload source, dependencies or Git metadata.
5. After approved deployment, check the homepage, both comparison screenshots, video, menu, contact links, cookie controls and all three legal URLs. Check HTTPS and clear relevant hosting/browser caches if needed.

Creating the ZIP does not upload or publish anything. Hostinger and ChatGPT Sites are separate hosting destinations; no DNS change is required for this local transfer.

## Connect the new GitHub repository

No remote is configured. Existing history is preserved on `main`. Create an empty repository under your intended GitHub user or business organization, without initializing a README, license or gitignore. Authenticate with an account that can write to it, then run from this directory (replace OWNER and REPOSITORY):

```sh
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

These commands are manual steps, not actions performed during transfer. GitHub ownership is separate from your ChatGPT login. Connect/authorize GitHub in the new ChatGPT business account if you want it accessible there, granting access to this repository. Set your preferred Git author name/email before future commits. Transfer commits use an explicit Codex automation identity because no local user identity was configured.

## Create a new ChatGPT Site

The inaccessible old account's `project_id` has been removed from `.openai/hosting.json`; the static output setting remains `dist`. The previous link is recoverable from Git history. Historical copies outside this repository have not been changed and must not be used to deploy this project.

In the new business account, open Sites and ask to create a new Site from this existing project, preserving its appearance. Request registration and a saved version only, **without deployment**. Let Sites assign the new project ID; do not reuse the old one or invent an ID. Once registered, verify the new ID is written to this repository's `.openai/hosting.json` and commit that update. Review the saved version and approve publishing separately. Creating a GitHub repository does not automatically create a Site.

Official guidance: https://learn.chatgpt.com/docs/sites

## Transfer verification scope

Run a fresh production build, TypeScript checks and the existing consent tests. Verify root-level `dist/index.html`, its local assets and the ZIP contents. Website presentation files and the latest screenshots must remain unchanged from preservation commit `7b0a987`. These checks are not a new full browser, accessibility or performance audit.
