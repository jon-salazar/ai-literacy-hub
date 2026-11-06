# Spec — 001 Learning Hub POC

Ver [docs/vision.md](../../docs/vision.md) e [docs/architecture.md](../../docs/architecture.md) para contexto.

## Objetivo

Aplicação web estática onde um participante consegue: entender a proposta do programa, visualizar as três fases, navegar pelo currículo, acessar o módulo completo de Context Engineering, enviar evidência via Google Forms, e manter progresso local entre sessões no mesmo navegador.

## Requisitos funcionais

### RF1 — Home (`/`)
- Exibe título/tagline do programa e as três fases como cards.
- Cada card mostra: número, nome, descrição, status (`active`/`coming-soon`), quantidade de módulos publicados quando disponível.
- Fase 1 é clicável e leva a `/fases/foundations`. Fases 2 e 3 são exibidas como "Em breve" (sem link quebrado — podem não ser clicáveis, ou levar a uma página de fase que mostra estado "coming soon").

### RF2 — Página de fase (`/fases/[phase]`)
- Exibe título, descrição, transformação esperada, status da fase.
- Lista módulos da fase, ordenados por `order`, cada um com título, duração, status.
- Módulos `published` são clicáveis e levam a `/modulos/[slug]`.
- Módulos `coming-soon`/`draft` aparecem visualmente desabilitados, sem link quebrado.
- Mostra progresso do participante na fase (derivado do localStorage).

### RF3 — Página de módulo (`/modulos/[slug]`)
- Rota dinâmica gerada a partir da Content Collection `modules` — nenhuma página Astro específica por módulo.
- Renderiza, na ordem definida em [docs/learning-model.md](../../docs/learning-model.md): introdução, objetivos, baseline (Form), conceito, demo, lab, evidência (Form), reflexão (Form), conclusão.
- Permite marcar o módulo como "iniciado" (ao entrar) e "concluído" (ação explícita do participante).
- Se o slug não corresponder a um módulo existente, retorna 404 (comportamento padrão do Astro), não um erro de build.

### RF4 — Conteúdo completo da Fase 1
- Todos os 11 módulos de `docs/product_vision.md`/`docs/initial_prompt.md` para a Fase 1 têm status `published` com experiência completa (não apenas Context Engineering, que era o mínimo original do briefing — ver "Ambiguidades resolvidas" abaixo).
- Cada módulo published tem: introdução, objetivos, conceito (corpo Markdown), demo (comparação A/B), lab, reflection prompts e completion message, seguindo a estrutura do [docs/learning-model.md](../../docs/learning-model.md).
- Nenhuma chamada real a LLM — todo demo é uma comparação textual/estruturada estática.
- Apenas o módulo Context Engineering usa o `TaskContextCanvas` interativo no lab (`lab.useTaskContextCanvas: true`); os demais módulos têm labs com instrução textual direta, por serem exercícios de reflexão/classificação em vez de estruturação de contexto.
- A ordem dos módulos segue a progressão pedagógica: IA/GenAI/LLMs → Como LLMs funcionam → Tokens e Context Window → Prompt vs Context → Context Engineering → Models → Tools → Grounding e RAG → Limitações e alucinação → Segurança → Human-in-the-loop.

### RF5 — Integração com Google Forms
- Configuração em `src/data/forms.json`, por módulo, para os três formulários (`baseline`, `evidence`, `reflection`).
- Suporta modo embed (iframe) e modo link externo (CTA).
- Se um formulário não estiver configurado (URL ausente), a seção correspondente mostra estado "configuração pendente" e a página continua funcional.
- Quando configurado com `prefillParticipantIdField`, a URL/embed inclui o `participantId` como parâmetro de prefill.

### RF6 — Progresso local
- No primeiro acesso, gera `participantId` aleatório (sem dados pessoais) e persiste em `localStorage`.
- Reutiliza o mesmo ID em acessos seguintes no mesmo navegador.
- Registra módulos iniciados e concluídos com timestamp.
- Progresso sobrevive a reload e fechamento do navegador.
- Não sincroniza entre dispositivos; não requer login.

### RF7 — Página de progresso (`/progresso`, opcional mas incluída)
- Mostra `participantId`, módulos iniciados/concluídos, percentual por fase.
- Seção conceitual do Maturity Map com dados explicitamente marcados como demonstrativos (nunca como reais).

## Requisitos não funcionais

- 100% estático: `astro build` gera site servível sem backend.
- Responsivo: funcional em viewport mobile (≥360px) e desktop.
- Acessível: HTML semântico, labels em formulários, navegação por teclado, contraste adequado, `prefers-reduced-motion` respeitado, interação não depende só de cor.
- Conteúdo publicado validado por schema (Zod via Content Collections); build falha se inválido.
- Sem segredos/credenciais no repositório.
- TypeScript sem erros (`astro check`).

## Fora de escopo

Ver seção "Out of Scope" em [docs/initial_prompt.md](../../docs/initial_prompt.md) e "Scope guard" em [CLAUDE.md](../../CLAUDE.md): autenticação, cadastro, SSO, backend, banco de dados, API própria, CMS/LMS, certificados, badges, gamificação, gestão de cohorts, RBAC, notificações, e-mail, dashboard corporativo real, integração Google Sheets, avaliação automática por IA, chatbot/agente dentro do Hub, Fase 4.

Conteúdo completo das Fases 2 e 3 continua fora de escopo — apenas a Fase 1 (Fundamentos & Uso Consciente) foi expandida para conteúdo completo, por pedido explícito do usuário após a POC inicial (ver "Ambiguidades resolvidas").

## Ambiguidades resolvidas

- **`/progresso` era opcional no briefing.** Decisão: incluir, pois RF6 (progresso persistente) precisa de alguma superfície visível para ser verificável por um usuário sem abrir devtools; sem isso o critério de aceite "visualizar progresso local" (item 11 do initial_prompt) fica sem UI. Complexidade adicional é baixa (reaproveita `progress.ts` e componentes existentes).
- **Fases 2 e 3 "podem ser exibidas como Em breve"**: decisão de ainda gerar `/fases/agentic-ai` e `/fases/ai-native-engineering` (a partir do curriculum) mostrando estado coming-soon, em vez de omitir a rota — evita links mortos a partir da Home e mantém a navegação por fase genérica (mesma rota dinâmica para as três fases).
- **Escopo da Fase 1 expandido pós-entrega inicial**: o briefing original ("Módulo POC") exigia apenas Context Engineering completo, com os demais 10 módulos da Fase 1 como currículo `coming-soon`. O usuário pediu explicitamente a implementação do restante da Fase 1. Decisão: generalizar o schema de `demo` (antes moldado especificamente para o Task Context Canvas de 5 campos) para um formato genérico de duas versões de texto (`versionAText`/`versionBText`), reutilizável por qualquer módulo sem acoplar componentes a Context Engineering — ver [docs/architecture.md](../../docs/architecture.md).
- **Prerequisites de módulo**: schema aceita array opcional de slugs, mas nenhum módulo da POC o usa; não há UI de bloqueio por pré-requisito nesta POC (seria complexidade sem retorno claro no escopo atual).
