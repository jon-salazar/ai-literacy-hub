---
id: mcp
slug: mcp
title: MCP — Model Context Protocol
description: >-
  Entenda como o Model Context Protocol padroniza a forma como aplicações de
  IA descobrem e usam ferramentas, dados e prompts de sistemas externos.
phase: agentic-ai
order: 3
duration: 35 minutos
status: published
prerequisites:
  - tools
  - context-engineering
objectives:
  - Explicar o problema que o MCP resolve em relação a integrações feitas caso a caso.
  - Diferenciar Host, Client e Server em uma arquitetura MCP.
  - Diferenciar as três primitivas principais de um servidor MCP — Tools, Resources e Prompts — e quem controla cada uma.
  - Projetar as capacidades de um servidor MCP para um sistema real do seu time.
  - Identificar quais capacidades exigem permissões restritas ou aprovação humana.
introduction: >-
  Na Fase 1 você viu que uma tool permite que o modelo peça a execução de uma
  ação real e use o resultado. Mas, na prática, cada aplicação de IA — um
  assistente de chat, uma IDE, um Coding Agent — costuma precisar de acesso
  aos mesmos sistemas: o repositório, o issue tracker, a documentação do time,
  os logs de CI. Se cada aplicação integra cada sistema do seu próprio jeito,
  o esforço se multiplica e as integrações divergem. O Model Context Protocol
  (MCP) é um protocolo aberto que padroniza essa conexão: um sistema expõe
  suas capacidades uma vez, através de um servidor MCP, e qualquer aplicação
  compatível consegue descobri-las e usá-las. Neste módulo você vai entender
  as peças dessa arquitetura e projetar um servidor MCP para um sistema do seu
  dia a dia.
keyMessage: MCP não dá novos poderes ao modelo — ele padroniza como ferramentas, dados e prompts chegam até o modelo. Integrar uma vez, usar em vários hosts, com o mesmo cuidado de permissões em todos.
demo:
  versionALabel: "Versão A — integração feita caso a caso"
  versionAText: >-
    O time quer que o assistente da IDE e o Coding Agent consultem o issue
    tracker interno. Cada ferramenta ganha um script próprio de integração,
    com formato de chamada, autenticação e descrição de parâmetros diferentes.
    Quando o issue tracker muda um campo, as duas integrações quebram de
    formas distintas — e ninguém sabe ao certo quais ações cada uma consegue
    executar.
  versionBLabel: "Versão B — um servidor MCP para o issue tracker"
  versionBText: >-
    O time cria um único servidor MCP para o issue tracker.

    Tools: buscar_issue(id), listar_issues(filtro), comentar_issue(id, texto) —
    esta última marcada como ação com efeito real, que exige confirmação.

    Resources: o template de definição de pronto do time e o glossário de
    status das issues, disponibilizados como contexto de leitura.

    Prompts: "Resumir issue para refinamento", um template que o usuário
    escolhe explicitamente.

    O assistente da IDE e o Coding Agent, por serem hosts compatíveis com MCP,
    se conectam ao mesmo servidor e descobrem as mesmas capacidades, com as
    mesmas descrições e as mesmas restrições.
  explanation: >-
    A Versão B não torna o modelo mais inteligente. Ela muda a arquitetura: as
    capacidades do sistema passam a ser declaradas em um único lugar, com
    nomes, descrições e parâmetros explícitos, e cada host descobre o que está
    disponível em vez de depender de integrações duplicadas. Isso também
    torna visível — e revisável — exatamente quais ações o agente pode
    executar, que é o primeiro passo para controlar o risco dessas ações.
lab:
  scenario: >-
    Seu time quer que um Coding Agent ajude a investigar falhas de build. Hoje,
    quando o pipeline de CI falha, alguém abre o log, procura o erro, consulta
    o ADR relacionado ao componente afetado e, às vezes, reexecuta o job ou
    abre uma issue. Estão disponíveis: a API do sistema de CI (ler status e
    logs de execuções, reexecutar um job, cancelar uma execução), a pasta de
    ADRs do repositório, o issue tracker (ler e criar issues) e um checklist
    interno de "como investigar build quebrado". O sistema de CI também
    guarda variáveis de ambiente com segredos do deploy.
  instructions: >-
    Projete o servidor MCP que você daria a esse agente. Para cada capacidade
    disponível, decida se ela entra no servidor e, se entrar, classifique-a
    como Tool (ação que o modelo decide chamar), Resource (dado que a
    aplicação disponibiliza como contexto) ou Prompt (template que o usuário
    escolhe). Para cada Tool, defina nome, parâmetros de entrada e se ela é
    somente leitura ou tem efeito real. Depois, liste o que deliberadamente
    fica fora do servidor e quais Tools exigem aprovação humana antes de
    executar — e justifique. Registre seu desenho no formulário de evidência.
  useTaskContextCanvas: false
