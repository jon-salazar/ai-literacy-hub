# Spec — 002 Fase 2: Agentic AI & Orquestração

Ver [docs/product_vision.md](../../docs/product_vision.md) (seção "Fase 2 — Agentic AI & Orquestração"), [docs/seed.md](../../docs/seed.md) e [docs/learning-model.md](../../docs/learning-model.md) para contexto. Esta spec estende a [001-learning-hub-poc](../001-learning-hub-poc/spec.md) sem alterar a arquitetura.

## Pergunta central

**Como fazer a IA executar trabalho, e não apenas responder perguntas?**

## Transformação esperada

Usuário de IA → operador de agentes e workflows.

Ao final da fase, o participante deve conseguir:

- distinguir **workflow ≠ agent ≠ multi-agent** e tratar autonomia como um espectro (Assistant → Tool User → Workflow → Agent → Long-running Agent);
- escolher o **menor nível de autonomia** que resolve bem um problema, em vez de maximizar autonomia;
- projetar as capacidades (tools, dados, prompts) que um agente recebe e os limites dessas capacidades;
- reconhecer modos de falha e definir controles (checkpoints humanos, guardrails, observabilidade, evals).

## Objetivo desta entrega (v0.2.0, frente E)

1. Representar a trilha completa da Fase 2 no Hub (todos os módulos visíveis, na ordem pedagógica).
2. Publicar pelo menos um módulo completo — **MCP** — no mesmo nível dos módulos da Fase 1.
3. Ativar a Fase 2 no currículo.
4. Fazer tudo isso **sem alterar código da aplicação** (só conteúdo e configuração), como prova do teste arquitetural do [AGENTS.md](../../AGENTS.md).

## Módulos da fase

Ordem pedagógica: primeiro o vocabulário (autonomia, loop), depois as capacidades (MCP, estado, planejamento), depois as formas de orquestração (workflows → agents → subagents → multi-agent → padrões) e, por fim, controle e qualidade (guardrails, observabilidade, evals, modos de falha).

| # | id / slug | Título | Duração | Status nesta entrega |
| --- | --- | --- | --- | --- |
| 1 | `espectro-de-autonomia` | Espectro de autonomia | 25 min | coming-soon |
| 2 | `agent-loop` | Agent Loop | 25 min | coming-soon |
| 3 | `mcp` | MCP — Model Context Protocol | 35 min | **published** |
| 4 | `estado-e-memoria` | Estado e memória | 30 min | coming-soon |
| 5 | `planejamento` | Planejamento | 25 min | coming-soon |
| 6 | `workflows` | Workflows | 30 min | coming-soon |
| 7 | `agents` | Agents | 30 min | coming-soon |
| 8 | `subagents` | Subagents | 25 min | coming-soon |
| 9 | `multi-agent` | Multi-Agent | 30 min | coming-soon |
| 10 | `padroes-agenticos` | Padrões agênticos | 35 min | coming-soon |
| 11 | `controle-e-guardrails` | Controle e guardrails | 30 min | coming-soon |
| 12 | `observabilidade` | Observabilidade | 25 min | coming-soon |
| 13 | `evals` | Evals | 30 min | coming-soon |
| 14 | `modos-de-falha` | Modos de falha | 25 min | coming-soon |

"Tools / Function Calling", listado na visão como conteúdo da Fase 2, já é coberto pelo módulo `tools` da Fase 1. A Fase 2 o usa como pré-requisito (via MCP) em vez de duplicá-lo.

## Requisitos funcionais

### RF1 — Fase 2 na Home
- O card da Fase 2 mostra status "Disponível" (`active`) e a quantidade de módulos publicados (1 nesta entrega).

### RF2 — Página da fase (`/fases/agentic-ai`)
- Lista os 14 módulos da tabela acima, ordenados por `order`.
- Apenas `mcp` é clicável; os demais aparecem como "Em breve", sem link quebrado.
- Mostra a barra de progresso da fase (há módulo publicado).

### RF3 — Módulo MCP completo (`/modulos/mcp`)
- Segue a estrutura do learning-model: introdução, objetivos, baseline, conceito (keyMessage + corpo), demo A/B, lab, evidência, reflexão, conclusão.
- Conceito cobre: problema das integrações caso a caso; Host, Client, Server; Tools, Resources e Prompts e quem controla cada um; descoberta de capacidades; segurança (menor privilégio, leitura vs. efeito real, segredos, confiança no servidor).
- Lab usa cenário realista de desenvolvimento de software (investigação de build quebrado com CI, ADRs e issue tracker) e pede um desenho de servidor MCP com decisões de permissão.
- Conteúdo conceitual estável: sem números de versão, datas, nomes de produtos específicos ou estatísticas que fiquem datadas.

### RF4 — Roteiro de Forms
- `docs/forms/agentic-ai/03-mcp.md` define campos de baseline, evidence e reflection no formato de `docs/forms/foundations/`.
- O módulo funciona sem Forms configurados (estado "configuração pendente").

## Requisitos não funcionais

- Nenhuma alteração em `src/pages/`, `src/components/`, `src/lib/` ou `src/content.config.ts`.
- Todos os módulos novos passam no schema da collection `modules`; build falha se o módulo publicado perder um campo obrigatório.
- `npm test` e `npm run build` passam.

## Fora de escopo

- Conteúdo completo dos 13 módulos `coming-soon` da Fase 2.
- Componentes interativos novos para a fase (ex.: simulador de agent loop).
- Fase 3, chamadas reais a LLMs ou servidores MCP rodando no Hub (o Hub continua sem backend e sem agente embutido).

## Ambiguidades resolvidas

- **Qual módulo publicar primeiro?** MCP: depende apenas de conceitos já publicados (Tools, Context Engineering, Segurança), é concreto o suficiente para um lab de desenho e é o melhor caso para o teste arquitetural do AGENTS.md (que usa literalmente "MCP" como exemplo).
- **MCP fora da ordem 1?** Sim. A ordem reflete a progressão pedagógica final da trilha, não a ordem de publicação. Um participante pode fazer MCP antes dos módulos 1–2, porque seus pré-requisitos estão na Fase 1.
- **Status da fase com só 1 de 14 módulos publicados:** `active`. Para a Home e a página de fase, `active` significa "há conteúdo disponível"; o contador de módulos publicados comunica a cobertura parcial.
