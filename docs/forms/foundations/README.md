# Referência de Formulários — Fase 1

Este diretório documenta, para cada um dos 11 módulos da Fase 1 (Fundamentos & Uso Consciente), os campos conceituais que os três Google Forms (`baseline`, `evidence`, `reflection`), compartilhados por todos os módulos, devem cobrir para cada módulo.

Isso **não** é a configuração de runtime da aplicação (essa fica em [src/data/forms.json](../../../src/data/forms.json)) — é o roteiro de conteúdo para quem for efetivamente criar os Forms no Google Forms.

## Configuração: 3 Google Forms para todos os módulos

Desde a v0.2.0 o Hub usa **apenas 3 Google Forms no total** — um por etapa (`baseline`, `evidence`, `reflection`) — compartilhados por todos os módulos. Cada resposta é associada ao módulo por um campo oculto `module_id`, pré-preenchido pelo Hub. Ver [ADR 002](../../adr/002-forms-genericos.md).

### Passo a passo

1. **Crie os 3 Forms** no Google Forms: "Baseline", "Evidência" e "Reflexão". As perguntas de cada um seguem a estrutura comum abaixo; as perguntas específicas de cada módulo (arquivos `NN-*.md`) podem virar seções ou perguntas genéricas, já que o `module_id` identifica o módulo.
2. **Adicione em cada Form duas perguntas de resposta curta**, que funcionam como campos ocultos:
   - `participant_id`
   - `module_id`

   O Google Forms não tem campo oculto nativo: coloque essas duas perguntas numa seção final (ou numa seção própria) com a descrição "Preenchido automaticamente pelo Hub — não altere". Não as marque como obrigatórias.
3. **Obtenha os `entry.*`** de cada Form: menu ⋮ → *Gerar link de preenchimento prévio* → preencha `participant_id` com `PID_TESTE` e `module_id` com `MOD_TESTE` → *Gerar link* → copie. O link terá o formato:

   ```
   https://docs.google.com/forms/d/e/<ID>/viewform?usp=pp_url&entry.1111111111=PID_TESTE&entry.2222222222=MOD_TESTE
   ```

   O `entry.*` antes de `=PID_TESTE` é o `prefillParticipantIdField`; o antes de `=MOD_TESTE` é o `prefillModuleIdField`.
4. **Preencha `defaults`** em `src/data/forms.json` com a URL base (`.../viewform`, sem os `entry.*`; pode manter `?usp=pp_url`) e os dois campos:

   ```json
   {
     "defaults": {
       "baseline": {
         "url": "https://docs.google.com/forms/d/e/<ID>/viewform?usp=pp_url",
         "embed": false,
         "prefillParticipantIdField": "entry.1111111111",
         "prefillModuleIdField": "entry.2222222222"
       },
       "evidence": { "...": "idem, com os valores do Form de Evidência" },
       "reflection": { "...": "idem, com os valores do Form de Reflexão" }
     },
     "overrides": {}
   }
   ```

   `embed: true` mostra o Form num iframe na página; `false` mostra um botão que abre o Form em nova aba.
5. **Valide**: rode `npm run dev`, abra um módulo e confira que o link do formulário contém os dois `entry.*` com o `participantId` e o id do módulo.

### Overrides (opcional)

Se um módulo precisar de um Form próprio, adicione uma entrada em `overrides` usando o `id` do módulo. Apenas os campos informados sobrescrevem o default daquela etapa:

```json
"overrides": {
  "context-engineering": {
    "evidence": { "url": "https://docs.google.com/forms/d/e/<OUTRO_ID>/viewform", "embed": true }
  }
}
```

Módulos novos funcionam sem nenhuma entrada no JSON — usam os `defaults`.

### Privacidade

O Hub envia ao Form somente o `participantId` (aleatório, pseudônimo) e o id do módulo. Não peça nome, e-mail, matrícula ou outros dados pessoais nos Forms; a página mostra um aviso de LGPD junto a cada formulário configurado.

## Estrutura comum aos três Forms

Todo módulo segue o mesmo roteiro de três formulários, alinhado ao modelo pedagógico em [docs/learning-model.md](../../learning-model.md):

- **baseline** — aplicado antes do conteúdo (seção "Avaliação inicial" da página do módulo). Objetivo: capturar percepção inicial.
- **evidence** — aplicado após o lab (seção "Evidência"). Objetivo: registrar a aplicação prática.
- **reflection** — aplicado ao final (seção "Reflexão"). Objetivo: capturar mudança de percepção e intenção de aplicação real.

Campos que se repetem em praticamente todos os Forms:

- `participant_id` — campo de texto curto, oculto/pré-preenchido via link parametrizado (nunca pedido manualmente ao participante).
- `module_id` — campo de texto curto, oculto/pré-preenchido pelo Hub com o id do módulo.
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
