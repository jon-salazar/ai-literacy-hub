# Formulário — Context Engineering

Módulo: `context-engineering` (chave em `src/data/forms.json`).

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "O quanto você sabe estruturar contexto (não apenas o pedido) antes de delegar uma tarefa a uma IA?" — escala 1–5.
- "Você consegue construir um Task Context Canvas sozinho(a)?" — não / com ajuda / sim.
- Pergunta conceitual curta: "Qual a diferença entre Prompt Engineering e Context Engineering?" — texto curto.

## evidence

Objetivo: registrar o Task Context Canvas preenchido no lab (cenário de elegibilidade de ofertas).

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `context-engineering`.
- "Objective" — parágrafo.
- "Context" — parágrafo.
- "Artifacts" — parágrafo.
- "Constraints" — parágrafo.
- "Acceptance Criteria" — parágrafo.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você sabe estruturar contexto para uma IA?" — escala 1–5.
- "Você consegue aplicar o Task Context Canvas em uma tarefa real?" — não / com ajuda / sim.
- "Você tem uma tarefa real do seu trabalho onde aplicaria isso?" — sim / não.
- Caso real (condicional a "sim") — parágrafo, opcional, sem incluir dados sensíveis.
- "Que informações você inicialmente não pensaria em fornecer?" — parágrafo, opcional (retomando o reflection prompt do módulo).
- "Que decisões você conseguiu impedir que a IA tivesse que adivinhar?" — parágrafo, opcional (retomando o reflection prompt do módulo).
