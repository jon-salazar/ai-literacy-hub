# Presentation Brief — AI Literacy Hub POC

## Purpose

Este documento define a narrativa, objetivos, estrutura, critérios e requisitos técnicos para criação do material de apresentação da POC do **AI Literacy Hub**.

Ele deve ser utilizado como fonte de contexto por agentes responsáveis por criar a apresentação final da POC.

A apresentação final deve ser entregue como um **artefato HTML estático independente**, executável diretamente em navegador.

Este documento não substitui:

- `docs/product-vision.md`;
- `docs/architecture.md`;
- `docs/learning-model.md`;
- `specs/001-learning-hub-poc/spec.md`;
- critérios técnicos ou arquiteturais existentes.

Para entender o produto, consulte esses documentos.

Para criar o material de apresentação, este arquivo é a principal fonte de direção narrativa e de entrega.

---

# 1. Objetivo da apresentação

A apresentação deve demonstrar que é possível criar uma iniciativa de Letramento de IA que seja:

- majoritariamente assíncrona;
- prática;
- escalável;
- mensurável;
- simples de distribuir;
- capaz de gerar sinais de evolução;
- capaz de direcionar futuras intervenções síncronas.

A POC não deve ser apresentada apenas como:

> "Criamos um site de treinamento."

A mensagem principal deve ser:

> **Criamos um experimento de aprendizagem que conecta conteúdo, prática e sinais de evolução em uma experiência assíncrona.**

O Learning Hub é a interface visível dessa proposta.

---

# 2. Deliverable técnico da apresentação

A apresentação final NÃO deve ser implementada dentro da aplicação da POC.

Ela deve ser um artefato independente.

## Formato obrigatório

Entregar uma apresentação em:

**HTML estático executável**

Preferencialmente com:

```text
presentation/
├── index.html
├── assets/
│   ├── images/
│   └── ...
└── README.md        opcional
```

Também é aceitável produzir um único:

```text
presentation.html
```

caso todos os assets possam ser incorporados adequadamente.

---

# 3. Independência da POC

A apresentação e a POC possuem responsabilidades diferentes.

## POC

É o produto demonstrado.

Responsável por:

- Learning Hub;
- conteúdo;
- currículo;
- experiência do participante;
- Baseline;
- Evidence;
- Reflection;
- progresso.

## Presentation HTML

É o material utilizado para contar a história da POC.

Responsável por:

- narrativa;
- slides;
- diagramas;
- screenshots;
- mensagens executivas;
- roteiro da demonstração;
- próximos passos.

O HTML da apresentação NÃO deve reutilizar a arquitetura da aplicação apenas por conveniência.

Não adicionar:

- rota `/presentation`;
- página Astro da apresentação;
- dependência da POC em runtime;
- componentes da apresentação dentro da aplicação principal.

A apresentação deve permanecer executável mesmo que o servidor da POC não esteja rodando.

---

# 4. Requisitos de execução

O artefato deve funcionar ao abrir localmente o arquivo HTML em um navegador moderno.

Objetivo:

```text
double click
    ↓
index.html
    ↓
browser
    ↓
presentation ready
```

Idealmente não deve exigir:

- `npm install`;
- `npm run dev`;
- servidor HTTP;
- backend;
- banco;
- conexão com a POC;
- autenticação;
- acesso à internet.

Caso alguma limitação técnica do navegador impeça funcionamento adequado via `file://`, utilizar a solução estática mais simples possível e documentar claramente a necessidade.

Mas a preferência é:

> **abrir o arquivo e apresentar.**

---

# 5. Dependências

Evitar dependências externas em runtime.

Preferir:

- HTML;
- CSS;
- JavaScript nativo;
- assets locais.

Bibliotecas podem ser utilizadas durante a geração se ajudarem, mas o resultado final deve ser autocontido ou incluir suas dependências localmente.

Não depender de:

