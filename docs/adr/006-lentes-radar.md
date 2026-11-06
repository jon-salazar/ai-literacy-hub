# ADR 006 — Lentes por papel e AI Radar (frente F, v0.2.0)

- **Status:** aceito
- **Data:** 2026-11-06

## Contexto

A visão de produto (`docs/product_vision.md`) prevê duas extensões transversais ao currículo:

1. **Role Lenses** — o mesmo conceito aplicado ao dia a dia de Devs, QAs, POs e Tech Leads.
2. **AI Radar** — sinais e práticas emergentes, separados do currículo durável.

Ambas precisam seguir os princípios do projeto: content-first, componentes genéricos, conteúdo validado por schema e nenhuma página nova por módulo.

## Decisões

### Lentes por papel

- Campo **opcional** `roleLenses` no schema de módulos (`src/content.config.ts`), com chaves opcionais `dev`, `qa`, `po`, `tl`. Cada chave é uma lista de 1 a 5 dicas curtas. O objeto é `strict()`: uma chave desconhecida (ex.: `designer`) quebra o build em vez de ser ignorada em silêncio.
- Opcional por compatibilidade: módulos sem lentes (incluindo os novos da Fase 2) continuam válidos e renderizam exatamente como antes — a seção "Na sua função" só aparece quando há lentes.
- Componente genérico `RoleLenses.astro`, posicionado em `[slug].astro` entre a Demo e o Lab: o participante vê a aplicação por papel antes de praticar.
- **Apresentação: um `<details>`/`<summary>` por papel**, todos fechados por padrão, em vez de abas ARIA.
  - Funciona sem JavaScript, com teclado (Tab + Enter/Espaço) e leitores de tela, sem precisar implementar o padrão de abas (roving tabindex, setas, `aria-selected`, `aria-controls`).
  - Permite abrir mais de um papel ao mesmo tempo, o que é útil para comparar perspectivas — abas forçariam um papel por vez.
  - O estado aberto/fechado é indicado por um marcador textual (▸/▾) e pela borda, não só por cor.
  - Rótulos dos papéis ("Dev", "QA", "PO", "Tech Lead") ficam no componente (apresentação); o conteúdo fica no Markdown.
- Não há persistência do "meu papel" no `localStorage`: manteria estado além do permitido no AGENTS.md sem ganho claro para a POC.

### AI Radar

- Nova collection `radar` (`src/content/radar/*.md`) com schema: `title`, `date`, `summary`, `type` (`conceito` | `pratica` | `ferramenta` | `tendencia`), `tags`, `example` (marca itens ilustrativos) e `draft` (oculta sem apagar).
- Páginas: `/radar` (lista do mais recente para o mais antigo, empate desempatado pelo id) e `/radar/<arquivo>` (item completo). A página por item existe porque o corpo em Markdown precisa de um lugar para ser lido; a lista mostra só o resumo.
- Ordenação isolada em uma função pura (`src/lib/radar-sort.ts`) testada com Vitest; `src/lib/radar.ts` faz a leitura da collection.
- Item "AI Radar" no `Header.astro`. O link fica com `aria-current="page"` em `/radar` e `aria-current="true"` nas páginas de item (a seção está ativa, mas não é a página atual). O estado ativo agora também tem sublinhado, não só cor.
- Os 3 itens iniciais são **exemplos** (`example: true`, com aviso visível) e trazem só conteúdo conceitual estável — sem números, versões ou eventos datados.
- O Radar não se conecta ao progresso: não é currículo, não tem formulário nem conclusão.

## Consequências

- Adicionar lentes a um módulo, ou um novo item ao Radar, é só conteúdo — nenhuma mudança de código.
- O Radar exige curadoria: itens podem ficar desatualizados. `draft: true` permite retirá-los da publicação sem perder o histórico.
- Rotas novas para a auditoria de acessibilidade do CI (frente B): `/radar` e uma página de item.
