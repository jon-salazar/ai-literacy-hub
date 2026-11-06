# Architecture — AI Literacy Hub

## Modelo geral

```
Content + Configuration → Static Build → Browser
```

- **Content** (Markdown, via Astro Content Collections): o que é ensinado. Vive em `src/content/modules/`.
- **Curriculum** (JSON): como a jornada está organizada — fases, ordem, estado. Vive em `src/data/curriculum.json`.
- **Components** (Astro/TypeScript): como a informação é apresentada. Genéricos, sem conhecimento de um módulo específico.
- **State** (localStorage): o que é lembrado localmente no navegador. Encapsulado em `src/lib/progress.ts`.
- **Forms** (Google Forms + `src/data/forms.json`): como o participante sai do Hub para registrar dados.

Não existe backend, SSR, banco de dados ou autenticação. `astro build` gera HTML/CSS/JS estático.

## Divisão de responsabilidade: curriculum.json vs frontmatter do módulo

Decisão: **o módulo (frontmatter) é dono de tudo que descreve o módulo em si; o curriculum é dono apenas da estrutura da jornada (fases).**

- `curriculum.json` define: fases (id, título, descrição, transformação esperada, status, ordem). Não repete título/descrição/duração de módulos individuais.
- Frontmatter do módulo (`src/content/modules/*.md`, validado por `content.config.ts`) define: id, slug, phase (referencia o id da fase), order, title, description, duration, status, objectives, prerequisites opcional, forms opcional.
- A lista de módulos de uma fase é **derivada** em runtime (build time) filtrando a collection de módulos por `phase === phaseId` e ordenando por `order`. Isso evita duplicar a lista de módulos em dois lugares.

Razão: módulos futuros (ex.: "MCP" na Fase 2) devem poder ser adicionados criando apenas um arquivo de conteúdo, sem editar `curriculum.json`. Isso satisfaz o Core architectural test do [CLAUDE.md](../CLAUDE.md).

## Content Collections

`src/content.config.ts` define as collections `modules` e `radar` com schema Zod. Módulos aceitam o campo opcional `roleLenses` (`dev`, `qa`, `po`, `tl`; objeto estrito, chave desconhecida quebra o build) — ver [ADR 006](adr/006-lentes-radar.md). Status possíveis: `published`, `draft`, `coming-soon`. Build falha se um módulo `published` violar o schema (campos obrigatórios ausentes/tipo errado) — conteúdo inválido não deve chegar em produção silenciosamente.

Módulos com status `coming-soon` podem existir apenas como metadados mínimos (podem não ter corpo Markdown completo) e são exibidos na trilha como indisponíveis, sem gerar link quebrado.

## Rotas

- `/` — Home. Lê `curriculum.json`, exibe as fases como cards.
- `/fases/[phase]` — Página de fase dinâmica. Uma rota Astro (`getStaticPaths`) gerada a partir das fases do curriculum; lista módulos derivados da collection.
- `/modulos/[slug]` — Página de módulo dinâmica. Uma única rota Astro gerada a partir da collection `modules`, renderizando o corpo Markdown + seções estruturadas (baseline/demo/lab/evidência/reflexão) via componentes genéricos. **Não existe página Astro dedicada a Context Engineering.**
- `/progresso` — Página opcional mostrando o estado local do participante (módulos concluídos, IDs) e uma seção conceitual sobre o Maturity Map com dados explicitamente marcados como demonstrativos.
- `/sobre` — Página estática "Como funciona": o que é o Hub, o que não é e como os dados do participante são tratados.
- `/radar` e `/radar/[slug]` — AI Radar, lido da collection `radar`; não se conecta ao progresso.
- `/404` — gera `404.html`, servido pelo GitHub Pages para qualquer caminho inexistente; todos os links são absolutos com o base.
- `/apresentacao/` — arquivo estático em `public/apresentacao/`, independente do layout do site, com caminhos relativos para funcionar também offline.

## Estado local (`src/lib/progress.ts`)

Único ponto de acesso a `localStorage` no projeto. Responsabilidades:

- gerar/recuperar `participantId` (aleatório, pseudônimo, sem dados pessoais — `crypto.randomUUID()`-based);
- registrar módulo iniciado / concluído com timestamp;
- calcular progresso derivado (percentual por fase, lista de módulos concluídos);
- exportar (JSON versionado), importar (validação completa antes de escrever; mescla mantendo o `participantId` atual) e recomeçar (gera novo `participantId`) — ver [ADR 004](adr/004-progresso.md).

