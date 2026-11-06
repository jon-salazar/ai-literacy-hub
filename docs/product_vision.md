# Letramento de IA para Desenvolvimento de Software

## 1. Objetivo do projeto

Criar uma iniciativa de letramento em Inteligência Artificial voltada para profissionais que atuam no ciclo de desenvolvimento de software, incluindo Devs, QAs, POs, TLs e demais papéis relacionados.

A proposta não é criar apenas um curso sobre ferramentas de IA, mas desenvolver uma base comum de conhecimento e maturidade que permita às pessoas:

- entender os fundamentos por trás das tecnologias de IA;
- utilizar modelos de forma consciente e eficiente;
- compreender e operar workflows agenticos;
- incorporar IA de forma estruturada ao processo de engenharia de software;
- evoluir seus próprios workflows de trabalho;
- acompanhar a evolução do estado da arte;
- aplicar esses conhecimentos dentro das restrições e padrões da organização.

A jornada pode ser entendida como uma evolução de maturidade:

**Entender → Usar → Delegar → Orquestrar → Projetar workflows → Operar IA como parte da engenharia.**

---

# 2. Princípios do programa

## 2.1. Ensinar conceitos, não ferramentas

O conteúdo não deve ser estruturado em torno de ferramentas específicas como ChatGPT, Copilot, Claude, Codex ou similares.

Ferramentas envelhecem rapidamente.

A base deve estar em conceitos e capacidades duráveis:

**Modelo → Contexto → Tool → Agent → Workflow → Avaliação → Harness**

Ferramentas específicas entram como exemplos concretos desses conceitos.

---

## 2.2. Um núcleo comum para todos os papéis

Não criar cursos independentes como:

- IA para Dev;
- IA para QA;
- IA para PO;
- IA para TL.

A proposta é possuir um **Core Curriculum comum**, criando uma linguagem compartilhada entre todas as funções.

Sobre esse núcleo entram as **Role Lenses**, demonstrando como cada conceito se aplica a diferentes papéis.

Exemplo:

### Context Engineering

- Dev: código, arquitetura, documentação e dependências;
- QA: critérios de aceite, histórico de bugs, cenários e evidências;
- PO: domínio, regras de negócio, personas e objetivos;
- TL: arquitetura, ADRs, padrões e restrições.

O conceito é o mesmo. O contexto de aplicação muda.

---

## 2.3. Aprender fazendo

A conclusão de um módulo não deve significar:

> “Assisti ao conteúdo.”

Mas:

> “Consigo aplicar este conceito.”

Por isso, a prática e a geração de evidências devem fazer parte da própria estrutura pedagógica.

---

## 2.4. Async-first

O programa deve conseguir funcionar mesmo sem uma pessoa dedicada integralmente à iniciativa.

O modelo ideal é:

**Async-first + Sync-on-demand**

O conteúdo assíncrono sustenta a escala.

Momentos síncronos são utilizados principalmente para:

- prática;
- discussão;
- resolução de problemas reais;
- aprofundamento;
- troca de experiências;
- gaps identificados pelos participantes.

---

# 3. Arquitetura da jornada

A jornada é composta por quatro fases.

---

# Fase 1 — Fundamentos & Uso Consciente

## Pergunta central

**Como essas tecnologias funcionam e como trabalhar bem com elas?**

## Transformação esperada

Usuário casual de IA → usuário consciente e competente.

## Conteúdos

### Fundamentos

- Inteligência Artificial;
- Machine Learning;
- IA Generativa;
- Large Language Models;
- funcionamento básico de um LLM;
- natureza probabilística das respostas;
- Tokens;
- tokenização;
- Context Window;
- modelos e suas diferenças;
- custo, latência e capacidade.

### Interação com modelos

- Prompt;
- instruções;
- objetivos;
- constraints;
- exemplos;
- formatos de saída;
- multimodalidade.

### Contexto

- Prompt versus contexto;
- arquivos;
- documentação;
- código;
- histórico;
- Context Engineering.

Uma mensagem importante da fase:

> **O prompt é apenas uma parte do problema.**

A qualidade da resposta depende fortemente do contexto disponibilizado ao modelo.

### Capacidades

- Tools;
- Function Calling;
- Grounding;
- RAG;
- memória;
- memória da aplicação versus contexto do modelo.

### Limitações

- alucinação;
- confiança excessiva;
- informações desatualizadas;
- vieses;
- qualidade das fontes.

