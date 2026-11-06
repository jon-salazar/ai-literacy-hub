# Formulário — Prompt vs Context

Módulo: `prompt-vs-context` (chave em `src/data/forms.json`)

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "O quanto você diferencia, na prática, o que é 'prompt' do que é 'contexto' em um pedido para uma IA?" — escala 1–5.
- "Você consegue explicar essa diferença para outra pessoa do time?" — não / com ajuda / sim.
- Pergunta conceitual curta: "Complete: o prompt define ___; o contexto define ___." — texto curto.

## evidence

Objetivo: registrar a separação de um pedido real em prompt vs contexto, feita no lab.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `prompt-vs-context`.
- "Qual foi o pedido real que você analisou?" — parágrafo.
- "O que você classificou como prompt?" — parágrafo.
- "O que você classificou como contexto?" — parágrafo.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você diferencia prompt de contexto?" — escala 1–5.
- "Você consegue aplicar essa separação ao preparar um pedido real para uma IA?" — não / com ajuda / sim.
- "Você já reescreveu um prompt várias vezes quando na verdade faltava contexto?" — sim / não.
- Caso real (condicional a "sim") — parágrafo, opcional, sem incluir dados sensíveis.
- "Que informação você passou a explicitar nos seus pedidos?" — parágrafo, opcional.
