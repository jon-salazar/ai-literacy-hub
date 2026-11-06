# Formulário — MCP (Model Context Protocol)

Módulo: `mcp` (id/slug do módulo; chave de configuração dos Forms)

## baseline

Objetivo: capturar percepção antes do módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `role` — múltipla escolha: Dev / QA / PO / TL / Outro.
- "O quanto você entende o que é o Model Context Protocol (MCP) e o problema que ele resolve?" — escala 1–5.
- "Você consegue explicar a diferença entre Host, Client e Server para outra pessoa do time?" — não / com ajuda / sim.
- "Você já usou alguma aplicação de IA conectada a um servidor MCP?" — não / não sei / sim.
- Pergunta conceitual curta: "Qual a diferença entre dar uma tool a um modelo e expor essa tool via MCP?" — texto curto.

## evidence

Objetivo: registrar o desenho de servidor MCP produzido no lab (investigação de build quebrado).

Campos:
- `participant_id` — texto curto, oculto/prefill.
- `module_id` — texto curto, oculto, valor fixo `mcp`.
- "Tools do servidor (nome, parâmetros, somente leitura ou com efeito real)" — parágrafo.
- "Resources do servidor (quais dados entram como contexto)" — parágrafo.
- "Prompts do servidor (templates escolhidos pelo usuário)" — parágrafo, opcional.
- "O que ficou deliberadamente fora do servidor, e por quê?" — parágrafo.
- "Quais Tools exigem aprovação humana antes de executar? Justifique." — parágrafo.
- Comentário opcional — parágrafo, opcional.

## reflection

Objetivo: capturar mudança de percepção após o módulo.

Campos:
- `participant_id` — texto curto, oculto/prefill.
- "Depois deste módulo, o quanto você entende o papel do MCP em um sistema agêntico?" — escala 1–5.
- "Você consegue classificar capacidades de um sistema em Tools, Resources e Prompts?" — não / com ajuda / sim.
- "Alguma capacidade mudou de categoria (Tool ↔ Resource) enquanto você fazia o lab?" — sim / não.
- "Que sistema real do seu time seria o melhor candidato para um primeiro servidor MCP?" — parágrafo, opcional, sem incluir dados sensíveis, nomes de clientes ou credenciais.
- "Que capacidade você nunca exporia a um agente, mesmo com aprovação humana?" — parágrafo, opcional.
