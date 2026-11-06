# Seed — AI Literacy Hub

Este documento define o conteúdo mínimo inicial que deve ser transformado nos respectivos arquivos Markdown/JSON do projeto.

---

# Curriculum

## Phase 1

ID:

`foundations`

Título:

**Fundamentos & Uso Consciente**

Descrição:

Entenda como modelos de IA funcionam e aprenda a utilizá-los com contexto, intenção e senso crítico.

Transformação:

**Usuário casual → usuário consciente e competente**

Status:

`active`

Módulos:

1. IA, GenAI e LLMs — coming-soon
2. Como LLMs funcionam — coming-soon
3. Tokens e Context Window — coming-soon
4. Prompt vs Context — coming-soon
5. Context Engineering — published
6. Models — coming-soon
7. Tools — coming-soon
8. Grounding e RAG — coming-soon
9. Limitações e alucinação — coming-soon
10. Segurança — coming-soon
11. Human-in-the-loop — coming-soon

---

## Phase 2

ID:

`agentic-ai`

Título:

**Agentic AI & Orquestração**

Descrição:

Aprenda a fazer IA executar trabalho utilizando ferramentas, workflows e agentes.

Transformação:

**Usuário → operador de agentes e workflows**

Status:

`coming-soon`

---

## Phase 3

ID:

`ai-native-engineering`

Título:

**AI-Native Software Engineering**

Descrição:

Aprenda a projetar processos de engenharia onde humanos e agentes trabalham juntos.

Transformação:

**Operador → designer de workflows AI-native**

Status:

`coming-soon`

---

# Module

ID:

`context-engineering`

Slug:

`context-engineering`

Phase:

`foundations`

Order:

5

Title:

**Context Engineering**

Description:

Aprenda a estruturar as informações necessárias para que modelos e agentes consigam executar tarefas com mais qualidade, previsibilidade e contexto.

Duration:

35 minutos

Status:

`published`

---

# Learning objectives

Ao concluir este módulo você deverá conseguir:

- diferenciar prompt de contexto;
- identificar informações relevantes para uma tarefa;
- reconhecer contexto insuficiente ou excessivo;
- explicitar restrições;
- criar critérios de aceite;
- construir um Task Context Canvas.

---

# Opening

Um dos erros mais comuns ao trabalhar com IA é tentar resolver problemas de qualidade escrevendo prompts cada vez maiores.

Mas um prompt não é todo o ambiente de trabalho de um modelo.

Quando pedimos a uma pessoa para executar uma tarefa complexa, normalmente fornecemos informações como:

- objetivo;
- contexto;
- documentos;
- código;
- histórico;
- regras;
- restrições;
- exemplos;
- critérios de aceite.

Modelos e agentes também precisam disso.

Por isso, uma pergunta mais útil do que:

> Como escrevo um prompt melhor?

é:

> O que a IA precisa saber para conseguir executar bem esta tarefa?

Essa mudança de perspectiva é a base de Context Engineering.

---

# Core concept

## Prompt

Define principalmente:

**o que estamos pedindo.**

Exemplo:

> Adicione validação de CPF nesta API.

## Context

Ajuda a responder:

**o que o sistema precisa saber para conseguir executar corretamente.**

Pode incluir:

- arquitetura;
- código existente;
- documentação;
- regras de negócio;
- decisões anteriores;
- exemplos;
- restrições;
- critérios de aceite.

Context Engineering é o trabalho deliberado de selecionar, organizar e disponibilizar essas informações.

Mais contexto não significa necessariamente melhor contexto.

O objetivo é fornecer:

**contexto relevante, suficiente e confiável.**

---

# Mental model

Utilize o seguinte modelo:

## Task Context Canvas

### Objective

O que precisa ser alcançado?

### Context

O que a IA precisa saber sobre o problema e o ambiente?

### Artifacts

Quais fontes devem ser consultadas?

### Constraints

O que precisa ou não pode acontecer?

### Acceptance Criteria

Que evidências demonstram que o trabalho está correto?

---

# Demo

Considere esta tarefa:

> Adicione validação de CPF nesta API.

É uma instrução aparentemente clara, mas deixa várias perguntas abertas:

- qual endpoint?
- qual stack?
- já existe padrão de validação?
- podemos adicionar dependências?
- como erros são retornados?
- existem testes?
- qual comportamento existente deve ser preservado?

