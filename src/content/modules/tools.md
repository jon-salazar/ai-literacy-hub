---
id: tools
slug: tools
title: Tools
description: >-
  Entenda como um modelo deixa de apenas gerar texto e passa a executar ações
  reais através de Tools e Function Calling.
phase: foundations
order: 7
duration: 20 minutos
status: published
objectives:
  - Explicar o que é uma tool e por que ela existe.
  - Diferenciar "o modelo respondeu com base no que aprendeu" de "o modelo usou uma ferramenta para obter a resposta".
  - Identificar uma tarefa repetitiva do seu trabalho que poderia virar uma tool.
introduction: >-
  Um LLM sozinho só sabe gerar texto com base em padrões aprendidos durante o
  treinamento. Isso significa que ele não sabe, por padrão, que horas são
  agora, não consegue consultar um sistema interno da sua empresa, e não
  consegue fazer uma conta grande com garantia de exatidão. Tools resolvem
  exatamente essa limitação: dão ao modelo uma forma de pedir que uma ação
  real seja executada fora dele, e de receber o resultado de volta.
keyMessage: Uma tool transforma o modelo de "só gera texto plausível" para "pode pedir que uma ação real aconteça e usar o resultado real dessa ação".
demo:
  versionALabel: "Versão A — modelo respondendo de memória"
  versionAText: "\"Quanto é 47382 vezes 9153?\" — o modelo gera um número que parece plausível, mas pode estar sutilmente errado."
  versionBLabel: "Versão B — modelo usando uma tool"
  versionBText: >-
    O modelo reconhece que a pergunta é uma operação matemática exata.

    Em vez de gerar o número "de memória", ele chama uma tool de calculadora,
    passando a operação como parâmetro.

    A tool executa o cálculo de verdade e devolve o resultado exato ao
    modelo, que o usa na resposta final.
  explanation: >-
    A diferença não é sutil: um cálculo exato feito "por previsão de texto" é
    inerentemente arriscado, porque o modelo está prevendo dígitos plausíveis,
    não computando. Uma tool devolve um resultado real e verificável. O mesmo
    princípio se aplica a consultar uma API interna, ler um arquivo atual, ou
    enviar uma mensagem — qualquer coisa que exija uma fonte de verdade
    externa ao modelo.
lab:
  scenario: >-
    Pense em uma tarefa repetitiva que você ou seu time fazem manualmente hoje
    e que envolve consultar algum sistema ou fazer um cálculo (por exemplo,
    verificar o status de um pedido, calcular uma métrica a partir de dados
    brutos, ou consultar disponibilidade de um recurso).
  instructions: >-
    Descreva essa tarefa como se fosse a definição de uma tool: qual seria o
    nome da tool, quais parâmetros de entrada ela precisaria, e o que ela
    devolveria como resultado. Registre sua definição no formulário de
    evidência.
  useTaskContextCanvas: false
reflectionPrompts:
  - Você conseguiu pensar em uma tarefa real que se encaixa bem como tool?
  - Que riscos você imagina que uma tool mal projetada poderia trazer (por exemplo, uma tool que apaga dados)?
  - Como você decidiria quando um modelo deveria pedir confirmação antes de executar uma tool com efeito real (enviar um e-mail, alterar um registro)?
completionMessage: >-
  Tools são uma das formas de dar ao modelo acesso a informação confiável. A
  próxima é Grounding e RAG — uma forma de trazer conhecimento específico e
  atualizado para dentro da resposta do modelo.
---

## O que é uma tool

Uma **tool** (ferramenta) é uma função externa que o modelo pode "pedir para chamar" durante a geração de uma resposta — uma consulta a uma API, uma busca em um banco de dados, uma calculadora, um envio de mensagem. O modelo não executa a tool diretamente; ele descreve, em um formato estruturado, qual tool quer usar e com quais parâmetros. Um sistema ao redor do modelo (o harness, ou a aplicação que o hospeda) é quem efetivamente executa essa chamada e devolve o resultado.

## Function Calling

O mecanismo técnico por trás disso costuma ser chamado de **Function Calling**: o modelo recebe, junto com o prompt, uma lista de funções disponíveis (nome, descrição, parâmetros esperados) e decide, com base no que está sendo pedido, se e qual delas deveria chamar.

## Por que isso importa

Sem tools, um modelo só pode responder com base em padrões aprendidos durante o treinamento — que têm uma data de corte e não incluem dados privados ou específicos da sua organização. Com tools, o modelo passa a poder:

- Consultar informação atualizada e específica (um preço, um status, um registro).
- Executar cálculos exatos em vez de "prever" um número.
- Agir no mundo real (enviar uma mensagem, criar um registro, disparar um processo).

## O risco que isso introduz

Dar a um modelo a capacidade de executar ações reais também introduz risco — uma tool mal desenhada, ou usada sem supervisão adequada, pode causar dano real (por exemplo, apagar dados ou enviar uma comunicação indevida). Esse tema será aprofundado na Fase 2, com os conceitos de Guardrails e Human-in-the-loop, e retomado no módulo de Segurança desta fase.
