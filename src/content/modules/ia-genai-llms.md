---
id: ia-genai-llms
slug: ia-genai-llms
title: IA, GenAI e LLMs
description: >-
  Entenda a diferença entre Inteligência Artificial, Machine Learning, IA
  Generativa e Large Language Models antes de aprender a usá-los bem.
phase: foundations
order: 1
duration: 20 minutos
status: published
objectives:
  - Diferenciar Inteligência Artificial, Machine Learning, IA Generativa e LLM.
  - Situar onde os assistentes e agentes de IA que você usa hoje se encaixam nessa hierarquia.
  - Reconhecer tarefas para as quais um LLM é a ferramenta certa e tarefas para as quais não é.
introduction: >-
  "IA" virou um termo guarda-chuva usado para quase tudo: um filtro de spam,
  um sistema de recomendação, um chatbot, um gerador de imagens. Isso cria um
  problema prático — quando todo mundo chama coisas muito diferentes de "IA",
  fica difícil ter uma conversa precisa sobre o que uma ferramenta consegue ou
  não consegue fazer. Antes de aprender a usar bem um LLM, vale a pena
  entender onde ele se encaixa dentro do campo maior de Inteligência
  Artificial.
keyMessage: IA é o campo. Machine Learning é uma abordagem dentro dele. IA Generativa é uma capacidade. LLM é uma tecnologia específica que viabiliza essa capacidade para texto.
demo:
  versionALabel: "Versão A — tratando tudo como a mesma coisa"
  versionAText: "\"É tudo IA, então deve funcionar do mesmo jeito e ter as mesmas limitações.\""
  versionBLabel: "Versão B — situando a ferramenta na hierarquia"
  versionBText: >-
    Um sistema de recomendação de produtos é Machine Learning clássico: aprende
    padrões a partir de dados históricos e prevê uma preferência.

    Um LLM como o que você usa no dia a dia é IA Generativa: aprendeu padrões
    de linguagem em um volume enorme de texto e gera novo conteúdo a partir
    disso.

    Um motor de busca por regras fixas nem é Machine Learning — é IA
    "clássica" baseada em lógica e busca.

    Saber qual categoria você está usando muda o que é razoável esperar dela.
  explanation: >-
    A Versão A trata "IA" como uma caixa-preta única, o que leva a expectativas
    erradas (esperar que um LLM tenha certeza estatística de um classificador,
    ou que um classificador "converse"). A Versão B usa a hierarquia para
    prever comportamento: um LLM gera texto plausível, não busca uma resposta
    em uma base de fatos verificados.
lab:
  scenario: >-
    Pense em três ferramentas de "IA" que você usa ou já viu serem usadas no
    seu trabalho ou no dia a dia — por exemplo: um corretor ortográfico, uma
    recomendação de conteúdo, um assistente de código, um gerador de imagens,
    um chatbot de atendimento.
  instructions: >-
    Para cada uma das três ferramentas, escreva uma frase classificando-a
    (Machine Learning clássico, IA Generativa/LLM, ou outra categoria de IA) e
    uma frase explicando por que essa classificação muda o que você espera
    dela. Registre sua resposta no formulário de evidência.
  useTaskContextCanvas: false
reflectionPrompts:
  - Antes deste módulo, você diferenciava esses termos na prática?
  - Alguma ferramenta que você usa mudou de categoria depois que você pensou sobre ela com mais cuidado?
  - Em qual situação recente você (ou alguém da sua equipe) teve uma expectativa errada por não diferenciar esses conceitos?
completionMessage: >-
  Agora que você sabe onde um LLM se encaixa, o próximo passo é entender como
  ele efetivamente funciona por dentro — o que explica por que ele às vezes
  erra de formas muito específicas.
roleLenses:
  dev:
    - "Antes de propor um LLM para uma feature, pergunte se uma regra determinística ou um modelo de ML clássico resolveria com mais previsibilidade."
    - "Nomeie com precisão o que você está usando (LLM, modelo de classificação, motor de regras) em PRs e discussões técnicas."
  qa:
    - "Ao testar uma funcionalidade 'com IA', descubra primeiro qual tecnologia está por trás: isso define se o comportamento esperado é determinístico ou probabilístico."
    - "Inclua cenários em que um LLM claramente não é a ferramenta certa (cálculos exatos, regras fixas) para checar se o produto não depende dele ali."
  po:
    - "Descreva o problema do usuário antes de pedir 'uma solução com IA'; deixe a escolha da tecnologia para a conversa com o time."
    - "Use a hierarquia IA → ML → GenAI → LLM para alinhar expectativas com stakeholders sobre o que a funcionalidade consegue ou não fazer."
  tl:
    - "Crie um vocabulário comum no time: diferenciar IA, ML, GenAI e LLM evita decisões de arquitetura baseadas em termos vagos."
    - "Em revisões de design, pergunte explicitamente por que um LLM é a ferramenta certa para aquela tarefa."
---

## Inteligência Artificial

**Inteligência Artificial (IA)** é o campo mais amplo: sistemas que executam tarefas que normalmente associamos à cognição humana — reconhecer padrões, tomar decisões, entender linguagem, planejar. Isso inclui desde sistemas de regras escritas manualmente até os modelos mais recentes.

## Machine Learning

**Machine Learning (ML)** é uma abordagem dentro da IA: em vez de escrever regras explícitas, o sistema aprende padrões a partir de dados. Um filtro de spam clássico é ML — ele aprendeu, a partir de exemplos de e-mails marcados como spam ou não, quais características são mais prováveis em cada categoria.

## IA Generativa

**IA Generativa (GenAI)** é uma capacidade específica dentro de ML: em vez de apenas classificar ou prever um número, o sistema **gera** conteúdo novo — texto, imagem, áudio, código — a partir de um padrão aprendido.

## Large Language Models

**Large Language Models (LLMs)** são a tecnologia que viabiliza IA Generativa para texto (e, por extensão, código). Um LLM é treinado em um volume enorme de texto para aprender a prever a continuação mais provável de uma sequência. É essa mecânica — abordada no próximo módulo — que explica tanto a fluência quanto as limitações desses modelos.

## Por que essa hierarquia importa

Cada nível carrega expectativas diferentes:

- Um sistema de ML clássico costuma ter uma métrica de acurácia mensurável contra um conjunto de teste.
- Um LLM não "sabe" fatos da mesma forma que um banco de dados — ele gera a continuação estatisticamente mais provável, o que é diferente de "buscar a resposta certa".

Confundir essas categorias é uma das causas mais comuns de frustração e de confiança mal calibrada ao trabalhar com IA no dia a dia.
