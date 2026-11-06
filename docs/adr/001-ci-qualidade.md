# ADR 001 — CI e gate de qualidade

- **Status:** aceito
- **Data:** 2026-11-06
- **Frente:** B (v0.2.0)

## Contexto

Até a v0.1.0, testes e build só rodavam no `deploy.yml`, depois do push na `main`. Um link quebrado ou uma regressão de acessibilidade só aparecia já publicada. Com seis frentes paralelas na v0.2.0, precisamos de um gate que rode em todo PR antes do merge.

## Decisão

1. **`.github/workflows/ci.yml`** roda em `pull_request` para `main` (e manualmente), com `permissions: contents: read`. Passos: `npm ci` → `npm test` → `npm run build` (astro check + build) → `npm run check:links` → `npm run test:e2e`. O `deploy.yml` não muda.
2. **Links internos** são checados por `scripts/check-links.mjs`, em Node puro (sem dependência nova). O script lê `dist/**/*.html` e exige que todo `href`/`src`/`srcset`/`poster`/`action` interno comece com o base `/ai-literacy-hub/` e aponte para um arquivo que existe em `dist/` (`x/` → `x/index.html`; `x` → `x`, `x/index.html` ou `x.html`). Links externos, `mailto:` e âncoras (`#`) ficam de fora.
3. **Acessibilidade** é testada com Playwright + `@axe-core/playwright` (versões fixas). O teste roda o axe (WCAG 2.0/2.1 A e AA, mais as boas práticas) nas rotas principais: `/`, `/sobre`, `/progresso`, `/fases/foundations` e um módulo. O `dist/` é servido por `tests/e2e/serve-dist.mjs`, um servidor estático mínimo que imita o GitHub Pages. Não usamos `astro preview` porque, no Astro 7, ele vai para segundo plano quando não há TTY, e o Playwright perde o controle do processo.
4. **Exceções de a11y** ficam numa lista explícita e comentada (`KNOWN_EXCEPTIONS` em `tests/e2e/a11y.spec.ts`). Cada uma vale só para uma regra, uma rota e um seletor, então qualquer violação nova falha. Quando uma exceção deixa de ocorrer, o teste a anota como obsoleta.
5. **Vitest** ignora `tests/e2e/**` (`vitest.config.ts`). Os testes unitários e os de navegador continuam separados.
6. **Dependabot** atualiza npm e GitHub Actions toda semana e agrupa minor/patch num PR por ecossistema, para gerar menos ruído.

## Consequências

- Todo PR passa por testes, build, verificação de links e acessibilidade antes do merge. Tornar o check obrigatório (proteção de branch) é feito na integração, fora desta frente.
- O CI baixa o Chromium a cada execução, o que custa cerca de 1 minuto. Aceitamos esse custo em troca de simplicidade, sem cache de navegador.
- O axe cobre só o estado inicial das páginas (sem progresso no `localStorage`). Interações e estados com progresso ficam para testes futuros.
- A única exceção encontrada (`aria-progressbar-name` em `ProgressBar.astro`) foi corrigida na integração da v0.2.0; `KNOWN_EXCEPTIONS` está vazia.
