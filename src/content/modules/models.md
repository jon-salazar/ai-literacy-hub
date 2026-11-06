---
id: models
slug: models
title: Models
description: >-
  Entenda os principais eixos de diferença entre modelos — custo, latência e
  capacidade — e como escolher o modelo certo para cada tarefa.
phase: foundations
order: 6
duration: 20 minutos
status: published
objectives:
  - Explicar por que existem múltiplos modelos em vez de "o melhor modelo único".
  - Relacionar capacidade, custo e latência como um trade-off, não como uma escala única.
  - Escolher um modelo adequado a uma tarefa específica, em vez de sempre usar o mais avançado disponível.
introduction: >-
  Uma dúvida comum de quem começa a usar IA é: "qual é o melhor modelo?". A
  pergunta parte de uma premissa equivocada — não existe um único "melhor"
  modelo para todas as situações. Existe um modelo mais adequado para cada
  combinação de tarefa, orçamento e tolerância a latência. Usar sempre o
  modelo mais caro e mais lento "por garantia" é tão problemático quanto usar
  sempre o mais barato.
keyMessage: Modelos diferem em capacidade, custo e latência ao mesmo tempo — a pergunta certa não é "qual é o melhor modelo", mas "qual modelo é adequado para esta tarefa".
demo:
  versionALabel: "Versão A — sempre o modelo mais avançado"
  versionAText: "\"Vou usar o modelo mais caro e mais capaz disponível para tudo, do rascunho de e-mail até a tarefa mais crítica, assim garanto a melhor resposta sempre.\""
  versionBLabel: "Versão B — modelo proporcional à tarefa"
  versionBText: >-
    Para reescrever um e-mail interno ou resumir um texto curto, um modelo
    menor e mais barato normalmente resolve bem, com resposta quase
    instantânea.

    Para uma tarefa de raciocínio complexo em várias etapas — por exemplo,
    depurar uma falha sutil em um sistema distribuído — um modelo mais capaz
    compensa o custo e a latência maiores.

    Para uma tarefa repetitiva em alto volume (classificar centenas de
    tickets por hora), o custo por chamada se torna o fator decisivo, mesmo
    que isso signifique aceitar uma capacidade um pouco menor.
  explanation: >-
    A Versão A ignora que capacidade extra tem custo real em dinheiro e em
    tempo de resposta, o que se torna insustentável em escala ou em produtos
    com muitos usuários. A Versão B trata a escolha de modelo como uma decisão
    de engenharia, não como um reflexo automático — o mesmo raciocínio por
    trás do conceito de Model Routing, que reaparece na jornada de Agentic AI.
lab:
  scenario: >-
    Considere três tarefas do seu dia a dia: (1) resumir um e-mail longo, (2)
    revisar a lógica de uma função complexa antes de um deploy crítico, e (3)
    classificar automaticamente centenas de mensagens de suporte por dia.
  instructions: >-
    Para cada tarefa, decida se você priorizaria velocidade, custo ou
    capacidade máxima, e justifique em uma frase. Registre suas três decisões
    no formulário de evidência.
  useTaskContextCanvas: false
reflectionPrompts:
  - Você já usou um modelo mais "pesado" do que a tarefa realmente exigia? O que isso custou (tempo, dinheiro, complexidade)?
  - Já teve o oposto — um modelo simples demais para uma tarefa complexa? O que deu errado?
  - Como você decidiria, na prática, qual modelo usar em uma nova tarefa recorrente do seu time?
completionMessage: >-
  Escolher o modelo certo é só parte da equação — o próximo módulo mostra como
  um modelo pode ir além de gerar texto e efetivamente executar ações através
  de Tools.
roleLenses:
  dev:
    - "Comece com um modelo mais simples e rápido em tarefas mecânicas e só suba de capacidade quando o resultado não for suficiente."
    - "Registre qual modelo foi usado em cada fluxo para conseguir comparar qualidade, custo e latência depois."
  qa:
    - "Trate o modelo usado como variável de teste: trocar de modelo pode mudar o comportamento mesmo sem mudança de código."
    - "Mantenha um pequeno conjunto de cenários de referência para comparar modelos antes de uma troca."
  po:
    - "Discuta o trade-off entre capacidade, custo e latência com o time em vez de pedir 'o melhor modelo'."
    - "Defina qual latência e qual custo são aceitáveis para a funcionalidade; isso orienta a escolha do modelo."
  tl:
    - "Evite acoplar a arquitetura a um único modelo; facilite a troca por configuração."
    - "Estabeleça critérios do time para escolher modelos por tipo de tarefa, em vez de decisões caso a caso."
---

## Não existe "o melhor modelo"

Modelos de IA diferem em pelo menos três eixos que competem entre si:

- **Capacidade**: quão bem o modelo lida com raciocínio complexo, tarefas longas ou nichadas.
- **Custo**: preço por token processado, que pode variar em ordens de magnitude entre modelos.
- **Latência**: tempo até a resposta começar e terminar.

Um modelo otimizado para o topo de um desses eixos normalmente sacrifica os outros dois.

## Famílias de modelo

A maioria dos provedores oferece uma família de modelos — por exemplo, uma versão "rápida e barata", uma versão "equilibrada" e uma versão "de ponta". Essa segmentação existe justamente porque a maioria das tarefas do dia a dia não precisa do modelo mais avançado disponível.

## Como decidir

Uma heurística prática:

1. **A tarefa é simples e de alto volume?** Priorize custo e latência.
2. **A tarefa envolve raciocínio complexo ou consequências caras se sair errado?** Priorize capacidade.
3. **Você não sabe ainda?** Comece com um modelo intermediário e ajuste com base em evidência real de erro, não por precaução.

## Uma prévia do que vem depois

Em sistemas mais avançados, essa decisão pode ser automatizada — diferentes partes de um workflow usam modelos diferentes de acordo com a complexidade de cada etapa. Esse padrão se chama **Model Routing** e será retomado na Fase 2, quando falarmos de Agentic AI.
