# Referência de Formulários — Fase 1

Este diretório documenta, para cada um dos 11 módulos da Fase 1 (Fundamentos & Uso Consciente), os campos conceituais que os três Google Forms do módulo (`baseline`, `evidence`, `reflection`) devem ter.

Isso **não** é a configuração de runtime da aplicação (essa fica em [src/data/forms.json](../../../src/data/forms.json)) — é o roteiro de conteúdo para quem for efetivamente criar os Forms no Google Forms. Depois de criar cada Form:

1. Copie a URL pública de resposta do Form.
2. Para prefill do `participantId`, gere um link de preenchimento prévio no Google Forms usando um valor de teste no campo correspondente e extraia o parâmetro `entry.xxxxx` da URL gerada.
3. Preencha `url`, `embed` e `prefillParticipantIdField` na entrada correspondente em `src/data/forms.json`, usando o `id` do módulo como chave.

## Estrutura comum aos três Forms

Todo módulo segue o mesmo roteiro de três formulários, alinhado ao modelo pedagógico em [docs/learning-model.md](../../learning-model.md):

- **baseline** — aplicado antes do conteúdo (seção "Avaliação inicial" da página do módulo). Objetivo: capturar percepção inicial.
- **evidence** — aplicado após o lab (seção "Evidência"). Objetivo: registrar a aplicação prática.
- **reflection** — aplicado ao final (seção "Reflexão"). Objetivo: capturar mudança de percepção e intenção de aplicação real.

Campos que se repetem em praticamente todos os Forms:

- `participant_id` — campo de texto curto, oculto/pré-preenchido via link parametrizado (nunca pedido manualmente ao participante).
- `role` (apenas no baseline) — múltipla escolha: Dev / QA / PO / TL / Outro.
- Escalas de percepção (1–5) — usar o mesmo texto de escala em todos os módulos para permitir comparação no Maturity Map futuro: 1 = "Nunca ouvi falar" … 5 = "Consigo explicar e aplicar com segurança".
- "Consegue aplicar" — múltipla escolha fixa: `não` / `com ajuda` / `sim`.

## Módulos

1. [01-ia-genai-llms.md](01-ia-genai-llms.md) — IA, GenAI e LLMs
2. [02-como-llms-funcionam.md](02-como-llms-funcionam.md) — Como LLMs funcionam
3. [03-tokens-context-window.md](03-tokens-context-window.md) — Tokens e Context Window
4. [04-prompt-vs-context.md](04-prompt-vs-context.md) — Prompt vs Context
5. [05-context-engineering.md](05-context-engineering.md) — Context Engineering
6. [06-models.md](06-models.md) — Models
7. [07-tools.md](07-tools.md) — Tools
8. [08-grounding-rag.md](08-grounding-rag.md) — Grounding e RAG
9. [09-limitacoes-alucinacao.md](09-limitacoes-alucinacao.md) — Limitações e alucinação
10. [10-seguranca.md](10-seguranca.md) — Segurança
11. [11-human-in-the-loop.md](11-human-in-the-loop.md) — Human-in-the-loop