### Segurança

- dados sensíveis;
- vazamento de informações;
- prompt injection;
- limites de autonomia.

### Human-in-the-loop

- quando confiar;
- quando revisar;
- quando impedir ações automáticas;
- responsabilidade humana.

## Exemplo de exercício

Executar a mesma tarefa de duas maneiras.

Primeiro:

> “Faça X.”

Depois fornecer:

- objetivo;
- contexto;
- artefatos;
- restrições;
- exemplos;
- critérios de aceite.

Comparar os resultados.

O participante experimenta na prática o efeito do **Context Engineering**.

---

# Fase 2 — Agentic AI & Orquestração

## Pergunta central

**Como fazer a IA executar trabalho, e não apenas responder perguntas?**

## Transformação esperada

Usuário de IA → operador de workflows e agentes.

## Conceito fundamental

Ensinar claramente a distinção:

**Workflow ≠ Agent ≠ Multi-Agent**

Autonomia deve ser entendida como um espectro.

Uma possível escala:

**Assistant → Tool User → Workflow → Agent → Long-running Agent**

O objetivo não é maximizar autonomia.

O objetivo é obter o melhor resultado possível com o menor nível de complexidade necessário.

## Conteúdos

### Agent Loop

- observar;
- raciocinar;
- agir;
- observar resultado;
- decidir próximo passo.

### Tools

- Function Calling;
- APIs;
- ferramentas externas;
- execução de ações.

### MCP

- conceito;
- Resources;
- Tools;
- Prompts;
- Host;
- Client;
- Server.

### Estado e memória

- estado de execução;
- memória de curto prazo;
- memória persistente;
- artefatos externos.

### Planejamento

- planning;
- decomposition;
- execução por etapas.

### Workflows

- workflows determinísticos;
- branching;
- routing;
- parallelization.

### Agents

- autonomia;
- seleção de ações;
- tomada de decisão dinâmica.

### Subagents

- especialização;
- isolamento de contexto;
- delegação.

### Multi-Agent

- quando utilizar;
- quando evitar;
- coordenação entre agentes.

### Patterns

- Routing;
- Handoffs;
- Parallelization;
- Evaluator–Optimizer;
- Generator–Reviewer;
- Planning–Execution.

### Controle

- Human checkpoints;
- Guardrails;
- permissões;
- limites de atuação.

### Observabilidade

- tracing;
- tool calls;
- histórico de decisões;
- debugging de agentes.

### Avaliação

- Evals;
- critérios de sucesso;
- estabilidade;
- comparação de resultados.

### Modos de falha

- loops;
- contexto ruim;
- uso incorreto de tools;
- decisões equivocadas;
- explosão de custo;
- autonomia excessiva.

---

# Fase 3 — AI-Native Software Engineering

## Pergunta central

**Como redesenhar o processo de engenharia de software considerando IA como parte do sistema de desenvolvimento?**

## Transformação esperada

Operador de IA → designer de workflows AI-native.

Esta é potencialmente a fase mais importante da jornada.

Ela representa a transição de:

> “Usar IA para me ajudar a programar”

para:

> “Projetar um sistema de engenharia em que humanos e agentes trabalham juntos.”

## Conteúdos

### AI Coding

Evolução:

**Autocomplete → Chat → Coding Agent**

### Repository Context

- estrutura do projeto;
- documentação;
- README;
- arquitetura;
- ADRs;
- decisões anteriores;
- padrões;
- código;
- testes.

### Instructions

- instruções persistentes;
- convenções;
- regras de engenharia;
- restrições do projeto.

### Skills

- conhecimento reutilizável;
- procedimentos;
- especialização de agentes.

### Context Engineering

- seleção de contexto;
- recuperação;
- filtragem;
- estruturação;
- qualidade versus quantidade.

### Spec-Driven Development

Fluxo:

**Spec → Plan → Tasks → Implementation**

### Intent-driven Development

O objetivo e a intenção passam a ser artefatos explícitos do processo de engenharia.

### Agentic Coding Loop

**Analisar → Planejar → Implementar → Testar → Avaliar → Corrigir**

### Evaluator Loop

**Generator → Evaluator → Generator**

### Agentic QA

- geração de testes;
- análise de código;
- revisão;
- validação;
- testes automatizados;
- evidências.

### Task Decomposition

