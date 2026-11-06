import { defineConfig, devices } from "@playwright/test";

// Testes end-to-end (acessibilidade) sobre o build estático em dist/.
// O servidor (tests/e2e/serve-dist.mjs) serve dist/ sob o mesmo base do GitHub Pages
// (/ai-literacy-hub/). Rode `npm run build` antes de `npm run test:e2e`.
const PORT = 4321;
const BASE_PATH = "/ai-literacy-hub/";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}${BASE_PATH}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `node tests/e2e/serve-dist.mjs ${PORT}`,
    url: `http://127.0.0.1:${PORT}${BASE_PATH}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