- CDN;
- Google Fonts remoto;
- APIs externas;
- frameworks carregados pela internet;
- serviços externos.

A apresentação deve continuar utilizável offline.

---

# 6. Assets

Screenshots reais da POC devem ser copiados para o diretório da apresentação.

Exemplo:

```text
presentation/
├── index.html
└── assets/
    ├── home.png
    ├── phase-1.png
    ├── context-engineering.png
    ├── lab.png
    └── progress.png
```

A apresentação não deve buscar screenshots diretamente da aplicação em runtime.

Se screenshots ainda não existirem, o agente deve verificar se consegue gerar os assets a partir da POC.

Não criar mockups artificiais quando a interface real puder ser utilizada.

---

# 7. Navegação da apresentação

O HTML deve se comportar como uma apresentação de slides.

Suportar preferencialmente:

- ArrowRight → próximo slide;
- ArrowLeft → slide anterior;
- Space → próximo slide;
- Home → primeiro slide;
- End → último slide;
- Escape → overview, caso exista;
- clique ou controles visíveis em mobile.

O número do slide ou algum indicador de progresso é desejável.

Exemplo:

```text
07 / 12
```

---

# 8. Responsividade

A apresentação deve funcionar principalmente em:

- notebook;
- desktop;
- projetor;
- compartilhamento de tela.

Também deve permanecer legível em mobile, embora mobile não seja o principal formato de apresentação.

Evitar layouts que dependam de uma resolução exata.

---

# 9. Resolução e aspecto visual

Projetar preferencialmente para proporção:

**16:9**

Mas utilizar layout responsivo.

A apresentação deve ocupar adequadamente a viewport e preservar:

- margens;
- hierarquia;
- legibilidade;
- espaçamento.

---

# 10. Print / PDF friendliness

Embora o deliverable principal seja HTML, é desejável que o CSS possua regras de impressão razoáveis.

Quando possível:

```css
@media print
```

deve:

- imprimir um slide por página;
- remover controles de navegação;
- evitar cortes inadequados;
- preservar screenshots e diagramas.

Isso é desejável, não obrigatório para a POC.

---

# 11. Semântica de slides

O HTML deve possuir uma estrutura clara.

Exemplo conceitual:

```html
<main class="presentation">
  <section class="slide">
    ...
  </section>

  <section class="slide">
    ...
  </section>
</main>
```

Evitar gerar uma aplicação SPA complexa sem necessidade.

A apresentação deve permanecer fácil de editar.

---

# 12. Design

A direção visual deve ser:

- limpa;
- moderna;
- minimalista;
- profissional;
- tecnológica sem estética futurista excessiva;
- forte hierarquia;
- pouca quantidade de texto por slide.

Evitar:

- grandes blocos de texto;
- excesso de ícones;
- ilustrações genéricas de robôs;
- imagens clichês de cérebro com circuitos;
- estética "AI neon";
- animações excessivas.

Preferir:

- diagramas;
- progressões;
- loops;
- cards;
- screenshots reais;
- comparações;
- fluxos simples.

---

# 13. Animações

Animações são opcionais.

Se utilizadas:

- devem ser sutis;
- não podem ser necessárias para compreensão;
- devem respeitar `prefers-reduced-motion`;
- não devem atrasar a apresentação.

Não construir uma experiência cinematográfica.

O foco é clareza.

---

# 14. Speaker notes

Caso seja útil, incluir speaker notes no próprio HTML de maneira que não interfira no modo de apresentação.

Podem existir como:

- comentários estruturados;
- elementos ocultos;
- atributo `data-notes`;
- arquivo separado.

Exemplo conceitual:

```html
<section
  class="slide"
  data-notes="Explique aqui a diferença entre Hub e Learning Loop."
>
```

Speaker notes não devem aparecer para a audiência por padrão.

---

# 15. Roteiro de demo

