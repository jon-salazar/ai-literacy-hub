import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Rotas principais auditadas pelo axe. Caminhos relativos ao baseURL
 * (http://127.0.0.1:4321/ai-literacy-hub/), como no GitHub Pages.
 */
const ROUTES: readonly { name: string; path: string }[] = [
  { name: "início", path: "./" },
  { name: "sobre", path: "sobre/" },
  { name: "progresso", path: "progresso/" },
  { name: "fase foundations", path: "fases/foundations/" },
  { name: "módulo context-engineering", path: "modulos/context-engineering/" },
];

/** Regras WCAG 2.0/2.1 nível A e AA, mais as boas práticas do axe. */
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

interface KnownException {
  /** id da regra do axe. */
  rule: string;
  /** Rota (como em ROUTES) ou "*" para todas. */
  route: string;
  /** Seletor exato reportado pelo axe para o nó tolerado. */
  target: string;
  /** Por que está tolerada e quem deve corrigir. */
  reason: string;
}

/**
 * Exceções conhecidas: violações reais em componentes de outras frentes, ainda
 * não corrigidas. Cada exceção tolera só aquele nó, naquela regra, naquela rota —
 * qualquer violação nova continua falhando. Remova a entrada quando a correção
 * for mergeada (o teste anota exceções que deixaram de ocorrer).
 */
const KNOWN_EXCEPTIONS: readonly KnownException[] = [
  {
    // src/components/ProgressBar.astro: o elemento com role="progressbar" não tem
    // nome acessível. Correção sugerida: aria-labelledby apontando para o <span>
    // do rótulo (ou aria-label={label}). Fora do escopo da frente B (CI).
    rule: "aria-progressbar-name",
    route: "fases/foundations/",
    target: ".progress-bar__track",
    reason: "ProgressBar sem nome acessível (componente de outra frente)",
  },
];

function isKnownException(routePath: string, rule: string, target: string): boolean {
  return KNOWN_EXCEPTIONS.some(
    (e) => (e.route === "*" || e.route === routePath) && e.rule === rule && e.target === target,
  );
}

for (const route of ROUTES) {
  test(`a11y: ${route.name} não tem violações do axe`, async ({ page }, testInfo) => {
    const response = await page.goto(route.path);
    expect(response?.ok(), `HTTP ${response?.status()} em ${route.path}`).toBe(true);

    const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();

    const found = results.violations.flatMap((violation) =>
      violation.nodes.map((node) => ({
        rule: violation.id,
        impact: violation.impact,
        help: violation.help,
        target: node.target.join(" "),
      })),
    );

    const unexpected = found.filter((v) => !isKnownException(route.path, v.rule, v.target));

    const staleExceptions = KNOWN_EXCEPTIONS.filter(
      (e) =>
        e.route === route.path && !found.some((v) => v.rule === e.rule && v.target === e.target),
    );
    for (const stale of staleExceptions) {
      testInfo.annotations.push({
        type: "exceção obsoleta",
        description: `${stale.rule} em ${stale.target} não ocorre mais; remova de KNOWN_EXCEPTIONS.`,
      });
    }

    expect(unexpected, JSON.stringify(unexpected, null, 2)).toEqual([]);
  });
}
