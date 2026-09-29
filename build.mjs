import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { mkdir, copyFile } from 'node:fs/promises';
process.chdir(fileURLToPath(new URL('.', import.meta.url)));
await mkdir('dist/assets/hero', { recursive: true });
for (const asset of ['amplify-scroll.mp4', 'amplify-first.webp', 'amplify-final.webp']) {
  await copyFile(`src/assets/hero/${asset}`, `dist/assets/hero/${asset}`);
}
await build({ entryPoints: ['src/hero.tsx', 'src/work.tsx', 'src/navigation.tsx', 'src/testimonials.tsx', 'src/buttons.tsx', 'src/process.tsx'], outdir: 'dist/interactive', bundle: true, splitting: true, format: 'esm', minify: true, target: 'es2022', sourcemap: false });
