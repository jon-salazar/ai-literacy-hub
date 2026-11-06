---
id: tokens-context-window
slug: tokens-context-window
title: Tokens e Context Window
description: >-
  Entenda o que é um token, como a tokenização funciona na prática e por que a
  janela de contexto de um modelo é um recurso finito que precisa ser gerido.
phase: foundations
order: 3
duration: 20 minutos
status: published
objectives:
  - Explicar o que é um token e por que ele não corresponde a uma palavra.
  - Explicar o que é a Context Window e o que acontece quando ela é excedida.
  - Relacionar quantidade de tokens a custo e latência.
  - Reconhecer quando um prompt está "poluído" com informação irrelevante.
introduction: >-
  Depois de entender que um LLM prevê "o próximo token", vale a pena entender
  o que exatamente é um token — e por que a quantidade de tokens que cabe em
  uma conversa é limitada. Esses dois conceitos, tokens e Context Window,
  explicam por que colar um repositório inteiro em um prompt costuma piorar a
  qualidade da resposta em vez de melhorá-la.
keyMessage: Um token não é uma palavra, e a janela de contexto não é infinita — tratar os dois como recursos finitos muda como você prepara o que entrega a um modelo.
demo:
  versionALabel: "Versão A — sem noção de limite"
  versionAText: "\"Vou colar o arquivo inteiro de 5000 linhas, o repositório completo e todo o histórico da conversa, assim o modelo tem tudo que precisa.\""
  versionBLabel: "Versão B — selecionando o que cabe e importa"
  versionBText: >-
    Cada modelo tem uma Context Window finita, medida em tokens — normalmente
    algo entre dezenas de milhares e alguns milhões de tokens, dependendo do
    modelo.

    Um token costuma representar um pedaço de palavra, não a palavra inteira
    — um texto de 1000 palavras em português pode facilmente virar 1300 a 1500
    tokens.

    Selecionar apenas os arquivos e trechos relevantes para a tarefa atual,
    em vez de colar tudo, reduz custo, reduz latência e frequentemente melhora
    a qualidade da resposta — informação irrelevante compete por "atenção" com
    a informação relevante.
  explanation: >-
    A Versão A parte da premissa de que mais informação é sempre melhor. Na
    prática, colar contexto em excesso pode estourar a janela (a conversa
    trunca ou falha), aumentar custo e latência, e piorar a qualidade porque o
    modelo precisa "filtrar" ruído para achar o que importa. A Versão B trata
    a seleção de contexto como uma decisão deliberada — o mesmo princípio que
    será aprofundado no módulo de Context Engineering.
lab:
  scenario: >-
    Pegue um arquivo de código ou um documento real do seu trabalho com pelo
    menos algumas centenas de linhas.
  instructions: >-
    Sem usar uma ferramenta de contagem exata, estime quantos tokens esse
    arquivo provavelmente tem (uma regra prática comum: cerca de 4 caracteres
    por token em inglês, um pouco menos eficiente em português). Depois,
    identifique quais 20% do arquivo seriam realmente necessários se você
    fosse pedir a um LLM para alterar apenas uma função específica dele.
    Registre sua estimativa e sua seleção no formulário de evidência.
  useTaskContextCanvas: false
reflectionPrompts:
  - Sua estimativa de tokens ficou próxima da real, se você conferiu com uma ferramenta?
  - Você já teve uma resposta de IA piorar depois de colar contexto demais? O que aconteceu?
  - Como essa noção de "janela finita" muda a forma como você prepararia um prompt daqui para frente?
completionMessage: >-
  Entender tokens e Context Window como recursos finitos é o que torna a
  próxima distinção — entre Prompt e Context — prática e não apenas
  conceitual.
---

## O que é um token

Um **token** é a unidade básica que um LLM processa. Não é o mesmo que uma palavra: em inglês, um token costuma corresponder a cerca de 4 caracteres, e uma palavra pode virar um ou mais tokens dependendo de sua frequência no vocabulário de treinamento. Palavras raras, nomes próprios, código-fonte e português (por ter mais acentuação e ser menos representado nos dados de treinamento de muitos modelos) tendem a "custar" mais tokens por palavra do que um texto simples em inglês.

## O que é a Context Window

A **Context Window** (janela de contexto) é a quantidade máxima de tokens que um modelo consegue considerar de uma vez — somando o prompt, o histórico da conversa, qualquer documento anexado e a própria resposta gerada. Ultrapassar esse limite normalmente significa que informação mais antiga é descartada, truncada, ou a requisição simplesmente falha, dependendo da ferramenta.

## Consequências práticas

- **Custo**: a maioria dos provedores cobra por token processado (entrada e saída). Contexto desnecessário custa dinheiro.
- **Latência**: mais tokens de entrada geralmente significam mais tempo até a primeira resposta.
- **Qualidade**: contexto irrelevante não é neutro — ele compete por atenção do modelo com a informação que de fato importa, podendo diluir a qualidade da resposta.

## A implicação para o dia a dia

Tratar tokens e Context Window como recursos finitos leva a uma pergunta prática, que vai se tornar central no módulo de Context Engineering: **o que realmente precisa estar no contexto para esta tarefa específica?** Colar tudo "por segurança" raramente é a estratégia certa.
