import { configDefaults, defineConfig } from "vitest/config";

// Testes unitários (Vitest). Os testes de navegador em tests/e2e/ são do Playwright
// e não devem ser coletados aqui.
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
  },
});
