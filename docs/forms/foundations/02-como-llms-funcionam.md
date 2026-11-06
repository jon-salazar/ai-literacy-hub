# Formulário — Como LLMs funcionam

Módulo: `como-llms-funcionam` (chave em `src/data/forms.json`)

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "O quanto você entende por que a mesma pergunta pode gerar respostas diferentes de uma IA em execuções distintas?" — escala 1–5.
- "Você consegue explicar isso para outra pessoa do time?" — não / com ajuda / sim.
- Pergunta conceitual curta: "Um LLM responde buscando a resposta certa em uma base de dados. Verdadeiro ou falso? Por quê?" — texto curto.

## evidence

Objetivo: registrar o exercício de comparar duas respostas à mesma pergunta.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `como-llms-funcionam`.
- "Qual pergunta você usou?" — texto curto.
- "O que mudou entre as duas respostas?" — parágrafo.
- "O que se manteve estável entre as duas respostas?" — parágrafo.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você entende a natureza probabilística das respostas de um LLM?" — escala 1–5.
- "Você consegue calibrar o nível de verificação necessário de acordo com o risco da tarefa?" — não / com ajuda / sim.
- "Você tem um caso real de trabalho onde aplicaria essa calibração?" — sim / não.
- Caso real (condicional a "sim") — parágrafo, opcional, sem incluir dados sensíveis.
- "Que sinal de fluência em uma resposta de IA você passará a tratar com cautela?" — parágrafo, opcional.