reflectionPrompts:
  - Alguma capacidade que você pensou inicialmente como Tool fazia mais sentido como Resource (ou o contrário)?
  - O que você decidiu deixar fora do servidor, e por quê?
  - Quais Tools do seu desenho exigem aprovação humana? Que critério você usou para decidir?
  - Que sistema real do seu time seria o melhor candidato para um primeiro servidor MCP?
completionMessage: >-
  Você acabou de projetar a fronteira entre um agente e um sistema real:
  quais capacidades existem, quem controla cada uma e o que nunca deveria
  estar ao alcance do agente. Esse desenho de fronteira vai reaparecer nos
  próximos módulos — em estado e memória, em workflows, em guardrails e em
  observabilidade — porque um agente só é tão confiável quanto as
  capacidades que você decide expor a ele.
---

## O problema: integrações N × M

Tools resolvem o acesso de **um** modelo a **uma** ação. Mas um time real tem várias aplicações de IA (assistentes de chat, IDEs, Coding Agents, automações) e vários sistemas que elas precisam acessar (repositório, issue tracker, documentação, CI, banco de dados). Sem um padrão, cada par aplicação × sistema vira uma integração própria — com formatos, descrições e regras de segurança diferentes.

O **Model Context Protocol (MCP)** é um protocolo aberto que define uma forma comum para uma aplicação de IA descobrir e usar capacidades de sistemas externos. Uma analogia frequente é a de uma porta padronizada: o sistema implementa o protocolo uma vez, e qualquer aplicação compatível consegue se conectar.

## Host, Client e Server

A arquitetura MCP separa três papéis:

- **Host** — a aplicação de IA com a qual a pessoa interage (um assistente, uma IDE, um Coding Agent). O host decide a quais servidores se conectar, controla permissões e é quem conversa com o modelo.
- **Client** — o componente, dentro do host, que mantém a conexão com **um** servidor específico. Um host conectado a três servidores mantém três clients.
- **Server** — o programa que expõe as capacidades de um sistema (o issue tracker, o CI, um conjunto de documentos) seguindo o protocolo. Um servidor pode rodar localmente, na máquina da pessoa, ou remotamente, como um serviço.

O modelo não fala diretamente com o servidor. Ele continua fazendo o que viu no módulo de Tools: descreve a chamada que quer fazer. É o host, através do client, que executa a chamada no servidor e devolve o resultado.

## As três primitivas: Tools, Resources e Prompts

Um servidor MCP expõe principalmente três tipos de capacidade. A diferença mais útil entre elas é **quem decide usá-las**:

- **Tools** — ações que podem ser executadas (consultar, criar, alterar algo). **Quem controla: o modelo**, que decide quando chamar, dentro das permissões do host.
- **Resources** — dados que podem ser lidos como contexto (arquivos, documentos, registros). **Quem controla: a aplicação**, que decide o que disponibilizar ao modelo.
- **Prompts** — templates reutilizáveis de interação. **Quem controla: o usuário**, que escolhe explicitamente quando usar.

Isso conecta diretamente com Context Engineering: Resources e Prompts são formas padronizadas de levar **contexto relevante** até o modelo; Tools são formas padronizadas de permitir **ação**.

## Descoberta de capacidades

Uma característica central do MCP é que o host pode perguntar ao servidor o que ele oferece — quais tools existem, com quais descrições e parâmetros; quais resources e prompts estão disponíveis. Por isso, **nomes e descrições claros são parte do design**: são eles que o modelo usa para decidir se e quando chamar uma tool. Uma descrição vaga gera chamadas erradas; uma descrição precisa reduz decisões que o modelo teria que adivinhar.

## Segurança: o protocolo não decide o que é seguro

MCP padroniza a conexão, mas **não** garante que as capacidades expostas sejam seguras. Alguns cuidados que continuam sendo responsabilidade de quem projeta e de quem instala um servidor:

- **Menor privilégio** — exponha apenas o que a tarefa exige. Um servidor para investigar builds não precisa apagar branches.
- **Separar leitura de efeito real** — tools somente leitura e tools que alteram estado devem ser claramente distinguíveis, e as que alteram estado são candidatas naturais a aprovação humana.
- **Segredos fora do alcance** — credenciais ficam na configuração do servidor, nunca em resources ou respostas de tools que chegam ao modelo.
- **Confiança no servidor** — instalar um servidor MCP é dar a ele acesso ao seu ambiente. Descrições de tools e conteúdos retornados por um servidor são entrada externa e podem conter instruções maliciosas (o mesmo risco de prompt injection visto no módulo de Segurança).

## Onde isso se encaixa na jornada

Na Fase 1, uma tool era uma capacidade isolada. Com MCP, capacidades passam a ser **componentes reutilizáveis e declarados**, compartilhados entre vários hosts e agentes. Isso é o que permite, nos próximos módulos, montar workflows e agentes que combinam vários sistemas — e é também o que torna essencial falar de permissões, guardrails e observabilidade.
