# Formulário — Tokens e Context Window

Módulo: `tokens-context-window` (chave em `src/data/forms.json`)

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "O quanto você entende o que é um token e por que a janela de contexto de um modelo é limitada?" — escala 1–5.
- "Você consegue explicar isso para outra pessoa do time?" — não / com ajuda / sim.
- Pergunta conceitual curta: "Um token é o mesmo que uma palavra? Explique em uma frase." — texto curto.

## evidence

Objetivo: registrar a estimativa de tokens e a seleção de contexto relevante do lab.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `tokens-context-window`.
- "Qual arquivo/documento você usou (nome ou descrição)?" — texto curto.
- "Sua estimativa de tokens" — texto curto.
- "Quais ~20% do arquivo você selecionou como realmente necessários?" — parágrafo.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você entende tokens e Context Window como recursos finitos?" — escala 1–5.
- "Você consegue aplicar isso ao preparar um prompt/contexto no seu trabalho?" — não / com ajuda / sim.
- "Você já teve uma resposta de IA piorar por excesso de contexto colado?" — sim / não.
- Caso real (condicional a "sim") — parágrafo, opcional, sem incluir dados sensíveis.
- "Qual fonte você deixará de incluir por padrão no contexto?" — parágrafo, opcional.
