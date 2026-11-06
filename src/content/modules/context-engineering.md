---
id: context-engineering
slug: context-engineering
title: Context Engineering
description: >-
  Aprenda a estruturar as informações necessárias para que modelos e agentes
  consigam executar tarefas com mais qualidade, previsibilidade e contexto.
phase: foundations
order: 5
duration: 35 minutos
status: published
objectives:
  - Diferenciar prompt de contexto.
  - Identificar informações relevantes para uma tarefa.
  - Reconhecer contexto insuficiente ou excessivo.
  - Explicitar restrições.
  - Criar critérios de aceite.
  - Construir um Task Context Canvas.
introduction: >-
  Um dos erros mais comuns ao trabalhar com IA é tentar resolver problemas de
  qualidade escrevendo prompts cada vez maiores. Mas um prompt não é todo o
  ambiente de trabalho de um modelo. Quando pedimos a uma pessoa para executar
  uma tarefa complexa, normalmente fornecemos objetivo, contexto, documentos,
  código, histórico, regras, restrições, exemplos e critérios de aceite.
  Modelos e agentes também precisam disso. Por isso, uma pergunta mais útil do
  que "Como escrevo um prompt melhor?" é "O que a IA precisa saber para
  conseguir executar bem esta tarefa?". Essa mudança de perspectiva é a base
  de Context Engineering.
keyMessage: O prompt descreve o que eu quero. O contexto fornece aquilo que a IA precisa saber para executar bem.
demo:
  versionALabel: "Versão A — instrução isolada"
  versionAText: "Adicione validação de CPF nesta API."
  versionBLabel: "Versão B — com Task Context Canvas"
  versionBText: >-
    Objective: Adicionar validação de CPF no endpoint de cadastro.

    Context: Aplicação Java com Spring Boot. As validações seguem o padrão já
    utilizado por outros campos existentes.

    Artifacts: Implementação atual do endpoint, validadores existentes,
    tratamento global de erros e testes relacionados ao cadastro.

    Constraints: Não adicionar nova dependência; preservar contratos
    existentes; seguir os padrões atuais do projeto.

    Acceptance Criteria: CPF inválido não é aceito e o erro segue o padrão
    atual da API; CPF válido mantém o comportamento existente; testes
    existentes continuam passando; novos cenários possuem testes.
  explanation: >-
    Observe que a Versão B não é necessariamente um "prompt mais inteligente".
    Ela reduz a quantidade de decisões que o modelo precisaria adivinhar —
    qual endpoint, qual padrão seguir, o que não pode mudar e como saber que
    terminou.
lab:
  scenario: >-
    Você recebeu a seguinte demanda: "Precisamos impedir clientes
    inelegíveis de receber uma determinada oferta." Estão disponíveis um
    README (o serviço é responsável pela elegibilidade de ofertas), um
    documento de regras de negócio com os critérios existentes, um documento
    de arquitetura descrevendo integrações externas, o código atual de
    EligibilityService e seus testes, e um contrato de API que não pode
    quebrar para consumidores existentes.
  instructions: >-
    Prepare o contexto que você entregaria a um Coding Agent antes de pedir a
    implementação, preenchendo o Task Context Canvas abaixo. Depois de
    preencher, use o botão "Copiar template" e registre sua resposta no
    formulário de evidência.
  useTaskContextCanvas: true
reflectionPrompts:
  - Que informações você inicialmente não pensaria em fornecer?
  - Algum contexto disponível era desnecessário?
  - Quais decisões você conseguiu impedir que a IA tivesse que adivinhar?
  - Em qual atividade real do seu trabalho você poderia aplicar esse Canvas?
completionMessage: >-
  Você acabou de fazer algo mais importante do que escrever um prompt: você
  projetou o ambiente informacional necessário para executar uma tarefa. Esse
  mesmo princípio vai aparecer novamente quando falarmos sobre Coding Agents,
  MCP, Skills, Spec-Driven Development, agentes autônomos e Harness
  Engineering.
roleLenses:
  dev:
    - "Preencha um Task Context Canvas antes de delegar uma tarefa a um Coding Agent: objetivo, contexto, artefatos, restrições e critérios de aceite."
    - "Liste explicitamente o que não pode mudar (contratos, dependências, padrões) para que o agente não precise adivinhar."
  qa:
    - "Contribua com a seção Acceptance Criteria do Canvas: critérios verificáveis são o que permite saber se o trabalho terminou."
    - "Use o Canvas para revisar uma entrega: cada critério de aceite tem uma evidência correspondente?"
  po:
    - "Use o Canvas como checklist ao escrever demandas: se um campo fica vazio, alguém (pessoa ou IA) vai precisar adivinhar."
    - "Indique quais documentos de regras de negócio são a fonte confiável para cada demanda."
  tl:
    - "Padronize o Canvas como formato de delegação no time, para pessoas e para agentes."
    - "Garanta que os artefatos mais usados como contexto (README, ADRs, contratos de API) estejam atualizados e fáceis de encontrar."
---

## Prompt

O **Prompt** define principalmente *o que estamos pedindo*.

Exemplo: "Adicione validação de CPF nesta API."

## Context

O **Context** ajuda a responder *o que o sistema precisa saber para conseguir executar corretamente*. Pode incluir arquitetura, código existente, documentação, regras de negócio, decisões anteriores, exemplos, restrições e critérios de aceite.

Context Engineering é o trabalho deliberado de selecionar, organizar e disponibilizar essas informações. Mais contexto não significa necessariamente melhor contexto — o objetivo é fornecer **contexto relevante, suficiente e confiável**.

## O Task Context Canvas

Um mental model simples para estruturar contexto antes de delegar uma tarefa a um modelo ou agente:

- **Objective** — o que precisa ser alcançado?
- **Context** — o que a IA precisa saber sobre o problema e o ambiente?
- **Artifacts** — quais fontes devem ser consultadas?
- **Constraints** — o que precisa ou não pode acontecer?
- **Acceptance Criteria** — que evidências demonstram que o trabalho está correto?

> Prompt Engineering pergunta: "Como devo formular minha solicitação?"
> Context Engineering adiciona: "O que precisa estar disponível no ambiente para que a solicitação possa ser executada corretamente?"

As duas coisas são úteis. Mas sistemas agenticos tornam Context Engineering especialmente importante porque os modelos passam a tomar mais decisões e executar mais ações de forma autônoma.
