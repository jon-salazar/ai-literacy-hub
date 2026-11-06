# Plan — 001 Learning Hub POC

## Stack

- Astro (static output, sem SSR/adapter)
- TypeScript (strict)
- Markdown via Astro Content Collections + Zod
- JSON para curriculum e forms
- CSS nativo com custom properties (sem framework de UI)
- Vitest para funções puras (unidades pequenas, sem DOM)

## Estrutura de diretórios

```
ai-literacy-hub/
  README.md
  astro.config.mjs
  package.json
  tsconfig.json
  docs/
  specs/
  src/
    content.config.ts
    content/modules/*.md
    data/curriculum.json
    data/forms.json
    lib/progress.ts
    lib/forms.ts
    styles/global.css
    layouts/BaseLayout.astro
    components/
      Header.astro
      PhaseCard.astro
      ModuleCard.astro
      ProgressBar.astro
      LearningObjectiveList.astro
      LearningSection.astro
      FormEmbed.astro
      ExternalFormCTA.astro
      TaskContextCanvas.astro
      StatusBadge.astro
      ModuleNavigation.astro
      ModuleCompletionButton.astro
    pages/
      index.astro
      fases/[phase].astro
      modulos/[slug].astro
      progresso.astro
  public/
  tests/
    progress.test.ts
    forms.test.ts
```

## Decisões técnicas

- **Progress client-side only**: `progress.ts` só toca `localStorage` quando `typeof window !== 'undefined'`; componentes que leem progresso rodam em `<script>` client-side (Astro islands não são necessárias — script inline basta, sem framework de UI reativo).
- **ModuleCompletionButton** é o único componente com lógica de escrita (marcar concluído); demais leituras de progresso acontecem via pequenos scripts inline por página, chamando funções exportadas de `progress.ts` (bundladas pelo Astro).
- **Testes**: Vitest cobre `generateParticipantId`/`getOrCreateParticipantId` (mockando localStorage), cálculo de progresso por fase, e `buildFormUrl`. Sem smoke test de navegação automatizado nesta POC — validação manual via `astro build` + preview cobre esse critério com custo menor que instalar Playwright.

## Ordem de execução

Segue o Task Graph em [tasks.md](tasks.md), respeitando dependências. T03/T04/T05 podem rodar em paralelo após T01+T02. T06/T07 dependem de T03. T08 depende de T04. T09 depende de T08. T10 depende de T05. T11 depende de T08. T12 depende de T09+T11.

## Riscos e mitigação

- **Astro Content Collections API pode variar entre versões** → fixar versão instalada e validar com `astro check` + `astro build` reais antes de declarar tasks concluídas.
- **Forms reais não existem ainda** → `forms.json` deve funcionar com URLs vazias sem quebrar (RF5); validado manualmente removendo/comentando uma entrada.
