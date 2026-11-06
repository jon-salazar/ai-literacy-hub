import { configDefaults, defineConfig } from "vitest/config";

// Testes unitários (Vitest). Os testes de navegador em tests/e2e/ são do Playwright
// e não devem ser coletados aqui.
export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: [...configDefaults.exclude, "tests/e2e/**", ".claude/**"],
  },
});
