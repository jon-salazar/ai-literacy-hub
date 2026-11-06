# Formulário — Tools

Módulo: `tools` (chave em `src/data/forms.json`)

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "O quanto você entende como um modelo de IA usa uma tool (function calling) para executar ações reais?" — escala 1–5.
- "Você consegue explicar isso para outra pessoa do time?" — não / com ajuda / sim.
- Pergunta conceitual curta: "O que muda quando um modelo usa uma tool em vez de responder 'de memória'?" — texto curto.

## evidence

Objetivo: registrar a definição de tool do lab.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `tools`.
- "Nome da tool" — texto curto.
- "Parâmetros de entrada" — parágrafo.
- "O que ela devolveria como resultado" — parágrafo.
- "Qual tarefa manual repetitiva ela substitui?" — parágrafo.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você entende o papel de tools em um sistema de IA?" — escala 1–5.
- "Você consegue identificar candidatos a tool no seu trabalho?" — não / com ajuda / sim.
- "Você identificaria alguma tool que precisaria de aprovação humana antes de executar, mesmo definida?" — sim / não.
- Caso real (condicional a "sim") — parágrafo, opcional, sem incluir dados sensíveis.
- "Qual ação você não delegaria a uma tool sem aprovação?" — parágrafo, opcional.
