# ADR 002 — Forms genéricos: 3 Google Forms para todos os módulos

- Status: aceito
- Data: 2026-11-06
- Frente: v0.2.0 / A (forms)

## Contexto

Na v0.1.0, `src/data/forms.json` tinha uma entrada por módulo com três formulários cada (11 × 3 = 33 Forms), todos com URL vazia. Manter 33 Google Forms é caro, e cada módulo novo exigiria criar mais três Forms e editar o JSON — contrariando o teste arquitetural do projeto ("adicionar um módulo deve ser só conteúdo/configuração").

## Decisão

- `forms.json` passa a ter um bloco `defaults` com os 3 formulários (`baseline`, `evidence`, `reflection`), cada um com `url`, `embed`, `prefillParticipantIdField` e `prefillModuleIdField`, e um bloco opcional `overrides` indexado pelo id do módulo, que sobrescreve campos de uma etapa.
- `getFormConfig(moduleId, kind)` mantém a assinatura; resolve default + override (função pura `resolveFormConfig`) e devolve a config com `kind` e `moduleId`.
- `buildFormUrl` pré-preenche `participant_id` e `module_id` (campos ocultos dos Forms) via `entry.*`. O id do módulo vai no link já no HTML estático; o `participantId` é adicionado no cliente.
- Um aviso curto de privacidade (LGPD) aparece junto a todo formulário configurado.

## Consequências

- O ciclo baseline/evidência/reflexão funciona com 3 Forms; módulos novos (ex.: Fase 2) funcionam sem entrada no JSON.
- As respostas de todos os módulos ficam na mesma planilha por etapa; a análise filtra pela coluna `module_id`.
- Perguntas específicas por módulo precisam ser genéricas ou organizadas em seções no Form; quando isso não bastar, `overrides` permite um Form dedicado sem mudar código.
- Formato do JSON incompatível com o da v0.1.0 (não havia URLs configuradas, então não há migração de dados).
