---
id: prompt-vs-context
slug: prompt-vs-context
title: Prompt vs Context
description: >-
  Diferencie o que você está pedindo (prompt) daquilo que a IA precisa saber
  para executar bem (context) — a base conceitual do próximo módulo.
phase: foundations
order: 4
duration: 15 minutos
status: published
objectives:
  - Diferenciar claramente prompt de contexto.
  - Identificar, em uma solicitação real, o que é instrução e o que é informação de apoio.
  - Reconhecer os sintomas de um pedido que tem prompt bem escrito mas contexto insuficiente.
introduction: >-
  Um erro comum é tentar melhorar a qualidade de uma resposta reescrevendo
  apenas a frase do pedido — tornando-a mais educada, mais detalhada, com mais
  adjetivos. Isso ajuda até certo ponto, mas ignora uma pergunta mais
  importante: o modelo tem a informação de que precisa para executar bem essa
  tarefa? Prompt e contexto são coisas diferentes, e confundi-los é uma causa
  frequente de respostas genéricas ou erradas mesmo quando o pedido em si está
  bem formulado.
keyMessage: O prompt define o que você está pedindo. O contexto define o que o modelo precisa saber para conseguir atender esse pedido corretamente.
demo:
  versionALabel: "Versão A — só melhorando o prompt"
  versionAText: >-
    "Por favor, com todo cuidado e atenção aos detalhes, adicione uma
    validação de CPF robusta e bem testada nesta API, seguindo as melhores
    práticas."
  versionBLabel: "Versão B — mesmo prompt, com contexto anexado"
  versionBText: >-
    Prompt: "Adicione validação de CPF nesta API."

    Context anexado: qual é o endpoint exato, qual stack é usada, se já existe
    um padrão de validação no projeto, se dependências novas podem ser
    adicionadas, como os erros são retornados atualmente, e quais testes já
    existem para esse fluxo.

    O prompt continua simples — o que mudou foi a informação disponível para
    executá-lo.
  explanation: >-
    A Versão A tenta compensar falta de informação com mais adjetivos e
    ênfase no pedido — isso raramente funciona, porque o modelo continua sem
    saber qual endpoint, qual padrão seguir ou o que não pode quebrar. A
    Versão B resolve o problema real: fornecer o contexto que faltava, mesmo
    mantendo o prompt simples.
lab:
  scenario: >-
    Pense em um pedido real que você já fez (ou faria) a um assistente de IA
    no seu trabalho — por exemplo, pedir ajuda para escrever uma função,
    resumir um documento, ou revisar um texto.
  instructions: >-
    Separe esse pedido em duas listas: "isso é o prompt" (o que você está
    pedindo) e "isso é contexto" (informação que o modelo precisaria saber
    para fazer bem, mesmo que você não tivesse fornecido da primeira vez).
    Registre as duas listas no formulário de evidência.
  useTaskContextCanvas: false
reflectionPrompts:
  - Ao separar as duas listas, você percebeu contexto que normalmente não forneceria?
  - Alguma vez você reescreveu um prompt várias vezes quando na verdade faltava contexto?
  - O que mudaria no seu fluxo de trabalho se você separasse essas duas etapas deliberadamente?
completionMessage: >-
  Agora que você sabe diferenciar prompt de contexto, o próximo módulo,
  Context Engineering, apresenta um modelo prático — o Task Context Canvas —
  para estruturar esse contexto de forma sistemática antes de delegar uma
  tarefa a um modelo ou agente.
roleLenses:
  dev:
    - "Antes de reescrever o pedido, verifique se o modelo tem o contexto necessário: código existente, padrões do projeto e restrições."
    - "Separe no seu pedido a instrução (o que fazer) das informações de apoio (o que o modelo precisa saber)."
  qa:
    - "Quando a resposta for genérica, investigue primeiro se faltou contexto antes de concluir que o modelo é ruim."
    - "Ao pedir casos de teste à IA, forneça regras de negócio e critérios de aceite, não apenas 'gere testes para esta tela'."
  po:
    - "Histórias de usuário bem escritas já são contexto: objetivo, regras de negócio e critérios de aceite ajudam pessoas e modelos."
    - "Ao usar IA para refinar o backlog, inclua o porquê da demanda e as restrições conhecidas, não só o título do item."
  tl:
    - "Ensine o time a diagnosticar respostas ruins perguntando 'faltou instrução ou faltou contexto?'."
    - "Mantenha a documentação de arquitetura e decisões acessível; ela é o contexto que todos vão reutilizar."
---

## Prompt

O **prompt** é a instrução direta: o que você está pedindo. É a parte mais visível de uma interação com IA, e por isso é onde a maioria das pessoas foca todo o esforço de melhoria — reescrever a frase, adicionar mais detalhes na própria instrução, tentar frases mágicas.

## Context

O **contexto** é tudo o que cerca essa instrução e que o modelo precisaria saber para executá-la corretamente: arquitetura do sistema, código existente, documentação, regras de negócio, decisões anteriores, exemplos de bom resultado, restrições que não podem ser violadas.

## O sintoma de contexto insuficiente

Um prompt bem escrito, mas sem contexto suficiente, tem um sintoma característico: a resposta é plausível, bem formatada, até bem escrita — mas genérica ou desalinhada com a realidade específica do seu problema. O modelo não "adivinhou errado" por falta de capacidade; ele preencheu, de forma razoável, as lacunas que você deixou.

## A mudança de pergunta

Em vez de perguntar "como escrevo um prompt melhor?", a pergunta mais produtiva costuma ser: "o que a IA precisa saber para conseguir executar bem esta tarefa?" Essa mudança de perspectiva — de otimizar a frase para otimizar o ambiente informacional — é a porta de entrada para Context Engineering, o próximo módulo.
