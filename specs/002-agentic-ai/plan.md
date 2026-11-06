# Plan — 002 Fase 2: Agentic AI & Orquestração

## Abordagem

Somente conteúdo e configuração. A arquitetura da [001](../001-learning-hub-poc/plan.md) já gera páginas de fase e de módulo a partir de `curriculum.json` e da Content Collection; a Fase 2 é o primeiro teste real disso fora da Fase 1.

## Arquivos

```
specs/002-agentic-ai/{spec,plan,tasks,acceptance}.md   (novo)
src/data/curriculum.json                                (agentic-ai: coming-soon → active)
src/content/modules/
  mcp.md                                                (novo, published)
  espectro-de-autonomia.md, agent-loop.md, estado-e-memoria.md,
  planejamento.md, workflows.md, agents.md, subagents.md,
  multi-agent.md, padroes-agenticos.md, controle-e-guardrails.md,
  observabilidade.md, evals.md, modos-de-falha.md       (novos, coming-soon)
docs/forms/agentic-ai/{README,03-mcp}.md                (novo)
docs/adr/005-fase-2.md                                  (novo)
```

Nenhum arquivo em `src/pages/`, `src/components/`, `src/lib/`, `src/content.config.ts`, `package.json` ou nos 11 módulos da Fase 1.

## Decisões técnicas

- **`order` por fase**: os módulos da Fase 2 usam `order` 1–14, como a Fase 1 usa 1–11. As páginas filtram por `phase` antes de ordenar, então não há colisão.
- **Slugs/ids únicos globalmente**: a rota `/modulos/[slug]` é única para todas as fases; os slugs novos não colidem com os da Fase 1.
- **Coming-soon com metadados mínimos**: `id`, `slug`, `title`, `description`, `phase`, `order`, `duration`, `status` — suficiente para o schema e para o `ModuleCard` desabilitado. Nenhuma página é gerada para eles (o `getStaticPaths` de módulo filtra `published`).
- **Forms**: o módulo MCP não precisa de entrada em `src/data/forms.json` (sem entrada, `FormEmbed` mostra "configuração pendente"). A frente A da v0.2.0 torna isso o caminho padrão; esta frente não toca `forms.json`.
- **`prerequisites`**: MCP declara `tools` e `context-engineering` (campo opcional já existente no schema, sem UI de bloqueio).
- **Lab sem Canvas**: o lab de MCP é de desenho/classificação; instrução textual direta (`useTaskContextCanvas: false`), como os demais módulos que não são Context Engineering.

## Validação

- `npm test`, `npm run build`.
- Teste negativo do schema: remover `keyMessage` de `mcp.md`, confirmar falha do build, reverter.
- Navegador (dev server): Home → card da Fase 2; `/fases/agentic-ai` com 14 módulos e só MCP clicável; `/modulos/mcp` com todas as seções; checagem em viewport mobile.

## Riscos

- **Conteúdo técnico datado**: MCP evolui. Mitigação: só conceitos estruturais estáveis (papéis, primitivas, princípios de segurança), sem versões, transportes detalhados, nomes de produtos ou números.
- **Conflito com outras frentes**: a frente F é dona do schema; se ela adicionar campos obrigatórios a módulos publicados (ex.: lentes por papel), `mcp.md` precisará ser atualizado após o merge.
