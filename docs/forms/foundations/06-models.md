# Formulário — Models

Módulo: `models` (chave em `src/data/forms.json`)

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "O quanto você sabe escolher um modelo de IA adequado a uma tarefa (em vez de sempre usar o mais avançado)?" — escala 1–5.
- "Você consegue justificar essa escolha para outra pessoa do time?" — não / com ajuda / sim.
- Pergunta conceitual curta: "Cite os três eixos que diferenciam modelos entre si." — texto curto (referência: capacidade, custo, latência).

## evidence

Objetivo: registrar as três decisões de escolha de modelo do lab.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `models`.
- "Tarefa 1 (resumir e-mail longo): prioridade escolhida e justificativa" — parágrafo.
- "Tarefa 2 (revisar lógica crítica antes de deploy): prioridade escolhida e justificativa" — parágrafo.
- "Tarefa 3 (classificar centenas de mensagens/dia): prioridade escolhida e justificativa" — parágrafo.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você sabe escolher um modelo adequado a uma tarefa?" — escala 1–5.
- "Você consegue aplicar esse critério de escolha no seu trabalho?" — não / com ajuda / sim.
- "Você já usou um modelo mais 'pesado' (ou mais simples) do que a tarefa exigia?" — sim / não.
- Caso real (condicional a "sim") — parágrafo, opcional, sem incluir dados sensíveis.
- "Qual critério (capacidade, custo, latência) passou a pesar mais na sua decisão?" — parágrafo, opcional.