- decomposição de grandes problemas;
- subtarefas;
- dependências.

### Task Graphs

Representação de dependências entre tarefas e oportunidades de paralelização.

### Parallel Agents

Uso de múltiplos agentes trabalhando sobre problemas independentes.

### Long-running Agents

- tarefas longas;
- múltiplas sessões;
- continuidade;
- recuperação.

### Checkpoints

Persistência do estado intermediário.

### Compaction

Gerenciamento de contexto em execuções longas.

### Model Routing

Utilização de modelos diferentes conforme:

- complexidade;
- custo;
- latência;
- tipo de tarefa.

### Evals

Avaliação sistemática dos agentes e workflows.

### Observability

Tracing e investigação de falhas.

### Human-in-the-loop

Pontos deliberados de decisão humana.

---

# Harness Engineering

Harness Engineering deve aparecer como um conceito de maturidade avançada.

A pergunta deixa de ser:

> “Qual prompt devo escrever?”

e passa a ser:

> “Qual ambiente preciso construir ao redor do modelo para que ele execute esse trabalho com qualidade e repetibilidade?”

O Harness pode envolver:

- contexto;
- instructions;
- skills;
- tools;
- agentes;
- memória;
- estado;
- checkpoints;
- testes;
- evaluators;
- observabilidade;
- permissões;
- mecanismos de recuperação.

Princípio importante:

> **O objetivo não é maximizar autonomia. É maximizar resultado, confiança e repetibilidade.**

---

# Fase 4 — AI Engineering no contexto organizacional

Esta fase deve ser tratada separadamente, por possuir forte dependência de regras, restrições e ferramentas específicas da organização.

Neste momento, sua estrutura inicial pode considerar:

- ferramentas homologadas;
- modelos disponíveis;
- tratamento de dados;
- restrições de segurança;
- governança;
- integração corporativa;
- Instructions;
- Skills;
- padrões internos;
- Harnesses corporativos;
- observabilidade;
- casos de referência;
- boas práticas;
- padrões recomendados de utilização de IA.

No futuro, esta fase pode evoluir de treinamento para um verdadeiro:

**AI Engineering Operating Model da organização.**

---

# 4. Formato de distribuição

O programa não deve ser pensado simplesmente como um curso.

Ele deve funcionar como um **sistema contínuo de aprendizagem**.

A estrutura pode ser representada por:

**Learning Hub + Learning Loop + Community + Sync Events + AI Radar**

---

# 5. Learning Hub

Deve existir uma fonte de verdade para o programa.

Pode inicialmente ser simples.

O importante é centralizar:

- trilhas;
- módulos;
- vídeos;
- textos;
- cheatsheets;
- exemplos;
- labs;
- challenges;
- playbooks;
- referências;
- progresso;
- AI Radar.

Não há necessidade de desenvolver uma plataforma sofisticada no início.

---

# 6. Estrutura padrão de um módulo

Cada módulo pode seguir o mesmo ritual:

## Conceito

Conteúdo curto.

Aproximadamente 10–15 minutos.

## Demo

Demonstração prática.

Aproximadamente 5–10 minutos.

## Lab

Exercício de aplicação.

Aproximadamente 20–40 minutos.

## Reflexão

Poucas perguntas sobre compreensão e aplicação.

## Evidência

Um artefato demonstrando aprendizado.

A estrutura pode ser resumida como:

**CONCEITO → DEMO → PRÁTICA → REFLEXÃO → EVIDÊNCIA**

---

# 7. Um caso evolutivo atravessando toda a jornada

Em vez de utilizar exercícios completamente desconectados, o programa pode possuir um projeto ou problema único que evolui junto com os participantes.

Exemplo:

**Chat**

↓

**Context**

↓

**Tool**

↓

**Agent**

↓

**Workflow**

↓

**Spec**

↓

**Plan**

↓

**Tasks**

↓

**Implementation**

↓

**Testing**

↓

**Evaluation**

↓

**Harness**

O participante consegue visualizar concretamente sua evolução ao longo do programa.

---

# 8. Labs e Challenges

Labs são exercícios guiados.

Challenges são oportunidades de aplicar o conhecimento em um problema real.

Exemplos:

## Challenge 01 — Context

Selecionar uma tarefa real e construir o contexto necessário para que uma IA consiga executá-la.

## Challenge 02 — Tool

Criar ou projetar uma integração utilizando uma ferramenta externa.

