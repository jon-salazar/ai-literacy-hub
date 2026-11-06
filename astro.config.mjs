// @ts-check
import { defineConfig } from "astro/config";

// Publicado no GitHub Pages como project site: https://jon-salazar.github.io/ai-literacy-hub/
// Links internos devem usar withBase() (src/lib/paths.ts) para respeitar o `base`.
// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://jon-salazar.github.io",
  base: "/ai-literacy-hub",
});
