import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
process.chdir(fileURLToPath(new URL('.', import.meta.url)));
await build({ entryPoints: ['src/hero.tsx', 'src/work.tsx', 'src/navigation.tsx'], outdir: 'dist/interactive', bundle: true, splitting: true, format: 'esm', minify: true, target: 'es2022', sourcemap: false });
