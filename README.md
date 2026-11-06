# AI Literacy Hub

POC estática de Learning Hub para letramento em Inteligência Artificial voltado a profissionais do ciclo de desenvolvimento de software (Devs, QAs, POs, TLs).

Documentação completa do processo (Intent → Spec → Plan → Tasks → Implementation → Validation → Review):

- [docs/vision.md](docs/vision.md) — visão e North Star.
- [docs/architecture.md](docs/architecture.md) — arquitetura e decisões registradas.
- [docs/learning-model.md](docs/learning-model.md) — modelo pedagógico.
- [specs/001-learning-hub-poc/](specs/001-learning-hub-poc/) — spec, plan, tasks e acceptance.
- [docs/product_vision.md](docs/product_vision.md) e [docs/seed.md](docs/seed.md) — briefing original do programa completo.

## Arquitetura em uma frase

```
Content (Markdown) + Configuration (JSON) → Static Build (Astro) → Browser (localStorage + Google Forms)
```

Sem backend, sem SSR, sem banco de dados, sem autenticação.

## Estado atual

- Home com a trilha de três fases.
- Fase 1 (Fundamentos & Uso Consciente) com os onze módulos publicados.
- Fases 2 e 3 visíveis como "Em breve".
- Módulo dinâmico com introdução, objetivos, baseline, conceito, demo, lab, evidência, reflexão e conclusão.
- Progresso local e `participantId` pseudônimo em `localStorage` (`/progresso`).
- Página "Como funciona" (`/sobre`) explicando o experimento e o uso de dados.
- Google Forms configuráveis em `src/data/forms.json` para os 11 módulos; sem URLs reais, a interface informa a pendência.
- Roteiros de perguntas por módulo em `docs/forms/foundations/` para a criação posterior dos Forms.

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
npm test        # vitest — funções puras (progress, forms)
```

## Estrutura

```
src/
  content.config.ts     # schema (Zod) da collection de módulos
  content/modules/*.md  # conteúdo educacional (um arquivo por módulo)
  data/curriculum.json  # fases da jornada (id, título, descrição, status)
  data/forms.json       # configuração dos Google Forms por módulo
  lib/
    progress.ts          # único ponto de acesso a localStorage
    forms.ts             # construção pura de URL de Form com prefill
    paths.ts             # withBase(): prefixa links internos com o base do deploy
    curriculum.ts         # leitura tipada de curriculum.json
    modules.ts            # leitura tipada da collection de módulos
  components/            # componentes genéricos de apresentação
  layouts/BaseLayout.astro
  pages/
    index.astro
    fases/[phase].astro
    modulos/[slug].astro
    progresso.astro
    sobre.astro
tests/                   # vitest, funções puras
```

## Configuração dos Google Forms

Edite `src/data/forms.json`. Cada módulo (chave = `id` do módulo, ou o valor de `forms` no frontmatter se diferente) pode configurar três formulários: `baseline`, `evidence`, `reflection`.

Antes de criar os Forms reais, consulte [docs/forms/foundations/](docs/forms/foundations/) — um arquivo de referência por módulo da Fase 1 com os campos conceituais que cada um dos três formulários deve ter.

```json
{
  "context-engineering": {
    "baseline": {
      "url": "https://forms.gle/SEU_FORM_AQUI",
      "embed": false,
      "prefillParticipantIdField": "entry.123456789"
    }
  }
}
```

- `url` vazio ou ausente → a seção mostra "configuração pendente" sem quebrar a página.
- `embed: true` → o formulário é exibido em iframe; `embed: false` → CTA com link externo (nova aba).
- `prefillParticipantIdField` → nome do campo `entry.xxxxx` do Google Forms (visível inspecionando o link de preenchimento prévio do Form) usado para enviar o `participantId` como parâmetro.

Nenhuma URL de Form fica hardcoded em componentes.

## Como adicionar um módulo

1. Crie `src/content/modules/<slug>.md` com o frontmatter definido em `src/content.config.ts` (campos obrigatórios adicionais — `introduction`, `keyMessage`, `demo`, `lab`, `reflectionPrompts`, `completionMessage` — são exigidos apenas quando `status: published`).
2. Defina `phase` com o `id` de uma fase existente em `src/data/curriculum.json`.
3. Rode `npm run build`. A rota `/modulos/<slug>` é gerada automaticamente e o módulo aparece na página da fase correspondente.

Não é necessário criar nenhuma página Astro nem editar componentes.

## Como adicionar uma fase

Adicione um objeto em `src/data/phases` dentro de `src/data/curriculum.json` (`id`, `order`, `title`, `description`, `transformation`, `status`). A rota `/fases/<id>` é gerada automaticamente; módulos futuros que referenciarem esse `phase` id aparecerão nela sem mudanças de código.

## Publicação (GitHub Pages)

O site é publicado em `https://jon-salazar.github.io/ai-literacy-hub/` pelo workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml), a cada push na `main` (ou manualmente em Actions → "Deploy to GitHub Pages"). O workflow roda `npm test` e `npm run build` (com `astro check`) antes de publicar; se algo falhar, nada é publicado.

Configuração necessária no repositório (uma vez): **Settings → Pages → Source: GitHub Actions**.

Como é um *project site*, o Hub vive no subcaminho `/ai-literacy-hub/` (`base` em `astro.config.mjs`). Por isso, **todo link interno deve usar `withBase()`** de `src/lib/paths.ts` — nunca `href="/..."` literal. Para publicar em outro endereço (domínio próprio, outro repo), ajuste `site` e `base` em `astro.config.mjs`.

## Limitações da POC

- Google Forms embutidos via iframe dependem da configuração de compartilhamento do Form (alguns formulários corporativos podem bloquear embed — nesse caso use `embed: false`).
- Progresso é local ao navegador; não há sincronização entre dispositivos nem exportação de dados.
- Todos os 11 módulos da Fase 1 (Fundamentos & Uso Consciente) estão completos e publicados. As Fases 2 (Agentic AI & Orquestração) e 3 (AI-Native Software Engineering) existem apenas como currículo `coming-soon`, sem módulos de conteúdo.
- O Maturity Map em `/progresso` é ilustrativo — não há coleta ou agregação real de dados de participantes nesta POC.
