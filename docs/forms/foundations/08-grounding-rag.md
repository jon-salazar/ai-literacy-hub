# Formulário — Grounding e RAG

Módulo: `grounding-rag` (chave em `src/data/forms.json`)

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "O quanto você entende o que é Grounding e como RAG reduz o risco de invenção?" — escala 1–5.
- "Você consegue explicar isso para outra pessoa do time?" — não / com ajuda / sim.
- Pergunta conceitual curta: "O que significam as três etapas de RAG (Retrieve, Augment, Generate)?" — texto curto.

## evidence

Objetivo: registrar a análise de fonte necessária feita no lab.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `grounding-rag`.
- "Qual pergunta real (sua ou de alguém do time) você analisou?" — parágrafo.
- "Qual documento/fonte deveria ter sido consultado?" — parágrafo.
- "O que aconteceria se o modelo respondesse sem essa fonte?" — parágrafo.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você entende quando uma resposta de IA precisa de grounding?" — escala 1–5.
- "Você consegue identificar quando uma pergunta do seu trabalho exige RAG?" — não / com ajuda / sim.
- "Existe uma fonte confiável do seu time que hoje não é usada como contexto e poderia ser?" — sim / não.
- Fonte identificada (condicional a "sim") — parágrafo, opcional, sem incluir dados sensíveis.
- "Que sinal de qualidade da fonte você passará a verificar?" — parágrafo, opcional.