A apresentação deve conter um ponto explícito onde a apresentação HTML dá lugar à demonstração da POC.

Exemplo:

```text
Slide 6
"Vamos experimentar como participante"
          ↓
abrir POC
          ↓
demo de 3–5 minutos
          ↓
retornar ao HTML
          ↓
Slide 7
```

O HTML não deve tentar incorporar toda a POC em um iframe como mecanismo principal da demo.

A demonstração real deve permanecer uma experiência separada.

Um link ou botão:

**Abrir POC**

pode existir, desde que seja facilmente configurável.

---

# 16. Link da POC

Não hardcode uma URL não conhecida.

Criar configuração simples dentro do HTML/JS ou arquivo de configuração local.

Exemplo conceitual:

```js
const PRESENTATION_CONFIG = {
  pocUrl: "..."
};
```

Caso nenhuma URL esteja configurada:

- esconder CTA;
ou
- apresentar estado claro.

Não quebrar a apresentação.

---

# 17. Contexto do problema

A iniciativa nasce de um desafio organizacional.

Existe necessidade de aumentar a maturidade das pessoas no uso de IA aplicada ao desenvolvimento de software.

O público é heterogêneo e pode incluir:

- Devs;
- QAs;
- POs;
- Tech Leads;
- arquitetos;
- profissionais de dados;
- gestores;
- outros papéis do ciclo de desenvolvimento de software.

Os níveis de familiaridade com IA também variam significativamente.

Ao mesmo tempo, não existe necessariamente disponibilidade de uma pessoa dedicada full-time para:

- ministrar treinamentos;
- acompanhar todos os participantes;
- produzir constantemente novas aulas;
- responder individualmente a dúvidas;
- acompanhar evolução manualmente.

Por isso, o programa precisa ser desenhado como:

**Async-first + Sync-on-demand**

A maior parte da experiência precisa funcionar sem instrutor.

Os momentos síncronos devem ser utilizados de forma estratégica para:

- Dojos;
- Workshops;
- Clinics;
- discussões;
- aprofundamentos;
- gaps observados no programa.

---

# 18. Visão maior do programa

A POC faz parte de uma visão maior chamada:

# Letramento de IA

O objetivo da iniciativa não é apenas ensinar ferramentas.

O objetivo é criar uma evolução de maturidade:

**Entender → Usar → Delegar → Orquestrar → Projetar workflows → Operar IA como parte da engenharia**

A trilha proposta possui três fases genéricas principais:

## Fase 1 — Fundamentos & Uso Consciente

Pergunta:

> Como essas tecnologias funcionam e como trabalhar bem com elas?

Transformação:

**Usuário casual → usuário consciente e competente**

## Fase 2 — Agentic AI & Orquestração

Pergunta:

> Como fazer IA executar trabalho, e não apenas responder perguntas?

Transformação:

**Usuário → operador de agentes e workflows**

## Fase 3 — AI-Native Software Engineering

Pergunta:

> Como redesenhar o processo de engenharia de software considerando IA como parte do sistema de desenvolvimento?

Transformação:

**Operador → designer de workflows AI-native**

Existe também uma possível quarta fase específica de contexto organizacional:

**AI Engineering no contexto organizacional**

Essa fase está fora do escopo da POC atual.

---

# 19. Hipótese testada pela POC

A POC foi criada para testar:

> **É possível ensinar um conceito relevante de IA através de uma experiência curta e assíncrona, estimular aplicação prática e coletar sinais suficientes para observar evolução e identificar gaps?**

A POC não tenta provar toda a visão do programa.

Ela testa um vertical slice da arquitetura.

---

# 20. Jornada demonstrada

**Discover**

↓

**Baseline**

↓

**Learn**

↓

**Demo**

↓

**Practice**

↓

**Evidence**

↓

**Reflection**

↓

**Learning Signals**

↓

**Future Intervention**

---

# 21. Módulo utilizado na POC

O módulo implementado é:

