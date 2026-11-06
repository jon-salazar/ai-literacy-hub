# AI Literacy Hub

POC estática de Learning Hub para letramento em Inteligência Artificial voltado a profissionais do ciclo de desenvolvimento de software (Devs, QAs, POs, TLs).

Documentação completa do processo (Intent → Spec → Plan → Tasks → Implementation → Validation → Review):

- [docs/vision.md](docs/vision.md) — visão e North Star.
- [docs/architecture.md](docs/architecture.md) — arquitetura e decisões registradas.
- [docs/learning-model.md](docs/learning-model.md) — modelo pedagógico.
- [specs/001-learning-hub-poc/](specs/001-learning-hub-poc/) e [specs/002-agentic-ai/](specs/002-agentic-ai/) — spec, plan, tasks e acceptance.
- [docs/adr/](docs/adr/) — decisões de arquitetura (ADRs) a partir da v0.2.0.
- [docs/product_vision.md](docs/product_vision.md) e [docs/seed.md](docs/seed.md) — briefing original do programa completo.

## Arquitetura em uma frase

```
Content (Markdown) + Configuration (JSON) → Static Build (Astro) → Browser (localStorage + Google Forms)
```

Sem backend, sem SSR, sem banco de dados, sem autenticação.

## Estado atual (v0.2.0)

- Publicado em https://jon-salazar.github.io/ai-literacy-hub/.
- Home com a trilha de três fases.
- Fase 1 (Fundamentos & Uso Consciente) com os onze módulos publicados, todos com dicas por papel (Dev, QA, PO, Tech Lead).
- Fase 2 (Agentic AI & Orquestração) ativa: módulo MCP publicado e os demais da trilha como "Em breve". Fase 3 como "Em breve".
- Módulo dinâmico com introdução, objetivos, baseline, conceito, demo, "Na sua função", lab, evidência, reflexão e conclusão.
- Progresso local e `participantId` pseudônimo em `localStorage`; em `/progresso` é possível exportar, importar e recomeçar o progresso. Maturity Map lido de `src/data/maturity.json` (ainda com dados demonstrativos).
- Três Google Forms genéricos (baseline, evidência, reflexão) para todos os módulos, com `participantId` e `module_id` pré-preenchidos. Sem URLs reais configuradas, a interface informa a pendência.
- AI Radar (`/radar`): sinais e práticas emergentes, separados do currículo (itens atuais são exemplos).
- Página "Como funciona" (`/sobre`), página 404 própria e apresentação da POC em `/apresentacao/`.

Não há backend, SSR, autenticação, analytics real ou sincronização entre dispositivos.

## Pré-requisitos

- Node.js ≥ 22.12
- npm

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abre em `http://localhost:4321/ai-literacy-hub/` (o `base` configurado para o GitHub Pages também vale em desenvolvimento).

## Build de produção

```bash
npm run build
```

Gera o site estático em `dist/`.

## Validação

```bash
npm run check   # astro check — TypeScript e schema de conteúdo
npm run build   # astro check + build estático
npm test        # vitest — funções puras (progress, forms, paths, maturity, radar)
npm run check:links  # verifica links internos do dist/ (após o build)
npm run test:e2e     # acessibilidade (axe + Playwright) sobre o dist/ (após o build)
```

O CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) roda tudo isso em cada pull request para a `main`; o merge exige o check verde.

## Estrutura

```
src/
  content.config.ts     # schemas (Zod) das collections modules e radar
  content/modules/*.md  # conteúdo educacional (um arquivo por módulo)
  content/radar/*.md    # itens do AI Radar
  data/curriculum.json  # fases da jornada (id, título, descrição, status)
  data/forms.json       # 3 Google Forms padrão + overrides opcionais por módulo
  data/maturity.json    # dados do Maturity Map
  lib/
    progress.ts          # único ponto de acesso a localStorage
    forms.ts             # construção pura de URL de Form com prefill
    paths.ts             # withBase(): prefixa links internos com o base do deploy
    curriculum.ts         # leitura tipada de curriculum.json
    modules.ts            # leitura tipada da collection de módulos
    maturity.ts           # validação do maturity.json
    radar.ts, radar-sort.ts  # leitura e ordenação do AI Radar
  components/            # componentes genéricos de apresentação
  layouts/BaseLayout.astro
  pages/
    index.astro
    fases/[phase].astro
    modulos/[slug].astro
    progresso.astro
    sobre.astro
    radar/index.astro, radar/[slug].astro
    404.astro
public/apresentacao/     # apresentação da POC (funciona também offline)
tests/                   # vitest, funções puras
tests/e2e/               # Playwright + axe (acessibilidade)
scripts/check-links.mjs  # verificador de links internos
```