## Challenge 03 — Agent

Transformar uma tarefa repetitiva em workflow ou agente.

## Challenge 04 — SDD

Transformar uma demanda em:

**Spec → Plan → Tasks → Implementation**

O princípio é:

> **Use IA melhor no seu trabalho esta semana.**

---

# 9. Medição da evolução

Não utilizar apenas conclusão de conteúdo.

A evolução deve ser observada por três sinais.

## Percepção

> “Eu acredito que entendi.”

## Conhecimento

> “Eu consigo explicar.”

## Aplicação

> “Eu consigo fazer.”

A aplicação deve possuir maior peso.

---

# 10. Pulse de aprendizagem

Após cada módulo, coletar poucas informações.

Exemplo:

> Antes deste módulo, quão confortável você estava com este assunto?

Escala 1–5.

> E agora?

Escala 1–5.

> Você consegue aplicar isso no trabalho?

- não;
- com ajuda;
- sim.

> Onde pretende utilizar este conhecimento?

O objetivo não é criar burocracia.

O preenchimento deve levar poucos segundos.

---

# 11. Maturity Map

Os dados coletados podem gerar um mapa de maturidade.

Exemplo:

| Competência | Maturidade |
|---|---:|
| Context Engineering | 4.1 |
| Agents | 3.0 |
| Evals | 1.7 |
| SDD | 2.2 |

Também pode ser analisado por papel.

| Competência | Dev | QA | PO | TL |
|---|---:|---:|---:|---:|
| Context | 4.2 | 3.8 | 3.1 | 4.0 |
| Agents | 3.6 | 2.9 | 2.3 | 3.5 |
| SDD | 3.4 | 2.6 | 3.0 | 3.7 |
| Evals | 2.1 | 2.8 | 1.4 | 2.2 |

O objetivo é responder continuamente:

> **Onde precisamos investir energia agora?**

---

# 12. Momentos síncronos

Os encontros síncronos não devem ser aulas tradicionais recorrentes.

Eles existem para complementar o async.

---

## Dojo

Encontro fortemente prático.

Exemplo:

> Implementar uma demanda real utilizando SDD + Coding Agent.

Alguém compartilha a tela e o grupo participa das decisões.

Possível frequência:

**mensal.**

---

## Workshop

Encontro estruturado para introduzir ou aprofundar um tema.

Exemplos:

- primeiro Agent;
- MCP;
- Evals;
- Context Engineering;
- SDD.

Pode acontecer no início de uma fase ou quando determinado gap aparecer.

---

## Clinic / Office Hours

Espaço aberto para problemas reais.

Pergunta central:

> “Tenho este problema. Como IA poderia ser aplicada aqui?”

É uma forma de conectar diretamente a trilha com o trabalho cotidiano.

Possível frequência:

**quinzenal.**

---

# 13. Polls orientando o programa

As pessoas podem ajudar a decidir os temas dos encontros.

Exemplo:

> Onde você está encontrando mais dificuldade?

- Coding Agents;
- MCP;
- SDD;
- Context Engineering;
- Evals;
- Multi-Agent.

Os dados dos polls podem ser combinados com o Maturity Map.

Assim os encontros síncronos passam a responder a necessidades reais.

---

# 14. Cadência possível

Uma cadência leve poderia seguir:

### Semana 1

Novo módulo async.

- conteúdo;
- demo;
- lab;
- pulse.

### Semana 2

Aplicação.

### Semana 3

Novo módulo async.

### Semana 4

Dojo, Workshop ou Clinic direcionado pelos sinais coletados.

A trilha não precisa ser rígida.

As pessoas podem continuar avançando de forma self-paced.

---

# 15. Cohorts sem dependência de instrutor

Mesmo sendo async, a organização pode trabalhar com ondas.

Exemplo:

### Setembro

Fase 1.

### Outubro

Fase 2.

### Novembro

Fase 3.

Isso cria senso coletivo de progressão sem obrigar que todas as pessoas estejam simultaneamente em uma aula.

Novos participantes continuam podendo consumir a trilha de forma self-paced.

---

# 16. Community Learning

Pode existir um espaço como:

**#ai-learning**

para compartilhar:

- experimentos;
- prompts;
- contextos;
- agentes;
- workflows;
- dificuldades;
- descobertas;
- casos de uso.

Mas os compartilhamentos devem possuir uma estrutura mínima.

