# Implementação — AI Literacy Hub POC

Quero que você implemente uma POC de um Learning Hub chamado **AI Literacy Hub**, destinado ao letramento em Inteligência Artificial para profissionais envolvidos no ciclo de desenvolvimento de software.

Esta implementação é, ela própria, um experimento de AI-Native Software Engineering.

Portanto, não comece simplesmente escrevendo código.

O trabalho deve seguir:

**Intent → Spec → Plan → Tasks → Implementation → Validation → Review**

## Objetivo da POC

Ao final da implementação deve existir uma aplicação web estática onde um participante consiga:

1. entender a proposta do programa;
2. visualizar as três principais fases da trilha;
3. navegar pelo currículo;
4. acessar um módulo completo de Context Engineering;
5. realizar uma avaliação inicial;
6. consumir conteúdo conceitual;
7. visualizar uma demonstração;
8. executar um lab;
9. enviar uma evidência por Google Forms;
10. realizar uma reflexão/avaliação final;
11. visualizar progresso local;
12. retornar posteriormente e manter o progresso no mesmo navegador.

A POC não é um LMS.

O objetivo é provar a experiência:

**Discover → Learn → Practice → Reflect → Evidence → Progress**

---

# Regra principal

Priorize:

- simplicidade;
- legibilidade;
- manutenibilidade;
- conteúdo desacoplado da interface;
- funcionamento totalmente estático;
- possibilidade de evolução futura.

Evite overengineering.

---

# Stack

Utilize:

- Astro;
- TypeScript;
- Markdown para conteúdo;
- JSON para configuração estrutural;
- Astro Content Collections para validação dos módulos;
- CSS simples e componentizado;
- localStorage para progresso local;
- Google Forms para coleta externa.

Não implementar backend.

Não implementar SSR.

Não implementar banco de dados.

Não implementar autenticação.

Não utilizar uma biblioteca UI pesada.

Evite adicionar dependências sem necessidade explícita.

Se o repositório já possuir alguma estrutura compatível, preserve-a e adapte o plano antes de realizar mudanças destrutivas.

---

# Arquitetura

A aplicação deve ser essencialmente:

Content + Configuration → Static Build → Browser

Estrutura conceitual:

Git Repository

- Markdown: conteúdo dos módulos
- JSON: currículo e configurações
- Astro: apresentação
- localStorage: estado local
- Google Forms: dados externos

O conteúdo educacional não deve estar hardcoded nos componentes da interface.

Adicionar um novo módulo deve ser possível prioritariamente criando conteúdo/configuração, sem criar uma nova página ou componente específico.

---

# Estrutura desejada

Adapte se houver razão técnica concreta, mas mantenha a separação de responsabilidades:

ai-literacy-hub/

AGENTS.md
README.md

docs/
  vision.md
  architecture.md
  learning-model.md

specs/
  001-learning-hub-poc/
    spec.md
    plan.md
    tasks.md
    acceptance.md

src/
  components/
  layouts/
  pages/
  data/
    curriculum.json
    forms.json
  content/
    modules/
  lib/
    progress.ts
    forms.ts
  styles/
    global.css
  content.config.ts

public/

---

# Antes da implementação

Caso estes documentos ainda não existam, crie primeiro:

1. `docs/vision.md`
2. `docs/architecture.md`
3. `docs/learning-model.md`
4. `specs/001-learning-hub-poc/spec.md`
5. `specs/001-learning-hub-poc/plan.md`
6. `specs/001-learning-hub-poc/tasks.md`
7. `specs/001-learning-hub-poc/acceptance.md`

Use as informações deste briefing para produzi-los.

Depois faça uma revisão dos documentos procurando:

- contradições;
- ambiguidades;
- requisitos não testáveis;
- complexidade desnecessária;
- decisões não justificadas.

Resolva esses problemas antes de iniciar a implementação.

---

# Modelo educacional

A jornada completa possui quatro fases conceituais, mas somente as três primeiras fazem parte do Hub genérico desta POC.

## Fase 1

**Fundamentos & Uso Consciente**

Objetivo:

Entender e utilizar IA de forma consciente.

Sugestão de módulos:

1. IA, GenAI e LLMs
2. Como LLMs funcionam
3. Tokens e Context Window
4. Prompt vs Context
5. Context Engineering
6. Models
7. Tools
8. Grounding e RAG
9. Limitações e alucinação
10. Segurança
11. Human-in-the-loop

Somente **Context Engineering** precisa estar completamente implementado na POC.

Os demais podem aparecer como currículo futuro.

## Fase 2

**Agentic AI & Orquestração**

Objetivo:

Delegar e orquestrar trabalho com IA.

Sugestão:

- Agent Loop
- Tools
- Function Calling
- MCP
- State
- Memory
- Planning
- Workflow vs Agent
- Routing
- Handoffs
- Subagents
- Multi-Agent
- Parallelization
- Guardrails
- Evals
- Tracing

Status inicial:

`coming-soon`

## Fase 3

**AI-Native Software Engineering**

Objetivo:

Projetar workflows de engenharia ao redor de IA.

Sugestão:

- Coding Agents
- Repository Context
- Instructions
- Skills
- Context Engineering avançado
- SDD
- Spec → Plan → Tasks → Implementation
- Agentic Coding Loop
- Evaluator Loop
- Agentic QA
- Task Decomposition
- Task Graphs
- Parallel Agents
- Long-running Agents
- Checkpoints
- Compaction
- Model Routing
- Evals
- Observability
- Harness Engineering

Status inicial:

`coming-soon`

---

# Navegação

Implementar no mínimo:

## Home

Apresentar:

AI Literacy

**Entenda → Delegue → Projete**

Mostrar as três fases através de cards.

Cada card deve conter:

- número;
- nome;
- descrição;
- estado;
- quantidade de módulos, se disponível.

A Fase 1 deve estar disponível.

Fases 2 e 3 podem ser exibidas como "Em breve".

---

## Página de fase

Exibir:

- título;
- descrição;
- transformação esperada;
- lista ordenada de módulos;
- duração estimada;
- status;
- progresso.

O módulo Context Engineering deve estar acessível.

Módulos futuros devem aparecer visualmente como indisponíveis ou "Em breve", sem causar dead ends confusos.

---

## Página de módulo

Criar rota dinâmica baseada no conteúdo.

Não criar uma página Astro específica para Context Engineering.

A página deve ser gerada a partir do Markdown e metadados.

Seções esperadas:

1. introdução;
2. objetivos;
3. baseline;
4. conceito;
5. demo;
6. lab;
7. evidência;
8. reflexão;
9. conclusão.

---

# Módulo POC

Implementar completamente:

**Context Engineering**

Duração estimada:

35 minutos.

Objetivos:

Ao final o participante deverá conseguir:

1. diferenciar prompt de contexto;
2. identificar informações relevantes para uma tarefa;
3. evitar excesso de contexto irrelevante;
4. estruturar contexto para um agente;
5. produzir um Task Context Canvas.

Mensagem principal:

> O prompt descreve o que eu quero. O contexto fornece aquilo que a IA precisa saber para executar bem.

Introduzir o modelo:

## Task Context Canvas

Campos:

### Objective

O que precisa ser alcançado?

### Context

O que a IA precisa saber?

### Artifacts

Quais fontes, documentos, arquivos ou código devem ser consultados?

### Constraints

Quais regras e limitações precisam ser respeitadas?

### Acceptance Criteria

Como saberemos que a tarefa foi concluída corretamente?

---

# Demo

Mostrar duas versões conceituais da mesma tarefa.

## Versão A

"Adicione validação de CPF nesta API."

Explicar os principais problemas desta instrução isolada.

## Versão B

Objective:
Adicionar validação de CPF no endpoint de cadastro.

Context:
Aplicação Java com Spring Boot. As validações seguem o padrão existente no projeto.

Artifacts:
Arquivos da API, validadores existentes e testes relacionados.

Constraints:
Não adicionar nova dependência e manter compatibilidade.

Acceptance Criteria:
CPF inválido retorna erro adequado.
CPF válido mantém o fluxo existente.
Testes existentes continuam funcionando.

Explicar por que a segunda situação reduz ambiguidade.

Não é necessário chamar uma LLM real nesta POC.

---

# Lab

Apresentar uma situação semelhante a:

"Precisamos impedir clientes inelegíveis de receber determinada oferta."

Solicitar que o participante produza seu próprio:

Task Context Canvas.

Fornecer contexto fictício suficiente para que o exercício tenha resposta razoável.

A interface pode apresentar um template copiável.

Não é necessário armazenar o conteúdo do exercício no backend.

A evidência poderá ser enviada externamente pelo Google Form.

---

# Google Forms

Os Forms devem ser configurados externamente.

Não hardcode URLs dentro dos componentes.

Criar configuração semelhante a:

`src/data/forms.json`

Estrutura conceitual:

- módulo;
- baseline;
- evidence;
- reflection;
- opção de embed;
- parâmetros de prefill.

Suportar tanto:

- formulário incorporado;
- link externo.

A aplicação deve continuar funcional caso um formulário ainda não esteja configurado.

Nesse caso mostrar estado claro de configuração pendente, sem quebrar a página.

---

# participant_id

No primeiro acesso:

1. gerar identificador aleatório não pessoal;
2. armazenar em localStorage;
3. reutilizar em acessos posteriores.

O ID não deve conter nome, e-mail ou qualquer dado pessoal.

