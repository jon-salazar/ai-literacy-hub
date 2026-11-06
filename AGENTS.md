AI Literacy Hub

## Mission

Construir e evoluir o AI Literacy Hub como uma aplicação estática, content-first e simples de manter.

O projeto também deve servir como exemplo prático de AI-Native Software Engineering.

---

## Working model

Toda mudança não trivial deve seguir:

**Understand → Spec → Plan → Implement → Validate → Review**

Nunca trate geração de código como definição de conclusão.

---

## Product principles

1. Async-first.
2. Content-first.
3. Static-first.
4. Learning by doing.
5. Evidence over completion.
6. Concepts over tools.
7. Simplicity over infrastructure.
8. Configuration over hardcoding.
9. Progressive enhancement.
10. No unnecessary backend.

---

## Scope guard

A POC NÃO é:

- LMS;
- CMS;
- plataforma de autenticação;
- sistema de analytics corporativo;
- sistema de avaliação por IA;
- portal institucional;
- plataforma social.

Não adicione funcionalidades dessas categorias sem uma mudança explícita de escopo.

---

## Technology

Preferir:

- Astro;
- TypeScript;
- Markdown;
- JSON;
- Astro Content Collections;
- browser APIs;
- CSS nativo.

Evitar dependências quando a plataforma já resolver adequadamente o problema.

---

## Content

Conteúdo educacional deve viver fora dos componentes.

Módulos devem ser representados através de conteúdo estruturado e metadados.

Não criar componentes específicos para um módulo quando um componente genérico puder representar a mesma experiência.

Novo módulo deve exigir prioritariamente:

1. novo arquivo de conteúdo;
2. metadados válidos;
3. configuração opcional de formulário.

Não deve exigir uma nova página.

---

## State

Não existe conta de usuário.

Estado local permitido:

- participantId;
- módulos iniciados;
- módulos concluídos;
- timestamps;
- progresso derivado.

Encapsular acesso ao localStorage.

Nunca armazenar dados pessoais.

---

## External data collection

Google Forms é a fronteira de coleta da POC.

URLs e parâmetros devem ser configuráveis.

Nenhuma URL de Form deve existir espalhada em componentes.

Nunca armazenar credenciais.

---

## Privacy

O `participantId` é:

- aleatório;
- pseudônimo;
- gerado no cliente;
- persistido localmente.

Não derivar o ID de:

- nome;
- e-mail;
- matrícula;
- telefone;
- endereço;
- qualquer dado pessoal.

---

## Architecture

Responsabilidades devem permanecer separadas:

### Content

O que será ensinado.

### Curriculum

Como a jornada está organizada.

### Components

Como a informação é apresentada.

### State

O que é lembrado localmente.

### Forms

Como o participante sai do Hub para registrar dados.

Evitar dependências circulares entre essas responsabilidades.

---

## Implementation style

Prefira:

- pequenas funções;
- tipos explícitos;
- componentes focados;
- nomes descritivos;
- HTML semântico;
- CSS previsível.

Evite:

- abstrações genéricas prematuras;
- grandes componentes;
- magic strings;
- estado global sem necessidade;
- duplicação de regras;
- efeitos colaterais espalhados.

---

## Accessibility

Toda nova experiência deve considerar:

- teclado;
- foco;
- contraste;
- labels;
- HTML semântico;
- mobile;
- prefers-reduced-motion.

Interação não pode depender exclusivamente de cor.

---

## Validation

Antes de considerar trabalho concluído:

1. execute os checks disponíveis;
2. execute o build;
3. revise o diff;
4. compare com os critérios de aceite;
5. verifique regressões óbvias.

Corrija falhas antes de avançar.

---

## Content validation

Conteúdo publicado deve ser validado por schema.

Build quebrado por conteúdo inválido é preferível a conteúdo inválido silencioso em produção.

---

## Decision policy

Quando houver mais de uma solução válida, prefira nesta ordem:

1. menor complexidade;
2. menor acoplamento;
3. menos dependências;
4. solução mais reversível;
5. melhor legibilidade;
6. melhor capacidade de evolução.

---

## Documentation

Decisões arquiteturais relevantes devem ser registradas.

README deve representar o estado atual do projeto.

Não documentar funcionalidades planejadas como se já estivessem implementadas.

---

## Completion

Não afirme:

"Concluído."

sem possuir evidência objetiva.

Ao finalizar uma execução, reporte:

- o que mudou;
- o que foi validado;
- o que falhou;
- o que permanece;
- quais decisões foram tomadas.

---

## Core architectural test

Pergunte frequentemente:

> Se eu quiser adicionar amanhã um módulo chamado "MCP", preciso modificar a aplicação?

Se a resposta for muito além de "adicionar conteúdo/configuração", investigue se a arquitetura está excessivamente acoplada.

---

## POC North Star

Uma pessoa deve conseguir aprender Context Engineering do início ao fim sem instrutor.

Um mantenedor deve conseguir adicionar conteúdo sem desenvolver uma nova feature.