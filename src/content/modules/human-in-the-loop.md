---
id: human-in-the-loop
slug: human-in-the-loop
title: Human-in-the-loop
description: >-
  Aprenda a decidir quando confiar, quando revisar e quando impedir ações
  automáticas de um sistema de IA — e feche a Fase 1 com essa base de
  responsabilidade humana.
phase: foundations
order: 11
duration: 20 minutos
status: published
objectives:
  - Explicar o que é um checkpoint humano e por que ele existe.
  - Decidir o nível de revisão adequado para uma ação com base no seu risco e reversibilidade.
  - Reconhecer que a responsabilidade final por uma ação automatizada continua sendo humana.
introduction: >-
  Ao longo desta fase você viu que um LLM pode alucinar, ser confiante mesmo
  quando errado, e — quando tem acesso a tools — executar ações reais. Isso
  levanta uma pergunta prática e recorrente: quando é seguro deixar a IA agir
  sozinha, e quando uma pessoa precisa estar no meio do caminho? Essa é a
  pergunta central de Human-in-the-loop, e ela fecha a base conceitual desta
  fase antes de avançarmos para Agentic AI.
keyMessage: O objetivo não é maximizar autonomia. É colocar checkpoints humanos proporcionais ao risco e à reversibilidade de cada ação.
demo:
  versionALabel: "Versão A — autonomia total por padrão"
  versionAText: "\"O agente identificou tickets de suporte duplicados e já os fechou automaticamente, sem revisão, para 'ganhar eficiência'.\""
  versionBLabel: "Versão B — checkpoint proporcional ao risco"
  versionBText: >-
    Para ações reversíveis e de baixo impacto (sugerir uma resposta, marcar
    um rascunho), o agente pode agir de forma mais autônoma.

    Para ações irreversíveis ou de alto impacto (fechar um ticket
    definitivamente, enviar uma comunicação externa, apagar um registro), o
    agente propõe a ação e aguarda aprovação humana antes de executar.

    O nível de autonomia não é fixo — ele é calibrado à reversibilidade e ao
    impacto de cada tipo de ação.
  explanation: >-
    A Versão A trata autonomia como um objetivo em si — "quanto mais
    automático, melhor". A Versão B trata autonomia como um meio, calibrado
    ao risco real: ações reversíveis e de baixo impacto podem acontecer sem
    supervisão constante; ações irreversíveis ou de alto impacto exigem um
    humano no controle. Esse é o mesmo princípio que orienta o design de
    Guardrails em sistemas agenticos mais avançados, na Fase 2.
lab:
  scenario: >-
    Imagine que você está projetando um agente de IA para triagem de tickets
    de suporte, capaz de: (1) sugerir uma categoria para o ticket, (2)
    responder automaticamente perguntas frequentes já documentadas, (3)
    reembolsar um cliente, e (4) apagar um ticket marcado como duplicado.
  instructions: >-
    Para cada uma das quatro ações, decida se o agente deveria executá-la (a)
    de forma totalmente autônoma, (b) propondo e aguardando aprovação humana,
    ou (c) nunca de forma automatizada — e justifique em uma frase cada
    decisão. Registre sua análise no formulário de evidência.
  useTaskContextCanvas: false
reflectionPrompts:
  - Suas quatro decisões seguiram algum critério consistente (reversibilidade, impacto financeiro, impacto no cliente)?
  - Você mudaria alguma dessas decisões se soubesse que o modelo por trás do agente alucina ocasionalmente?
  - Em qual processo real do seu trabalho você recomendaria adicionar (ou remover) um checkpoint humano hoje?
completionMessage: >-
  Você concluiu a Fase 1 — Fundamentos & Uso Consciente. Os princípios vistos
  aqui (natureza probabilística, gestão de contexto, grounding, limitações e
  responsabilidade humana) são a base sobre a qual a Fase 2, Agentic AI &
  Orquestração, vai construir — quando esses mesmos modelos passam a executar
  trabalho de forma mais autônoma através de agentes e workflows.
---

## O espectro de autonomia

Autonomia não é uma chave binária (ligado/desligado) — é um espectro. Em uma ponta está um assistente que só responde quando perguntado; na outra, um agente de longa duração que executa múltiplas ações encadeadas sem intervenção. A maior parte dos sistemas úteis fica em algum ponto intermediário desse espectro.

## Quando confiar

Ações de baixo impacto e alta reversibilidade — sugerir um rascunho, categorizar um item, gerar uma primeira versão de algo que será revisado de qualquer forma — toleram mais autonomia, porque o custo de um erro é baixo e fácil de corrigir.

## Quando revisar

Ações de impacto moderado ou de reversibilidade incerta — enviar uma comunicação, alterar um registro importante, tomar uma decisão que afeta um cliente — pedem um checkpoint: o sistema propõe a ação, mas uma pessoa aprova antes da execução.

## Quando impedir ações automáticas

Ações irreversíveis e de alto impacto — apagar dados permanentemente, mover dinheiro, desligar um sistema em produção — geralmente não deveriam ser automatizadas de ponta a ponta, independentemente de quão confiável o sistema pareça ser em testes.

## Responsabilidade humana

Por fim, um princípio que atravessa toda a Fase 1: automatizar uma ação com IA não transfere a responsabilidade por ela. Se um agente executa algo errado, a responsabilidade de ter definido mal os limites de autonomia — ou de não ter colocado um checkpoint onde era necessário — continua sendo de quem projetou ou operou aquele sistema. Esse princípio será retomado na Fase 2 com o conceito de Guardrails, e continua central em qualquer fase mais avançada da jornada.
