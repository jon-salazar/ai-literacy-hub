# Learning Model — AI Literacy Hub

## Estrutura padrão de um módulo

**CONCEITO → DEMO → PRÁTICA → REFLEXÃO → EVIDÊNCIA**

Na POC, a página de módulo renderiza estas seções, na ordem:

1. Introdução (abertura/motivação);
2. Objetivos de aprendizagem;
3. Baseline (avaliação inicial, via Form);
4. Conceito (conteúdo central);
5. Demo (comparação prática);
6. Lab (exercício aplicado);
7. Evidência (registro do exercício, via Form);
8. Reflexão (avaliação final, via Form);
9. Conclusão.

## Task Context Canvas

Mental model ensinado no módulo de Context Engineering, reaproveitável como componente genérico (`TaskContextCanvas`) para qualquer módulo futuro que precise apresentar um template estruturado:

- **Objective** — o que precisa ser alcançado?
- **Context** — o que a IA precisa saber sobre o problema e o ambiente?
- **Artifacts** — quais fontes devem ser consultadas?
- **Constraints** — o que precisa ou não pode acontecer?
- **Acceptance Criteria** — que evidências demonstram que o trabalho está correto?

## Sinais de aprendizagem

Coletados via Google Forms (fronteira externa da POC), não pela aplicação:

- **Percepção** — "Eu acredito que entendi" (escala 1–5, antes/depois).
- **Conhecimento** — "Eu consigo explicar".
- **Aplicação** — "Eu consigo fazer" (não / com ajuda / sim). Tem maior peso.

A aplicação prática (Task Context Canvas preenchido no Lab) é a evidência primária.

## Maturity Map (conceitual)

A POC não implementa analytics real. A página `/progresso` pode apresentar, de forma explicitamente marcada como **dados demonstrativos**, como os sinais coletados pelos Forms alimentariam futuramente um Maturity Map (percepção antes/depois, % que consegue aplicar, gaps por campo do Canvas, próxima intervenção síncrona sugerida). Esses números nunca são exibidos como se fossem dados reais de participantes.

## Módulo de referência: Context Engineering

Único módulo com status `published` na POC. Conteúdo derivado de [seed.md](seed.md). Mensagem-chave do módulo:

> O prompt descreve o que eu quero. O contexto fornece aquilo que a IA precisa saber para executar bem.

A demo compara uma instrução isolada ("Adicione validação de CPF nesta API") com a mesma tarefa estruturada via Task Context Canvas. O lab pede que o participante preencha seu próprio Canvas para um cenário fictício de elegibilidade de ofertas. Nenhuma chamada real a um LLM é necessária.