# Context Engineering

Mensagem central:

> **O prompt descreve o que queremos. O contexto fornece aquilo que a IA precisa saber para executar bem.**

O módulo introduz o:

# Task Context Canvas

Com:

- Objective;
- Context;
- Artifacts;
- Constraints;
- Acceptance Criteria.

---

# 22. Learning Signals

A POC foi concebida para produzir três sinais.

## Perception

> Eu acho que sei.

## Knowledge

> Eu consigo reconhecer ou explicar.

## Application

> Eu consigo fazer.

Destacar:

> **Application > Completion**

---

# 23. Learning Loop

Os dados não devem existir apenas para dashboards.

Eles devem direcionar o programa.

**Participants**

↓

**Learning**

↓

**Evidence**

↓

**Signals**

↓

**Gap identification**

↓

**Dojo / Workshop / Clinic**

↓

**New learning**

---

# 24. Segunda tese: como construímos a POC

O próprio Learning Hub foi construído utilizando práticas que o programa pretende ensinar.

O processo seguiu:

**Intent**

↓

**Product Vision**

↓

**Spec**

↓

**Plan**

↓

**Tasks**

↓

**Agentic Implementation**

↓

**Acceptance Criteria**

↓

**Validation**

O desenvolvimento foi delegado para Coding Agent através de contexto explícito e documentação versionada.

---

# 25. Dogfooding

A POC é simultaneamente:

1. um experimento de aprendizagem;
2. um experimento de AI-Native Software Engineering.

Mensagem:

> **Construímos o produto utilizando as práticas que queremos ensinar através dele.**

---

# 26. Papel da IA na construção

Evitar:

> "A IA criou o sistema."

Preferir:

> **A intenção, arquitetura, contexto, especificações e critérios foram estruturados para permitir que um Coding Agent executasse grande parte da implementação de forma autônoma.**

Humano:

- intenção;
- contexto;
- arquitetura;
- decisões;
- restrições;
- validação.

Agente:

- exploração;
- implementação;
- execução de tarefas;
- testes;
- iteração.

---

# 27. Vibe Coding

Pode ser usada a provocação:

> **Vibe coding não precisa significar desenvolvimento sem engenharia.**

Mensagem complementar:

> **Não eliminamos engenharia para ganhar velocidade. Usamos engenharia para delegar melhor.**

---

# 28. Narrativa recomendada

## 1 — Problema

Como escalar letramento em IA sem depender de instrutor full-time?

## 2 — Hipótese

Async-first + Learning by doing.

## 3 — Modelo

Learn → Practice → Evidence → Signals → Intervention.

## 4 — Visão

Três fases de evolução.

## 5 — Experimento

Context Engineering como vertical slice.

## 6 — Demo

Mostrar a POC real.

## 7 — Medição

Perception + Knowledge + Application.

## 8 — Learning Loop

Sinais direcionando intervenções.

## 9 — Arquitetura

Uma solução propositalmente simples.

## 10 — Dogfooding

Como o Coding Agent foi utilizado.

## 11 — Validado vs hipótese

Separação clara.

## 12 — Próximo experimento

Pilotar com pessoas.

---

# 29. Estrutura sugerida dos slides

Criar aproximadamente 8–12 slides.

### Slide 1 — AI Literacy Hub

**Uma POC de aprendizagem async-first para evolução da maturidade em IA**

### Slide 2 — O desafio

**Como escalar letramento em IA sem depender de um instrutor full-time?**

### Slide 3 — A hipótese

**Async-first + Learning by doing**

Learn → Practice → Evidence → Signals.

### Slide 4 — A visão

1. Fundamentos & Uso Consciente
2. Agentic AI & Orquestração
3. AI-Native Software Engineering

**Entender → Delegar → Projetar**

### Slide 5 — O vertical slice

Context Engineering

Baseline → Conteúdo → Demo → Lab → Evidence → Reflection.

