# Vision — AI Literacy Hub

## O que é

O AI Literacy Hub é uma POC de Learning Hub estático para letramento em Inteligência Artificial voltado a profissionais do ciclo de desenvolvimento de software (Devs, QAs, POs, TLs).

O programa completo é descrito em [product_vision.md](product_vision.md). Esta POC prova um recorte executável dessa visão: as três primeiras fases da jornada, com a Fase 1 (Fundamentos) navegável e um módulo (Context Engineering) completamente implementado do início ao fim.

## Duas teses

1. Em uma experiência assíncrona curta, é possível ensinar um conceito de IA, estimular aplicação prática, coletar sinais de aprendizagem e criar as bases para observar evolução de maturidade — sem depender de um instrutor full-time.
2. O próprio AI Literacy Hub deve ser construído utilizando as práticas de especificação, decomposição, execução agentica, validação e engenharia AI-native que ele pretende ensinar.

## Jornada da experiência

**Discover → Learn → Practice → Reflect → Evidence → Progress**

Um participante deve conseguir: entender a proposta, navegar pela jornada, completar o módulo de Context Engineering (conceito, demo, lab, evidência, reflexão), marcar o módulo como concluído e voltar depois mantendo o progresso no mesmo navegador.

## O que esta POC NÃO é

Ver "Scope guard" em [CLAUDE.md](../CLAUDE.md): não é LMS, CMS, plataforma de autenticação, sistema de analytics corporativo, sistema de avaliação por IA, portal institucional ou plataforma social. Fase 4 (contexto organizacional) está fora de escopo.

## North Star

> Se eu quiser adicionar amanhã um módulo chamado "MCP", preciso modificar a aplicação?

A resposta deve ser: não — apenas conteúdo (Markdown) e metadados/configuração (JSON). Se a resposta exigir mudanças de código além disso, a arquitetura está acoplada demais e deve ser revisada.

## Definition of Done da POC

Um participante novo consegue: abrir a URL, entender a proposta, localizar a Fase 1, abrir Context Engineering, executar a experiência do início ao fim, acessar os pontos de coleta (Forms), marcar o módulo como concluído, fechar e reabrir a página mantendo o progresso.

Um mantenedor consegue: criar um novo Markdown de módulo, configurar seus metadados, rodar o build, e obter automaticamente uma nova página de módulo — sem escrever código de interface.
