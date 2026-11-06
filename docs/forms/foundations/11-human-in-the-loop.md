# Formulário — Human-in-the-loop

Módulo: `human-in-the-loop` (chave em `src/data/forms.json`)

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "O quanto você sabe decidir quando uma ação de IA precisa de revisão humana antes de executar?" — escala 1–5.
- "Você consegue justificar essa decisão para outra pessoa do time?" — não / com ajuda / sim.
- Pergunta conceitual curta: "O objetivo de um sistema de IA é maximizar autonomia? Por quê?" — texto curto.

## evidence

Objetivo: registrar as quatro decisões de nível de autonomia do lab.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `human-in-the-loop`.
- "Ação 1 (sugerir categoria do ticket): nível de autonomia e justificativa" — parágrafo.
- "Ação 2 (responder FAQ automaticamente): nível de autonomia e justificativa" — parágrafo.
- "Ação 3 (reembolsar cliente): nível de autonomia e justificativa" — parágrafo.
- "Ação 4 (apagar ticket duplicado): nível de autonomia e justificativa" — parágrafo.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo — e fechamento da Fase 1.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você sabe calibrar checkpoints humanos em um sistema de IA?" — escala 1–5.
- "Você consegue aplicar esse critério em um processo real do seu trabalho?" — não / com ajuda / sim.
- "Você identificaria um processo real onde adicionaria (ou removeria) um checkpoint humano hoje?" — sim / não.
- Processo identificado (condicional a "sim") — parágrafo, opcional, sem incluir dados sensíveis.
- "Em que situação uma aprovação humana seria apenas ritual?" — parágrafo, opcional.
- "Olhando para toda a Fase 1, qual conceito você mais aplicaria esta semana no seu trabalho?" — parágrafo, opcional (fecha a fase, alimenta o Maturity Map e a curadoria de próximos encontros síncronos).
