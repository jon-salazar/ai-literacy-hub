---
id: grounding-rag
slug: grounding-rag
title: Grounding e RAG
description: >-
  Entenda como ancorar as respostas de um modelo em fontes confiáveis usando
  Grounding e Retrieval-Augmented Generation (RAG).
phase: foundations
order: 8
duration: 20 minutos
status: published
objectives:
  - Definir Grounding e explicar por que ele reduz o risco de respostas inventadas.
  - Explicar o fluxo básico de um sistema RAG (buscar, injetar, gerar).
  - Reconhecer quando uma tarefa precisa de RAG e quando não precisa.
introduction: >-
  Um LLM só "sabe" o que estava presente, de forma estatística, nos dados em
  que foi treinado — e esse treinamento tem uma data de corte e não inclui
  documentos internos da sua empresa. Perguntar a um modelo sobre uma política
  interna recente, ou sobre um documento específico que ele nunca viu, é pedir
  para ele adivinhar. Grounding e RAG existem para resolver exatamente esse
  problema: trazer a informação certa para dentro do contexto antes de pedir
  a resposta.
keyMessage: Grounding significa ancorar a resposta em uma fonte real; RAG é a técnica mais comum de fazer isso — buscar o trecho relevante e entregá-lo ao modelo junto com a pergunta.
demo:
  versionALabel: "Versão A — perguntando sem fonte"
  versionAText: "\"Qual é a política de reembolso de despesas da nossa empresa?\" — perguntado diretamente ao modelo, sem fornecer o documento."
  versionBLabel: "Versão B — grounding via RAG"
  versionBText: >-
    O trecho relevante do documento oficial de política de despesas é
    recuperado (buscado) a partir de uma base de documentos da empresa.

    Esse trecho é injetado no contexto da conversa, junto com a pergunta
    original.

    O modelo responde com base no texto fornecido, não em uma suposição —
    e pode até citar a fonte.
  explanation: >-
    Na Versão A, o modelo não tem como saber a política real da empresa —
    qualquer resposta que ele dê é, na melhor das hipóteses, uma
    generalização de políticas típicas de outras empresas, e é indistinguível
    de uma alucinação. Na Versão B, a resposta está ancorada (grounded) em uma
    fonte real e verificável, o que reduz drasticamente o risco de uma
    resposta incorreta soar confiante.
lab:
  scenario: >-
    Pense em uma pergunta que alguém do seu time já fez a uma IA sobre um
    processo, política ou documento interno específico da sua organização.
  instructions: >-
    Identifique: (1) qual documento ou fonte deveria ter sido consultado para
    responder com segurança, e (2) o que aconteceria se o modelo respondesse
    sem essa fonte, apenas "no chute". Registre sua análise no formulário de
    evidência.
  useTaskContextCanvas: false
reflectionPrompts:
  - Você já recebeu uma resposta de IA sobre algo interno da sua empresa que soava correta mas não era?
  - Em quais tipos de pergunta do seu trabalho o grounding seria essencial?
  - Existe alguma fonte confiável (documentação, wiki, base de conhecimento) que hoje não é usada como contexto e poderia ser?
completionMessage: >-
  Grounding reduz o risco de invenção, mas não elimina outras limitações do
  modelo. O próximo módulo trata diretamente das Limitações e da alucinação
  que ainda podem acontecer mesmo com boas práticas.
---

## Grounding

**Grounding** é o princípio geral de ancorar a resposta de um modelo em uma fonte de informação real e verificável, em vez de deixá-lo responder apenas com base no que aprendeu durante o treinamento. Fornecer um documento, um trecho de código ou um dado atualizado como contexto é uma forma de grounding.

## RAG (Retrieval-Augmented Generation)

**RAG** é a técnica mais comum de implementar grounding em escala. O fluxo básico é:

1. **Retrieve (buscar)**: dada a pergunta, buscar em uma base de documentos os trechos mais relevantes (normalmente usando busca semântica).
2. **Augment (aumentar)**: injetar esses trechos no contexto da conversa, junto com a pergunta original.
3. **Generate (gerar)**: pedir ao modelo que responda com base no que foi fornecido, não do zero.

## Quando RAG é necessário

RAG faz sentido quando a resposta depende de informação que:

- É específica da sua organização ou domínio (políticas internas, documentação de produto, base de código).
- Muda com frequência (o treinamento do modelo tem uma data de corte fixa).
- Precisa ser rastreável até uma fonte (para auditoria ou confiança).

## Quando RAG é desnecessário

Para tarefas que dependem de conhecimento geral estável (explicar um conceito amplamente documentado, revisar gramática, gerar um rascunho criativo), adicionar uma camada de busca é complexidade sem retorno — o modelo já tem contexto suficiente sem precisar de uma fonte externa.
