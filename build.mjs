import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
process.chdir(fileURLToPath(new URL('.', import.meta.url)));
await mkdir('dist/assets/hero', { recursive: true });
// Keep the original upload intact; only the scrub-optimized encode is shipped.
// Fail the build if it is missing instead of silently publishing the original.
const optimizedVideo = 'src/assets/hero/amplify-scroll.optimized.mp4';
const videoVersion = createHash('sha256').update(await readFile(optimizedVideo)).digest('hex').slice(0, 12);
await copyFile(optimizedVideo, 'dist/assets/hero/amplify-scroll.mp4');
for (const asset of ['amplify-first.webp', 'amplify-final.webp']) {
  await copyFile(`src/assets/hero/${asset}`, `dist/assets/hero/${asset}`);
}
await build({ entryPoints: ['src/hero.tsx', 'src/work.tsx', 'src/navigation.tsx', 'src/testimonials.tsx', 'src/buttons.tsx', 'src/process.tsx', 'src/clients.tsx'], outdir: 'dist/interactive', bundle: true, splitting: true, format: 'esm', minify: true, target: 'es2022', sourcemap: false, define: { __HERO_VIDEO_VERSION__: JSON.stringify(videoVersion) } });
await import('./build-legal.mjs');

// Version entry scripts and styles so returning visitors receive each release.
for (const page of ['index.html', 'privacy-policy/index.html', 'cookie-policy/index.html', 'terms-of-service/index.html']) {
  let html = await readFile(`dist/${page}`, 'utf8');
  const references = [...html.matchAll(/\b(?:src|href)="([^"?#]+\.(?:css|js|mjs))(?:\?[^"#]*)?"/g)];
  for (const match of references) {
    const url = match[1];
    if (/^(?:https?:)?\/\//.test(url)) continue;
    const file = url.startsWith('/') ? path.join('dist', url.slice(1)) : path.join('dist', path.dirname(page), url);
    const version = createHash('sha256').update(await readFile(file)).digest('hex').slice(0, 12);
    html = html.replace(match[0], match[0].replace(/=".*"$/, `="${url}?v=${version}"`));
  }
  await writeFile(`dist/${page}`, html);
}

// Real static entry points support direct visits/refreshes on Hostinger.
for (const section of ['home', 'about', 'services', 'work', 'process', 'testimonials', 'location', 'contact']) {
  await mkdir(`dist/${section}`, { recursive: true });
  await copyFile('dist/index.html', `dist/${section}/index.html`);
}