Exemplo conceitual:

`participant_a8fd92...`

Quando possível, permitir que este ID seja enviado como parâmetro pré-preenchido para Google Forms.

A configuração dos identificadores `entry.xxxxx` deve ser externa, pois depende dos Forms reais.

---

# Progresso

Utilizar localStorage.

Persistir:

- participantId;
- módulos iniciados;
- módulos concluídos;
- última atividade;
- percentual da fase.

Não tentar sincronizar progresso entre dispositivos.

Não solicitar login.

O progresso deve sobreviver a reload e fechamento do navegador.

Implementar uma pequena camada em `src/lib/progress.ts`.

Não espalhar chamadas diretas a localStorage pela aplicação.

---

# Maturity Map

Não implementar analytics corporativo real nesta POC.

Pode existir uma página ou seção explicando conceitualmente que os dados coletados pelos Forms futuramente alimentarão:

- percepção inicial;
- percepção final;
- capacidade percebida;
- score de evidência;
- principais gaps;
- recomendações de Dojo/Workshop.

Se houver dashboard visual na POC, utilizar dados explicitamente identificados como demonstrativos.

Nunca apresentar dados fake como dados reais.

---

# Content Model

Utilizar Content Collections e schema.

Um módulo deve possuir pelo menos:

- id;
- slug ou equivalente;
- title;
- description;
- phase;
- order;
- duration;
- status;
- objectives;
- prerequisites, opcional;
- forms, opcional.

Status possíveis:

- published
- draft
- coming-soon

Falhar no build caso conteúdo publicado viole o schema necessário.

---

# Curriculum

Manter a estrutura da jornada em JSON.

O arquivo deve definir:

- fases;
- ordem;
- títulos;
- descrições;
- estado;
- transformação esperada.

Evite duplicar desnecessariamente dados que já pertencem ao frontmatter dos módulos.

Faça uma decisão clara sobre qual fonte é responsável por cada informação.

Documente essa decisão em `architecture.md`.

---

# UX

A experiência deve ser:

- limpa;
- moderna;
- educacional;
- profissional;
- responsiva;
- acessível;
- sem excesso de elementos decorativos.

Não utilizar identidade visual de nenhuma empresa ou marca existente.

Esta POC é genérica.

Priorizar legibilidade.

Utilizar hierarquia visual forte.

A interface deve funcionar bem em desktop e mobile.

Usar CSS variables para tokens básicos:

- cores;
- spacing;
- typography;
- radius;
- content width.

Suportar `prefers-reduced-motion`.

Não depender de animações para comunicar estado.

Manter contraste adequado.

---

# Componentes sugeridos

Use apenas se fizerem sentido:

- Header
- PhaseCard
- ModuleCard
- ProgressBar
- LearningObjectiveList
- LearningSection
- FormEmbed
- ExternalFormCTA
- TaskContextCanvas
- StatusBadge
- ModuleNavigation

Não criar abstrações prematuras.

---

# Rotas conceituais

Preferencialmente:

`/`

`/fases/[phase]`

`/modulos/[slug]`

Opcional:

`/progresso`

Evite rotas desnecessárias.

---

# Out of Scope

Explicitamente NÃO implementar:

- autenticação;
- cadastro;
- SSO;
- usuários;
- backend;
- banco de dados;
- API própria;
- CMS;
- LMS;
- certificados;
- badges;
- gamificação complexa;
- gestão de cohorts;
- RBAC;
- notificações;
- e-mail;
- dashboard corporativo real;
- integração Google Sheets;
- avaliação automática por IA;
- chatbot;
- agente dentro do Hub;
- Fase 4 (contexto organizacional);
- conteúdo completo de todas as fases.

Se alguma dessas coisas parecer necessária durante a implementação, pare e procure uma solução mais simples que preserve o escopo.

---

# Critérios de aceite funcionais

A implementação só deve ser considerada concluída se:

1. a aplicação executar localmente;
2. o build estático concluir sem erro;
3. Home exibir as três fases;
4. Fase 1 permitir acesso ao currículo;
5. Fases 2 e 3 estiverem representadas;
6. Context Engineering possuir experiência completa;
7. módulos forem carregados a partir de conteúdo;
8. currículo estrutural vier de configuração;
9. nenhuma funcionalidade principal depender de backend;
10. integração com Forms for configurável;
11. ausência de Forms não quebrar a aplicação;
12. participantId persistir;
13. progresso persistir após reload;
14. módulo poder ser marcado como concluído;
15. progresso refletir conclusão;
16. aplicação funcionar em viewport mobile;
17. links internos não produzirem 404;
18. conteúdo publicado for validado por schema.

---

# Critérios arquiteturais

Verificar também:

