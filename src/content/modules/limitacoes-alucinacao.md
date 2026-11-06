---
id: limitacoes-alucinacao
slug: limitacoes-alucinacao
title: Limitações e alucinação
description: >-
  Reconheça os principais modos de falha de um LLM — alucinação, confiança
  excessiva, informação desatualizada e viés — e como mitigá-los.
phase: foundations
order: 9
duration: 20 minutos
status: published
objectives:
  - Definir alucinação e explicar por que ela acontece.
  - Reconhecer os sinais de uma resposta potencialmente alucinada.
  - Listar estratégias práticas de mitigação (verificação, grounding, pedir fontes).
  - Reconhecer viés e desatualização como limitações distintas de alucinação.
introduction: >-
  Depois de entender que um LLM prevê a continuação estatisticamente mais
  provável de um texto (visto no módulo Como LLMs funcionam), fica mais fácil
  entender por que ele às vezes "inventa" informação com total confiança. Essa
  seção reúne os principais modos de falha que você deve saber reconhecer
  antes de confiar cegamente em uma resposta.
keyMessage: Um LLM pode errar de forma confiante e fluente — e isso é diferente de errar de forma óbvia. Saber reconhecer os sinais é uma habilidade que se treina.
demo:
  versionALabel: "Versão A — confiança pela fluência"
  versionAText: "\"A resposta veio bem escrita, com detalhes específicos e tom confiante, então deve estar certa.\""
  versionBLabel: "Versão B — verificação proporcional ao risco"
  versionBText: >-
    Fluência e confiança no texto gerado não são sinal de exatidão factual —
    um modelo alucina com o mesmo tom seguro com que acerta.

    Para afirmações verificáveis e importantes (números, nomes, citações,
    decisões críticas), a prática é pedir a fonte ou verificar
    independentemente antes de usar.

    Para tarefas onde o custo de um erro é baixo (rascunho, brainstorm), essa
    verificação pode ser mais leve.
  explanation: >-
    A Versão A usa um sinal errado (fluência do texto) como proxy de
    veracidade. A Versão B calibra o esforço de verificação ao risco real da
    tarefa — o mesmo princípio de "verificação proporcional" que aparece em
    Human-in-the-loop, o último módulo desta fase.
lab:
  scenario: >-
    Peça a um assistente de IA disponível para você uma informação bem
    específica e verificável — por exemplo, uma citação exata de uma norma,
    uma estatística com fonte, ou um detalhe técnico obscuro sobre uma
    tecnologia que você conhece bem.
  instructions: >-
    Verifique a resposta de forma independente (uma busca, uma fonte oficial,
    seu próprio conhecimento). Registre no formulário de evidência se a
    resposta estava correta, parcialmente correta ou incorreta, e o que a
    tornava (ou não) convincente antes da verificação.
  useTaskContextCanvas: false
reflectionPrompts:
  - A resposta que você verificou estava correta? Você teria percebido o erro sem verificar?
  - Que sinais no texto (se houver) indicavam risco de alucinação antes mesmo de verificar?
  - Que tipo de tarefa no seu trabalho exige o maior nível de verificação, e qual exige o menor?
completionMessage: >-
  Alucinação é um dos vários riscos ao trabalhar com IA. O próximo módulo,
  Segurança, trata de outros riscos importantes — vazamento de dados
  sensíveis e prompt injection.
roleLenses:
  dev:
    - "Desconfie de APIs, bibliotecas ou parâmetros sugeridos que você não conhece: confirme na documentação antes de usar."
    - "Rode testes e build antes de aceitar código gerado; erros fluentes passam fácil numa leitura rápida."
  qa:
    - "Inclua cenários que induzem alucinação: perguntas sobre fatos inexistentes ou informações fora das fontes disponíveis."
    - "Registre respostas alucinadas como defeitos com exemplos reproduzíveis, incluindo o contexto enviado."
  po:
    - "Avalie o impacto de uma resposta errada em cada funcionalidade e defina onde a verificação humana é obrigatória."
    - "Trate viés e desatualização como riscos de produto distintos de alucinação, cada um com sua mitigação."
  tl:
    - "Crie o hábito de verificação no time: pedir fontes, conferir com grounding e revisar antes de confiar."
    - "Inclua modos de falha de LLM na análise de risco de novas funcionalidades."
---

## O que é alucinação

**Alucinação** é quando um modelo gera uma afirmação que soa plausível e é apresentada com confiança, mas que é factualmente incorreta ou inventada — uma citação que não existe, uma API que não tem aquele método, um número que parece razoável mas está errado. Isso acontece porque o modelo está gerando a continuação mais provável do texto, não consultando uma fonte de verdade (como visto no módulo Como LLMs funcionam).

## Confiança excessiva

Um risco relacionado, mas distinto: mesmo quando o modelo está "incerto" internamente, o texto gerado raramente comunica essa incerteza de forma explícita — a menos que seja pedido para fazer isso. Fluência e tom assertivo não são sinal de exatidão.

## Informação desatualizada

O conhecimento de um modelo tem uma data de corte de treinamento. Perguntas sobre eventos recentes, versões novas de uma ferramenta, ou mudanças em uma política podem receber respostas desatualizadas apresentadas como atuais — a menos que grounding (visto no módulo anterior) seja usado.

## Viés

Modelos aprendem padrões presentes nos dados de treinamento, incluindo vieses existentes nesses dados — sub ou sobrerrepresentação de determinados grupos, associações estereotipadas, ou perspectivas culturais dominantes. Esse viés pode aparecer de forma sutil, mesmo em respostas tecnicamente corretas.

## Qualidade das fontes

Quando um modelo usa grounding ou uma tool para buscar informação, a resposta só é tão confiável quanto a fonte consultada. Uma fonte desatualizada, incorreta ou de baixa qualidade produz uma resposta "ancorada", mas ainda errada.

## Estratégias de mitigação

- **Verificar** afirmações críticas antes de usá-las, em vez de confiar apenas na fluência.
- **Pedir fontes ou justificativas** explicitamente, o que reduz (mas não elimina) o risco.
- **Usar grounding** para tarefas que dependem de informação específica ou recente.
- **Calibrar o esforço de verificação** ao custo real de um erro — nem tudo exige o mesmo rigor.
