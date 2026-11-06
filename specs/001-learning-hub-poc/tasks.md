# Tasks — 001 Learning Hub POC

Status: `pending` | `in-progress` | `done`. Cada task só é `done` quando seu critério de aceite foi verificado (não apenas código escrito).

```
T01 — Bootstrap Astro
|
+-- T02 — Design tokens/layout base
|
+-- T03 — Curriculum model
|     |
|     +-- T06 — Home
|     +-- T07 — Phase page
|
+-- T04 — Content collection/schema
|     |
|     +-- T08 — Dynamic module page
|           |
|           +-- T09 — Context Engineering content
|
+-- T05 — Progress abstraction
      |
      +-- T10 — Progress UI

T08
 |
 +-- T11 — Google Forms integration

T09 + T11
 |
 +-- T12 — Complete learning journey

T06 + T07 + T10 + T12
 |
 +-- T13 — Responsive/accessibility pass
 |
 +-- T14 — Build/check/validation
 |
 +-- T15 — Final review/documentation
```

Paralelizáveis: T03/T04/T05 (não tocam as mesmas superfícies). T06/T07 depois de T03. T02 é transversal (usado por todas as páginas) mas não bloqueia T03–T05.

## T01 — Bootstrap Astro
Criar projeto Astro (TS strict, static), `package.json`, `tsconfig.json`, `astro.config.mjs`.
Aceite: `npm install` e `npm run dev` sobem sem erro; página placeholder renderiza.

## T02 — Design tokens / layout base
`src/styles/global.css` com CSS variables (cor, spacing, tipografia, radius, largura); `BaseLayout.astro`; `Header.astro`.
Aceite: layout aplicado em uma página de teste, contraste visualmente adequado, `prefers-reduced-motion` respeitado.

## T03 — Curriculum model
`src/data/curriculum.json` com as 3 fases (id, título, descrição, transformação, status, ordem).
Aceite: JSON válido, tipado via interface TS, importável nas páginas.

## T04 — Content collection / schema
`src/content.config.ts` com schema Zod da collection `modules` (id, slug, title, description, phase, order, duration, status, objectives, prerequisites?, forms?).
Aceite: `astro check`/build falha propositalmente se um módulo published violar o schema (testado e revertido).

## T05 — Progress abstraction
`src/lib/progress.ts`: `getOrCreateParticipantId`, `markModuleStarted`, `markModuleCompleted`, `getProgress`, `getPhaseProgress`. Único ponto de acesso a `localStorage`.
Aceite: testes unitários (Vitest, localStorage mockado) cobrindo geração/persistência de participantId e cálculo de progresso.

## T06 — Home
`pages/index.astro` + `PhaseCard.astro`, usando T02+T03.
Aceite: 3 fases exibidas; Fase 1 leva a `/fases/foundations`; sem 404 nos links.

## T07 — Phase page
`pages/fases/[phase].astro` + `ModuleCard.astro`, `getStaticPaths` a partir de T03, módulos derivados da collection (T04).
Aceite: página de cada fase gera sem erro; módulos coming-soon não são clicáveis; progresso da fase exibido.

## T08 — Dynamic module page
`pages/modulos/[slug].astro`, `getStaticPaths` a partir da collection; `LearningSection.astro`, `LearningObjectiveList.astro`, `StatusBadge.astro`, `ModuleNavigation.astro`.
Aceite: rota gerada automaticamente para qualquer módulo novo sem código adicional (testado adicionando um módulo dummy).

## T09 — Context Engineering content
`src/content/modules/context-engineering.md` com todo o conteúdo do [seed.md](../../docs/seed.md); `TaskContextCanvas.astro`.
Aceite: módulo published, todas as seções do learning-model presentes e renderizando.

## T10 — Progress UI
`ProgressBar.astro`, `ModuleCompletionButton.astro`, `pages/progresso.astro`.
Aceite: marcar módulo concluído reflete na Home/fase/progresso após reload.

## T11 — Google Forms integration
`src/data/forms.json`, `src/lib/forms.ts` (`buildFormUrl` pura), `FormEmbed.astro`, `ExternalFormCTA.astro`.
Aceite: com URL configurada, embed/link funciona com prefill; com URL ausente, estado "pendente" sem quebrar build/página; testes unitários de `buildFormUrl`.

## T12 — Complete learning journey
Integração final do módulo Context Engineering com os 3 forms e progress tracking ponta a ponta.
Aceite: fluxo completo Discover→Learn→Practice→Reflect→Evidence→Progress executável manualmente sem erro.

## T13 — Responsive / accessibility pass
Revisão de todas as páginas em viewport mobile; labels, foco visível, navegação por teclado.
Aceite: sem overflow horizontal em 360px; tab order lógico; formulários com labels associados.

## T14 — Build / check / validation
`npm install` limpo, `astro check`, `astro build`, `vitest run`.
Aceite: todos os comandos retornam sucesso; saída registrada no relatório final.

## T15 — Final review / documentation
`README.md` completo; revisão de diff; checklist de [acceptance.md](acceptance.md).
Aceite: todos os itens de acceptance com status explícito (atendido/não atendido/justificativa).