## Configuração dos Google Forms

São só **3 Google Forms** para todos os módulos: `baseline`, `evidence` e `reflection`. Cada link sai com o `participantId` e o `module_id` pré-preenchidos, então as respostas de todos os módulos caem na mesma planilha por etapa e são filtradas pela coluna `module_id`. Passo a passo para criar os Forms e obter os campos `entry.*`: [docs/forms/foundations/README.md](docs/forms/foundations/README.md).

```json
{
  "defaults": {
    "baseline": {
      "url": "https://docs.google.com/forms/d/e/SEU_FORM/viewform",
      "embed": false,
      "prefillParticipantIdField": "entry.111111111",
      "prefillModuleIdField": "entry.222222222"
    },
    "evidence": { "...": "..." },
    "reflection": { "...": "..." }
  },
  "overrides": {
    "context-engineering": { "evidence": { "url": "https://.../form-dedicado" } }
  }
}
```

- `url` vazio → a seção mostra "configuração pendente" sem quebrar a página.
- `embed: true` → formulário em iframe; `embed: false` → link externo (nova aba).
- `overrides` (opcional) → troca campos de uma etapa para um módulo específico, sem mudar código.
- Módulos novos usam os `defaults` automaticamente; não precisam de entrada no JSON.

Nenhuma URL de Form fica hardcoded em componentes.

## Como adicionar um módulo

1. Crie `src/content/modules/<slug>.md` com o frontmatter definido em `src/content.config.ts` (campos obrigatórios adicionais — `introduction`, `keyMessage`, `demo`, `lab`, `reflectionPrompts`, `completionMessage` — são exigidos apenas quando `status: published`).
2. Defina `phase` com o `id` de uma fase existente em `src/data/curriculum.json`.
3. Rode `npm run build`. A rota `/modulos/<slug>` é gerada automaticamente e o módulo aparece na página da fase correspondente.

Opcional: `roleLenses` (`dev`, `qa`, `po`, `tl`, cada um com 1 a 5 dicas) para a seção "Na sua função".

Não é necessário criar nenhuma página Astro, editar componentes nem configurar formulários.

## Como adicionar um item ao AI Radar

Crie `src/content/radar/<slug>.md` com `title`, `date`, `summary`, `type` (`conceito` | `pratica` | `ferramenta` | `tendencia`) e `tags`. Use `draft: true` para tirar um item do ar sem apagá-lo.

## Como adicionar uma fase

Adicione um objeto em `src/data/phases` dentro de `src/data/curriculum.json` (`id`, `order`, `title`, `description`, `transformation`, `status`). A rota `/fases/<id>` é gerada automaticamente; módulos futuros que referenciarem esse `phase` id aparecerão nela sem mudanças de código.

## Publicação (GitHub Pages)

O site é publicado em `https://jon-salazar.github.io/ai-literacy-hub/` pelo workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml), a cada push na `main` (ou manualmente em Actions → "Deploy to GitHub Pages"). O workflow roda `npm test` e `npm run build` (com `astro check`) antes de publicar; se algo falhar, nada é publicado.

Configuração necessária no repositório (uma vez): **Settings → Pages → Source: GitHub Actions**.

Como é um *project site*, o Hub vive no subcaminho `/ai-literacy-hub/` (`base` em `astro.config.mjs`). Por isso, **todo link interno deve usar `withBase()`** de `src/lib/paths.ts` — nunca `href="/..."` literal. Para publicar em outro endereço (domínio próprio, outro repo), ajuste `site` e `base` em `astro.config.mjs`.

## Limitações da POC

- Google Forms embutidos via iframe dependem da configuração de compartilhamento do Form (alguns formulários podem bloquear embed — nesse caso use `embed: false`).
- Progresso é local ao navegador; para trocar de dispositivo, exporte e importe o arquivo de progresso em `/progresso`.
- Fase 2 tem 1 de 14 módulos publicados e a Fase 3 ainda não tem módulos. O progresso de uma fase considera apenas os módulos publicados.
- O Maturity Map em `/progresso` usa dados demonstrativos; a agregação de dados reais está prevista para a v0.3.
- Os itens atuais do AI Radar são exemplos ilustrativos.
