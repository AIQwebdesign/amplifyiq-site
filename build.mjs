import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { mkdir, copyFile, readFile } from 'node:fs/promises';
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
await build({ entryPoints: ['src/hero.tsx', 'src/work.tsx', 'src/navigation.tsx', 'src/testimonials.tsx', 'src/buttons.tsx', 'src/process.tsx'], outdir: 'dist/interactive', bundle: true, splitting: true, format: 'esm', minify: true, target: 'es2022', sourcemap: false, define: { __HERO_VIDEO_VERSION__: JSON.stringify(videoVersion) } });