### Slide 6 — Demo

**Vamos experimentar como participante.**

Usar como transição para a aplicação real.

### Slide 7 — O que estamos medindo

Perception

Knowledge

Application

**Application > Completion**

### Slide 8 — Learning Loop

Learning → Evidence → Signals → Gaps → Intervention → Learning.

### Slide 9 — Arquitetura da POC

Markdown + JSON → Static Hub → Google Forms → Analytics futuro.

### Slide 10 — Como construímos

Vision → Spec → Plan → Tasks → Codex → Validation.

### Slide 11 — O que foi validado

Separar:

- fatos técnicos;
- hipóteses de aprendizagem.

### Slide 12 — Próximo experimento

Pilotar com grupo pequeno e aprender com dados reais.

Fechamento:

> **O próximo passo não é construir mais plataforma. É gerar evidência de aprendizagem.**

---

# 30. Resultados reais

Antes de criar a apresentação, inspecionar o projeto.

Utilizar apenas evidências encontradas.

Nunca inventar:

- participantes;
- ganho percentual;
- tempo economizado;
- scores;
- produtividade.

Dados hipotéticos devem estar claramente identificados.

---

# 31. Deliverables esperados

O agente deve produzir:

```text
presentation/
├── index.html
├── assets/
│   └── ...
└── README.md
```

O `README.md` deve informar apenas o necessário:

- como abrir a apresentação;
- atalhos;
- configuração opcional da URL da POC;
- observações relevantes.

A apresentação final deve possuir:

1. narrativa completa;
2. 8–12 slides;
3. navegação por teclado;
4. indicação visual do progresso;
5. screenshots reais quando disponíveis;
6. ponto claro de entrada na demo;
7. roteiro implícito ou speaker notes;
8. próximo experimento;
9. distinção clara entre evidência e hipótese.

---

# 32. Acceptance Criteria da apresentação

A tarefa está concluída somente se:

- `index.html` abre corretamente;
- apresentação funciona sem servidor;
- apresentação funciona offline;
- nenhuma dependência remota é obrigatória;
- setas avançam e retornam slides;
- apresentação funciona em 16:9;
- conteúdo permanece legível em diferentes resoluções;
- screenshots carregam através de paths relativos;
- nenhuma funcionalidade depende da POC estar executando;
- URL da POC é configurável;
- ausência de URL da POC não quebra o HTML;
- `prefers-reduced-motion` é respeitado;
- conteúdo diferencia resultados reais de hipóteses;
- narrativa corresponde aos documentos do projeto;
- artefato não altera a implementação do Hub.

---

# 33. Definition of Done

A apresentação está pronta quando alguém consegue:

1. copiar o diretório `presentation/`;
2. abrir `index.html`;
3. entrar imediatamente em modo de apresentação;
4. navegar apenas com teclado;
5. conduzir toda a narrativa;
6. abrir a POC separadamente durante a demo;
7. retornar à apresentação;
8. continuar até o fechamento;

sem precisar executar qualquer comando de desenvolvimento.

---

# 34. Source priority

Em caso de conflito:

## Visão

`docs/product-vision.md`

## Escopo da POC

`specs/001-learning-hub-poc/spec.md`

## Arquitetura

`docs/architecture.md`

## Apresentação

`docs/presentation-brief.md`

---

# 35. Final principle

O produto final desta tarefa é:

> **uma apresentação executável e portátil sobre a POC.**

Não é:

- uma nova feature do Hub;
- uma rota;
- uma versão alternativa da aplicação;
- um segundo Learning Hub.

A apresentação conta a história.

A POC demonstra o produto.

Os dois artefatos devem permanecer independentes.

A tese central continua sendo:

> **Podemos criar um sistema de aprendizagem de IA escalável, predominantemente assíncrono e orientado por evidências, começando pequeno e usando os próprios sinais dos participantes para decidir como evoluir.**