Agora compare com:

## Objective

Adicionar validação de CPF no endpoint de cadastro.

## Context

A aplicação utiliza Java e Spring Boot.

Validações existentes seguem um padrão já utilizado por outros campos.

## Artifacts

Consultar:

- implementação atual do endpoint;
- validadores existentes;
- tratamento global de erros;
- testes relacionados ao cadastro.

## Constraints

- não adicionar nova dependência;
- preservar contratos existentes;
- seguir os padrões atuais do projeto.

## Acceptance Criteria

- CPF inválido não é aceito;
- erro segue o padrão atual da API;
- CPF válido mantém o comportamento existente;
- testes existentes continuam passando;
- novos cenários possuem testes.

Observe que não fizemos necessariamente um "prompt mais inteligente".

Reduzimos a quantidade de decisões que o modelo precisaria adivinhar.

---

# Key insight

**Prompt Engineering pergunta:**

> Como devo formular minha solicitação?

**Context Engineering adiciona:**

> O que precisa estar disponível no ambiente para que a solicitação possa ser executada corretamente?

As duas coisas são úteis.

Mas sistemas agenticos tornam Context Engineering especialmente importante porque os modelos passam a tomar mais decisões e executar mais ações.

---

# Lab

## Cenário

Você recebeu a seguinte demanda:

> Precisamos impedir clientes inelegíveis de receber uma determinada oferta.

Imagine que estão disponíveis:

### README

Informa que o serviço é responsável pela elegibilidade de ofertas.

### regras-negocio.md

Contém critérios existentes de elegibilidade.

### arquitetura.md

Descreve integrações com sistemas externos.

### EligibilityService.java

Contém a lógica atual.

### EligibilityServiceTest.java

Possui os testes atuais.

### API Contract

Define que consumidores existentes não podem ter quebra de contrato.

---

## Sua tarefa

Prepare o contexto que você entregaria a um Coding Agent antes de pedir a implementação.

Preencha:

### OBJECTIVE

...

### CONTEXT

...

### ARTIFACTS

...

### CONSTRAINTS

...

### ACCEPTANCE CRITERIA

...

---

# Reflection prompts

Após o exercício, reflita:

1. Que informações você inicialmente não pensaria em fornecer?
2. Algum contexto disponível era desnecessário?
3. Quais decisões você conseguiu impedir que a IA tivesse que adivinhar?
4. Em qual atividade real do seu trabalho você poderia aplicar esse Canvas?

---

# Completion message

Você acabou de fazer algo mais importante do que escrever um prompt.

Você projetou o ambiente informacional necessário para executar uma tarefa.

Esse mesmo princípio aparecerá novamente quando falarmos sobre:

- Coding Agents;
- MCP;
- Skills;
- SDD;
- agentes autônomos;
- Harness Engineering.

---

# Forms configuration

O projeto deve suportar três Forms para este módulo:

## baseline

Objetivo:

Capturar percepção antes do conteúdo.

Campos conceituais:

- participant_id;
- role;
- conhecimento sobre Context Engineering: 1–5;
- capacidade de aplicar: não / com ajuda / sim;
- pequena questão conceitual.

## evidence

Objetivo:

Registrar o exercício.

Campos conceituais:

- participant_id;
- module_id;
- Task Context Canvas;
- comentário opcional.

## reflection

Objetivo:

Capturar mudança percebida.

Campos conceituais:

- participant_id;
- conhecimento após: 1–5;
- consegue aplicar: não / com ajuda / sim;
- possui caso real: sim / não;
- caso real opcional.

URLs e identificadores de prefill NÃO são conhecidos ainda.

Forneça placeholders/configuração segura.

---

# Demo Maturity Data

Caso seja necessário apresentar visualmente o conceito de Maturity Map, utilizar dados estáticos explicitamente marcados:

**Dados demonstrativos**

Exemplo:

Participantes: 12

Percepção média antes:
2.1 / 5

Percepção média depois:
4.0 / 5

"Consigo aplicar":

Antes:
25%

Depois:
83%

Score médio de evidência:
4.1 / 5

Gap demonstrativo:

- Objective: 92%
- Context: 83%
- Artifacts: 75%
- Acceptance Criteria: 67%
- Constraints: 42%

Próxima intervenção sugerida:

**Dojo — Constraints & Guardrails na prática**

Não sugerir que esses números foram coletados de participantes reais.