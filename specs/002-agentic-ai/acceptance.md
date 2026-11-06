# Acceptance — 002 Fase 2: Agentic AI & Orquestração

Verificado em 2026-11-06 via `npm test`, `npm run build` e navegação real no navegador (dev server, desktop e viewport 375×812).

## Critérios funcionais

1. ✅ Home exibe a Fase 2 como "Disponível" com "1 módulo(s) disponível(is)".
2. ✅ `/fases/agentic-ai` lista os 14 módulos na ordem da spec; apenas MCP é clicável (`/modulos/mcp`), os outros 13 aparecem como "Em breve" sem link.
3. ✅ A página da fase mostra a barra de progresso (há módulo publicado).
4. ✅ `/modulos/mcp` renderiza as 9 seções do learning-model: introdução, objetivos, baseline, conceito (keyMessage + 6 subseções), demo A/B, lab, evidência, reflexão, conclusão.
5. ✅ Forms não configurados não quebram o módulo — as três seções mostram "Formulário ainda não configurado para este módulo".
6. ✅ Marcar MCP como concluído reflete na página da fase (progresso 100%). Observação: o progresso da fase é calculado sobre módulos **publicados** (comportamento existente de `calculatePhaseProgress`), então 1/1 = 100% mesmo com 13 módulos `coming-soon`.
7. ✅ Sem overflow horizontal em 375px no módulo MCP (`scrollWidth === innerWidth`).
8. ✅ Roteiro de Forms do MCP em `docs/forms/agentic-ai/03-mcp.md`, no formato da Fase 1.
9. ✅ Conteúdo sem versões, datas, nomes de produtos ou números que fiquem datados.

## Critérios arquiteturais

- ✅ Nenhum arquivo alterado em `src/pages/`, `src/components/`, `src/lib/`, `src/content.config.ts` ou `package.json`.
- ✅ Schema valida os módulos novos — teste negativo: remover `keyMessage` de `mcp.md` fez o build falhar com `InvalidContentEntryDataError` (`"keyMessage" é obrigatório para módulos com status "published"`); revertido, build voltou a passar.
- ✅ `npm test`: 17/17 testes passando.
- ✅ `npm run build`: 18 páginas geradas (antes: 17), incluindo `/modulos/mcp`.
- ✅ Teste arquitetural do AGENTS.md respondido em [docs/adr/005-fase-2.md](../../docs/adr/005-fase-2.md): adicionar MCP exigiu apenas conteúdo e configuração.

## Não atendido / pendente

- Conteúdo completo dos 13 módulos `coming-soon` (fora de escopo desta entrega).
- Google Forms reais do MCP não foram criados — apenas o roteiro.
- Estilo de tabela Markdown: `global.css` não estiliza `<table>`; por isso o módulo MCP usa lista em vez de tabela. Se módulos futuros precisarem de tabelas, isso é uma mudança de CSS (fora desta frente).