**Problema**

↓

**Abordagem**

↓

**Contexto**

↓

**Resultado**

↓

**O que não funcionou**

↓

**Aprendizado**

Isso transforma experiências individuais em conhecimento organizacional.

---

# 17. AI Radar

Existe uma diferença entre conhecimento durável e conhecimento volátil.

## Conteúdo durável

- LLM;
- tokens;
- contexto;
- tools;
- agents;
- workflows;
- evals;
- guardrails;
- SDD;
- harness.

Deve permanecer dentro da trilha.

## Conteúdo volátil

- novos modelos;
- novas ferramentas;
- novos frameworks;
- benchmarks;
- novas técnicas;
- novos workflows;
- mudanças relevantes no ecossistema.

Esse conteúdo deve ficar separado da trilha principal.

Pode existir um:

# AI Radar

Periodicidade sugerida:

**mensal.**

Pergunta:

> “O que mudou recentemente e por que isso importa para engenharia de software?”

Dessa forma, a trilha não envelhece tentando acompanhar ferramentas específicas.

---

# 18. Métricas

O indicador principal não deve ser:

> “Quantas pessoas concluíram o treinamento?”

A pergunta mais relevante é:

> **Quantas pessoas mudaram alguma parte do seu workflow por causa do programa?**

Possíveis indicadores:

- adesão aos módulos;
- evolução da percepção;
- resultados de challenges;
- maturidade por competência;
- utilização semanal de IA;
- número de workflows criados;
- adoção de Context Engineering;
- utilização de agentes;
- utilização de SDD;
- casos reais compartilhados;
- reutilização de Skills ou workflows;
- horas poupadas estimadas;
- tarefas que passaram a ser possíveis com IA;
- práticas difundidas para outras equipes.

---

# 19. Papel de quem mantém o programa

Como não existe disponibilidade de uma pessoa dedicada full-time, a função precisa ser desenhada de forma diferente.

A responsabilidade não deve ser:

> “Ensinar todas as pessoas.”

Mas:

## Curadoria

Manter a trilha relevante.

## Facilitação

Conduzir os momentos síncronos mais importantes.

## Observação

Analisar percepção, challenges e evolução.

## Discovery

Identificar gaps e oportunidades.

## Amplificação

Transformar casos internos bem-sucedidos em conhecimento reutilizável.

## Evolução

Atualizar o programa conforme surgem novos padrões e práticas.

Isso permite que uma pessoa atue muito mais como:

**Arquiteto / Curador do sistema de aprendizagem**

do que como instrutor tradicional.

---

# 20. Visão consolidada do sistema

```text
                         LETRAMENTO DE IA
                               │
              ┌────────────────┴────────────────┐
              │                                 │
       CORE CURRICULUM                      AI RADAR
          durável                           evolutivo
              │
              ▼
       FASE 1 — Fundamentos
              │
              ▼
       FASE 2 — Agentic AI
              │
              ▼
       FASE 3 — AI-Native Engineering
              │
              ▼
       FASE 4 — AI na organização


        Transversal às fases:

          DEV | QA | PO | TL
             Role Lenses


                         │
                         ▼

                    LEARNING HUB
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
       Conteúdo         Labs       Challenges
           │             │             │
           └─────────────┼─────────────┘
                         ▼
                   Learning Signals
                         │
            ┌────────────┼────────────┐
            ▼            ▼            ▼
       Percepção    Conhecimento   Aplicação
                         │
                         ▼
                    Maturity Map
                         │
            ┌────────────┼────────────┐
            ▼            ▼            ▼
          Dojos       Workshops     Clinics
                         │
                         ▼
                  Casos reais internos
                         │
                         ▼
                  Novos conhecimentos
                         │
                         └──────► Learning Hub
```

---

# Visão final

O projeto começa como uma iniciativa de **Letramento de IA**, mas pode evoluir para algo maior.

Não apenas ensinar pessoas a utilizarem ferramentas.

Mas construir progressivamente uma organização capaz de:

- compreender IA;
- trabalhar com IA;
- desenvolver com IA;
- projetar workflows com IA;
- avaliar sistemas de IA;
- compartilhar conhecimento;
- aprender coletivamente;
- incorporar novas práticas continuamente.

O resultado desejado não é simplesmente uma população treinada.

É uma organização com **capacidade contínua de evolução em AI Engineering**.