- não existe conteúdo educacional significativo hardcoded em componentes;
- localStorage é acessado através de uma abstração;
- Google Forms é acessado através de configuração/helper;
- adicionar um novo módulo não exige criar uma página;
- componentes não conhecem detalhes específicos de Context Engineering quando deveriam ser genéricos;
- TypeScript não contém erros;
- build não contém erros;
- não existem warnings relevantes ignorados;
- não existem segredos ou credenciais no repositório.

---

# Testes

No mínimo executar:

- instalação limpa de dependências;
- typecheck/Astro check;
- build de produção.

Adicionar testes automatizados somente onde tenham retorno claro.

Priorizar testes de funções puras como:

- geração/recuperação do participantId;
- cálculo de progresso;
- geração da URL parametrizada do Google Form.

Um smoke test de navegação é desejável caso possa ser implementado sem aumentar significativamente a complexidade.

Não instalar uma suíte pesada apenas para satisfazer este requisito.

---

# Processo de implementação

Trabalhe em pequenos checkpoints.

Para cada task:

1. leia a spec relevante;
2. confirme dependências;
3. implemente;
4. execute validações relevantes;
5. revise o próprio diff;
6. corrija problemas;
7. atualize o estado da task;
8. continue.

Não declare uma task concluída apenas porque o código foi escrito.

Ela está concluída quando seu critério de aceite foi verificado.

---

# Task Graph inicial

Utilize como ponto de partida e ajuste no `tasks.md` quando necessário:

T01 — Bootstrap Astro
|
+-- T02 — Design tokens/layout base
|
+-- T03 — Curriculum model
|     |
|     +-- T06 — Home
|     +-- T07 — Phase page
|
+-- T04 — Content collection/schema
|     |
|     +-- T08 — Dynamic module page
|           |
|           +-- T09 — Context Engineering content
|
+-- T05 — Progress abstraction
      |
      +-- T10 — Progress UI

T08
 |
 +-- T11 — Google Forms integration

T09 + T11
 |
 +-- T12 — Complete learning journey

T06 + T07 + T10 + T12
 |
 +-- T13 — Responsive/accessibility pass
 |
 +-- T14 — Build/check/validation
 |
 +-- T15 — Final review/documentation

Identifique tarefas que podem ser realizadas em paralelo.

Não paralelize tarefas que alteram as mesmas superfícies sem necessidade.

---

# Definition of Done

A POC está concluída quando uma pessoa nova consegue:

1. abrir a URL;
2. compreender a proposta;
3. localizar a Fase 1;
4. abrir Context Engineering;
5. executar a experiência do início ao fim;
6. acessar os pontos de coleta;
7. marcar o módulo como concluído;
8. fechar a página;
9. retornar;
10. ainda visualizar seu progresso.

E quando um mantenedor consegue:

1. criar um novo Markdown de módulo;
2. configurar seus metadados;
3. executar o build;
4. obter automaticamente uma nova página do módulo.

---

# Documentação final

Atualize o `README.md` com:

- propósito;
- arquitetura;
- pré-requisitos;
- instalação;
- desenvolvimento;
- build;
- configuração dos Forms;
- estrutura de conteúdo;
- como adicionar um módulo;
- como adicionar uma fase;
- limitações da POC.

---

# Relatório final

Ao terminar, produza um resumo contendo:

## Implementado

Liste funcionalidades entregues.

## Decisões

Liste as principais decisões arquiteturais e razões.

## Validação

Informe explicitamente os comandos executados e resultados.

## Acceptance

Percorra os critérios de aceite e informe status.

## Débito / limitações

Liste apenas problemas reais restantes.

## Próximos passos

Sugira evoluções, mas não as implemente sem solicitação.

## Files changed

Liste os arquivos relevantes.

---

# Regra de autonomia

Você possui autonomia para tomar decisões técnicas locais que preservem a intenção, arquitetura e escopo.

Não precisa solicitar aprovação para escolhas triviais.

Se encontrar ambiguidade, escolha a alternativa:

1. mais simples;
2. mais reversível;
3. mais compatível com uma POC estática;
4. com menor quantidade de dependências.

Registre decisões relevantes em `architecture.md`.

Não amplie o escopo.

---

# North Star

A implementação deve demonstrar esta tese:

> Em uma experiência assíncrona curta, conseguimos ensinar um conceito de IA, estimular aplicação prática, coletar sinais de aprendizagem e criar as bases para observar evolução de maturidade — sem depender de um instrutor full-time.

E há uma segunda tese igualmente importante:

> O próprio AI Literacy Hub foi construído utilizando as práticas de especificação, decomposição, execução agentica, validação e engenharia AI-native que ele pretende ensinar.

Comece inspecionando o estado atual do repositório.

Depois produza/atualize Spec, Plan, Tasks e Acceptance.

Somente então inicie a implementação.