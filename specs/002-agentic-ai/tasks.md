# Tasks — 002 Fase 2: Agentic AI & Orquestração

Status: `pending` | `in-progress` | `done`. Uma task só é `done` quando seu critério de aceite foi verificado.

```
E01 — Spec da fase
|
+-- E02 — Módulos coming-soon (trilha completa)
|
+-- E03 — Módulo MCP completo
|     |
|     +-- E04 — Roteiro de Forms do MCP
|
+-- E05 — Ativar a fase no currículo
      |
E02 + E03 + E05
      |
      +-- E06 — Validação (test, build, schema negativo, navegador)
      |
      +-- E07 — ADR e PR
```

## E01 — Spec da fase — `done`
`specs/002-agentic-ai/spec.md`, `plan.md`, `tasks.md`, `acceptance.md`.
Aceite: objetivos, transformação, lista de módulos com ordem/duração e critérios de aceite registrados.

## E02 — Módulos coming-soon — `done`
13 arquivos em `src/content/modules/` com metadados mínimos e `phase: agentic-ai`.
Aceite: build passa; `/fases/agentic-ai` lista os 13 como "Em breve", não clicáveis.

## E03 — Módulo MCP completo — `done`
`src/content/modules/mcp.md` com todos os campos exigidos para `published` e corpo conceitual.
Aceite: todas as seções do learning-model renderizam em `/modulos/mcp`; sem fatos datados.

## E04 — Roteiro de Forms do MCP — `done`
`docs/forms/agentic-ai/README.md` e `03-mcp.md`.
Aceite: mesmo formato de `docs/forms/foundations/`; campos de evidence espelham o lab.

## E05 — Ativar a fase — `done`
`src/data/curriculum.json`: `agentic-ai` → `active`.
Aceite: Home mostra a Fase 2 como "Disponível" com "1 módulo(s) disponível(is)".

## E06 — Validação — `done`
`npm test`, `npm run build`, teste negativo do schema, navegação real no navegador (desktop e mobile).
Aceite: ver [acceptance.md](acceptance.md).

## E07 — ADR e PR — `done`
`docs/adr/005-fase-2.md` com a resposta ao teste arquitetural; branch enviada; PR para `main` (sem merge).
