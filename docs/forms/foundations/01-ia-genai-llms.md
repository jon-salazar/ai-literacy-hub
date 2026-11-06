# Formulário — IA, GenAI e LLMs

Módulo: `ia-genai-llms` (chave em `src/data/forms.json`)

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "Hoje, o quanto você diferencia com segurança IA, Machine Learning, IA Generativa e LLM?" — escala 1–5.
- "Você consegue explicar essa diferença para outra pessoa do time?" — não / com ajuda / sim.
- Pergunta conceitual curta: "Complete: '___ é o campo; ___ é uma abordagem dentro dele; ___ é uma capacidade; ___ é a tecnologia por trás de GenAI para texto.'" — texto curto (referência: Machine Learning, Inteligência Artificial, IA Generativa, LLM, em alguma ordem correta).

## evidence

Objetivo: registrar o exercício de classificação do lab.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `ia-genai-llms`.
- "Ferramenta 1: nome e classificação" — texto curto.
- "Ferramenta 1: por que essa classificação muda sua expectativa" — texto curto.
- "Ferramenta 2: nome e classificação" — texto curto.
- "Ferramenta 2: por que essa classificação muda sua expectativa" — texto curto.
- "Ferramenta 3: nome e classificação" — texto curto.
- "Ferramenta 3: por que essa classificação muda sua expectativa" — texto curto.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você diferencia IA, ML, GenAI e LLM?" — escala 1–5.
- "Você consegue aplicar essa distinção no seu trabalho?" — não / com ajuda / sim.
- "Você já teve, ou já viu alguém ter, uma expectativa errada por confundir esses termos?" — sim / não.
- Caso real (condicional a "sim") — parágrafo, opcional, sem incluir dados sensíveis.
- "Qual componente além do modelo (dados, integração, revisão humana) você passou a considerar no desenho de uma solução com IA?" — parágrafo, opcional.
