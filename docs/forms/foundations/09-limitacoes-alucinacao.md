# Formulário — Limitações e alucinação

Módulo: `limitacoes-alucinacao` (chave em `src/data/forms.json`)

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "O quanto você sabe reconhecer os sinais de uma resposta de IA possivelmente alucinada?" — escala 1–5.
- "Você verifica, hoje, afirmações críticas antes de usá-las?" — não / com ajuda / sim.
- Pergunta conceitual curta: "Fluência e tom confiante de uma resposta são sinal de que ela está correta? Por quê?" — texto curto.

## evidence

Objetivo: registrar a verificação de uma resposta feita no lab.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `limitacoes-alucinacao`.
- "Qual pergunta específica e verificável você fez?" — texto curto.
- "A resposta estava: correta / parcialmente correta / incorreta" — múltipla escolha.
- "O que a tornava (ou não) convincente antes de você verificar?" — parágrafo.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você sabe reconhecer sinais de alucinação?" — escala 1–5.
- "Você consegue calibrar o esforço de verificação ao risco real da tarefa?" — não / com ajuda / sim.
- "Você identificaria uma tarefa do seu trabalho que exige alto nível de verificação hoje?" — sim / não.
- Tarefa identificada (condicional a "sim") — parágrafo, opcional, sem incluir dados sensíveis.
- "Qual falha seria mais difícil de detectar no seu contexto?" — parágrafo, opcional.