Componentes de UI nunca chamam `localStorage` diretamente; sempre passam por essa camada. Isso mantém a regra "Encapsular acesso ao localStorage" do CLAUDE.md e torna a lógica testável sem DOM real (usa um wrapper que verifica `typeof window`).

## Google Forms (`src/lib/forms.ts` + `src/data/forms.json`)

`forms.json` tem um bloco `defaults` com os 3 formulários (`baseline`, `evidence`, `reflection`) usados por todos os módulos e um bloco opcional `overrides` por id de módulo. `getFormConfig(moduleId, kind)` resolve default + override (função pura `resolveFormConfig`) e devolve a config já com o `moduleId`; `buildFormUrl` pré-preenche `participant_id` e `module_id` via `entry.*`. Nenhuma URL de Google Form vive hardcoded em componente; sem `url`, `ExternalFormCTA`/`FormEmbed` mostram "configuração pendente". Ver [ADR 002](adr/002-forms-genericos.md).

## Qualidade (CI)

Todo pull request roda `npm test`, `npm run build` (com `astro check`), o verificador de links (`scripts/check-links.mjs`: links absolutos precisam do base; relativos precisam existir em `dist/`) e auditoria de acessibilidade com axe em todas as rotas principais. A `main` é protegida: o merge exige esse check verde. Ver [ADR 001](adr/001-ci-qualidade.md).

## Design tokens

`src/styles/global.css` define CSS variables para cor, spacing, tipografia, radius e largura de conteúdo. Componentes consomem os tokens; não há valores mágicos espalhados.

## Decisões registradas

| Decisão | Alternativas consideradas | Razão |
|---|---|---|
| Lista de módulos por fase é derivada da collection, não duplicada em `curriculum.json` | Manter lista de slugs em `curriculum.json` | Evita duas fontes de verdade; adicionar módulo não deve exigir editar JSON estrutural |
| Uma única rota dinâmica `/modulos/[slug]` para todos os módulos | Página Astro dedicada para Context Engineering | Requisito explícito: módulo não deve exigir nova página |
| `localStorage` acessado apenas via `progress.ts` | Acesso direto em componentes | Encapsulamento exigido pelo CLAUDE.md; testabilidade |
| Forms configurados via JSON, URL montada por função pura | Hardcode de URLs em componentes | Requisito explícito de configurabilidade e testabilidade |
| Sem framework de UI (Astro + CSS nativo) | Tailwind, biblioteca de componentes | "Evite adicionar dependências sem necessidade explícita"; POC pequena não justifica |
| Links internos via `withBase()` (`src/lib/paths.ts`) e `base: "/ai-literacy-hub"` em `astro.config.mjs` | Links absolutos `/...`; domínio próprio na raiz | O GitHub Pages publica project sites em subcaminho; `withBase()` mantém o mesmo código válido em qualquer `base` |
| Sem SSR / sem API routes | Astro SSR com endpoints | "Não implementar backend"; toda escrita é local (localStorage) ou externa (Forms) |
| `demo` do módulo é duas versões de texto livre (`versionAText`/`versionBText`), não um breakdown fixo de 5 campos | Manter o shape original (Objective/Context/Artifacts/Constraints/Acceptance Criteria) para todos os módulos | O shape original era específico do Task Context Canvas de Context Engineering; forçar os 10 outros módulos da Fase 1 nesse molde violaria "componentes não conhecem detalhes específicos de um módulo". O Canvas de 5 campos continua disponível como componente (`TaskContextCanvas`), usado apenas onde `lab.useTaskContextCanvas: true` |

## ADRs

A partir da v0.2.0, decisões arquiteturais ficam em [docs/adr/](adr/):

- [001 — CI e gate de qualidade](adr/001-ci-qualidade.md)
- [002 — Forms genéricos](adr/002-forms-genericos.md)
- [003 — Estrutura do site (404, metadados, apresentação)](adr/003-estrutura-site.md)
- [004 — Progresso: exportar, importar, recomeçar e Maturity Map](adr/004-progresso.md)
- [005 — Fase 2 como conteúdo](adr/005-fase-2.md)
- [006 — Lentes por papel e AI Radar](adr/006-lentes-radar.md)
