# Formulário — Segurança

Módulo: `seguranca` (chave em `src/data/forms.json`)

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "O quanto você sabe reconhecer riscos de segurança ao usar IA (dados sensíveis, prompt injection)?" — escala 1–5.
- "Você já avaliou a política de retenção de dados de uma ferramenta de IA antes de usá-la?" — não / com ajuda / sim.
- Pergunta conceitual curta: "O que é prompt injection, em uma frase?" — texto curto.

## evidence

Objetivo: registrar a identificação da tentativa de prompt injection do lab.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `seguranca`.
- "Qual parte do texto você identificou como prompt injection?" — parágrafo.
- "Por que um agente com acesso a ferramentas seria vulnerável a isso?" — parágrafo.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você sabe reconhecer riscos de segurança em IA?" — escala 1–5.
- "Você consegue aplicar higienização de dados antes de compartilhar com uma IA?" — não / com ajuda / sim.
- "Existe uma ação que você nunca deixaria um agente de IA executar sem revisão humana?" — sim / não.
- Ação identificada (condicional a "sim") — parágrafo, opcional, sem incluir dados sensíveis.
- "Que dado você deixará de enviar por hábito? (descreva o tipo de dado, sem incluir o dado)" — parágrafo, opcional.
