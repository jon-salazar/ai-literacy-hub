---
id: como-llms-funcionam
slug: como-llms-funcionam
title: Como LLMs funcionam
description: >-
  Entenda o mecanismo básico de previsão de próximo token e por que isso torna
  as respostas de um LLM inerentemente probabilísticas.
phase: foundations
order: 2
duration: 20 minutos
status: published
objectives:
  - Explicar, em termos simples, o que um LLM faz ao gerar uma resposta.
  - Reconhecer a natureza probabilística das respostas de um LLM.
  - Explicar por que o mesmo prompt pode gerar respostas diferentes em execuções distintas.
  - Ajustar suas expectativas de confiabilidade com base nesse mecanismo.
introduction: >-
  É comum tratar um LLM como se fosse um banco de dados que "sabe" respostas
  certas e as recupera quando perguntado. Esse modelo mental está errado, e é
  a raiz da maior parte das frustrações e da confiança mal calibrada em IA. Um
  LLM não recupera uma resposta armazenada — ele gera, palavra por palavra, a
  continuação estatisticamente mais provável para o texto que recebeu.
keyMessage: Um LLM não busca a resposta certa. Ele prevê, um token de cada vez, qual é a continuação mais provável — e isso tem consequências práticas importantes.
demo:
  versionALabel: "Versão A — modelo mental de banco de dados"
  versionAText: "\"Perguntei duas vezes a mesma coisa e recebi respostas diferentes. Isso deve ser um bug.\""
  versionBLabel: "Versão B — modelo mental de previsão probabilística"
  versionBText: >-
    O modelo não guarda uma resposta única para cada pergunta. A cada token
    gerado, ele calcula uma distribuição de probabilidade sobre os próximos
    tokens possíveis e amostra um deles.

    Isso significa que pequenas variações são esperadas — não é um bug, é o
    mecanismo funcionando como projetado.

    Consequência prática: para tarefas onde precisão exata importa, é preciso
    verificar a resposta, não apenas confiar na primeira geração.
  explanation: >-
    Entender a natureza probabilística muda o comportamento: em vez de tratar
    uma resposta variável como falha do sistema, você aprende a reconhecer em
    quais tarefas essa variabilidade é aceitável (brainstorm, rascunho) e em
    quais não é (cálculo exato, fato verificável), ajustando o nível de
    verificação necessário.
lab:
  scenario: >-
    Escolha uma pergunta objetiva que você possa fazer a um assistente de IA
    disponível para você (por exemplo, um resumo de um texto curto, ou uma
    sugestão de solução para um problema simples).
  instructions: >-
    Faça a mesma pergunta, exatamente com as mesmas palavras, em duas
    conversas novas e separadas. Compare as duas respostas: o que mudou e o
    que se manteve estável? Registre sua observação no formulário de
    evidência.
  useTaskContextCanvas: false
reflectionPrompts:
  - O que mudou entre as duas respostas que você recebeu no lab? O que se manteve igual?
  - Isso muda como você validaria uma resposta crítica (por exemplo, um cálculo ou uma afirmação factual)?
  - Em que situação do seu trabalho a variabilidade das respostas é aceitável, e em qual não é?
completionMessage: >-
  Saber que um LLM prevê token a token também explica por que ele tem uma
  "memória" limitada dentro de uma conversa. É isso que veremos a seguir, com
  Tokens e Context Window.
roleLenses:
  dev:
    - "Não trate a saída de um LLM como determinística: valide formato e conteúdo antes de usá-la no código."
    - "Ao gerar código com IA, rode e teste o resultado; texto plausível não é garantia de código correto."
  qa:
    - "Execute o mesmo cenário mais de uma vez: respostas diferentes para a mesma entrada são esperadas e pedem critérios de aceite que tolerem variação."
    - "Prefira verificar propriedades da resposta (formato, informações obrigatórias, ausência de dados proibidos) em vez de comparar texto exato."
  po:
    - "Escreva critérios de aceite que considerem variação de resposta, por exemplo 'contém X e não contém Y' em vez de 'responde exatamente Z'."
    - "Comunique a stakeholders que fluência não é sinônimo de correção: uma resposta bem escrita ainda pode estar errada."
  tl:
    - "Projete fluxos que assumem respostas probabilísticas: validação, fallback e revisão onde o erro custa caro."
    - "Calibre a confiança do time: o modelo prevê continuações prováveis, não consulta uma fonte de verdade."
---

## Previsão de próximo token

Por baixo do capô, um LLM foi treinado para uma tarefa aparentemente simples: dado um trecho de texto, prever qual é o próximo **token** (uma unidade de texto — não necessariamente uma palavra inteira; isso será aprofundado no próximo módulo) mais provável. Ele repete esse processo token a token até completar a resposta, sempre usando tudo o que já foi gerado como parte do novo contexto de previsão.

## De onde vem esse "conhecimento"

Durante o treinamento, o modelo processa um volume enorme de texto e ajusta seus parâmetros internos para capturar padrões estatísticos de linguagem: gramática, fatos frequentemente mencionados, estilos de escrita, estruturas de raciocínio comuns. O resultado não é uma tabela de fatos armazenados — é uma capacidade aprendida de continuar texto de forma plausível.

## Por que isso é probabilístico

Em cada passo, o modelo não escolhe deterministicamente "a" próxima palavra — ele calcula uma distribuição de probabilidades sobre várias opções possíveis e amostra uma delas (esse comportamento pode ser ajustado por parâmetros como a "temperatura", que controla o quanto essa amostragem é mais conservadora ou mais variada). É por isso que a mesma pergunta, feita duas vezes, pode gerar respostas diferentes — às vezes sutilmente, às vezes de forma mais notável.

## Consequência prática: confiança calibrada

Isso não significa que o modelo é "não confiável" de forma genérica. Significa que:

- Para tarefas onde plausibilidade é suficiente (rascunhos, brainstorm, reformulação), a variabilidade raramente é um problema.
- Para tarefas onde exatidão importa (cálculos, fatos verificáveis, decisões críticas), a resposta deve ser tratada como uma hipótese a ser verificada, não como uma consulta a uma fonte de verdade.

Esse ajuste de expectativa — calibrar o nível de verificação necessário à natureza da tarefa — é uma das habilidades centrais do uso consciente de IA.
