# Acceptance — 001 Learning Hub POC

Verificado em 2026-09-02 via `astro check`, `astro build`, `vitest run` e navegação real no browser (dev server). Atualizado na mesma data após expansão da Fase 1 para conteúdo completo (11/11 módulos `published`).

## Critérios funcionais

1. ✅ A aplicação executa localmente (`npm run dev`, testado via preview).
2. ✅ O build estático conclui sem erro (`astro build` — 16 páginas geradas, incluindo os 11 módulos da Fase 1).
3. ✅ Home exibe as três fases (verificado via navegação).
4. ✅ Fase 1 permite acesso ao currículo (`/fases/foundations` lista 11 módulos, todos `published`).
5. ✅ Fases 2 e 3 estão representadas — `/fases/agentic-ai` e `/fases/ai-native-engineering` geradas com estado "Em breve", sem link quebrado.
6. ✅ Context Engineering possui experiência completa — todas as 9 seções do learning-model renderizadas e verificadas via `get_page_text`. Os outros 10 módulos da Fase 1 também têm experiência completa (introdução, objetivos, baseline, conceito, demo, lab, evidência, reflexão, conclusão), verificados por amostragem (Tools) via `get_page_text`.
7. ✅ Módulos carregados a partir de Content Collection (`src/content/modules/*.md`), não hardcoded.
8. ✅ Currículo estrutural vem de `src/data/curriculum.json`.
9. ✅ Nenhuma funcionalidade principal depende de backend (site 100% estático).
10. ✅ Integração com Forms configurável via `src/data/forms.json`.
11. ✅ Ausência de Forms não quebra a aplicação — verificado com `forms.json` sem URLs preenchidas; seções mostram "configuração pendente".
12. ✅ `participantId` persiste entre sessões — mesmo ID após reload (`participant_4184257c9a53`).
13. ✅ Progresso persiste após reload — testado marcando módulo concluído e recarregando a página.
14. ✅ Módulo pode ser marcado como concluído — botão testado via clique real no browser.
15. ✅ Progresso reflete conclusão — fase mostrou 100%, `/progresso` mostrou módulo concluído.
16. ✅ Aplicação funciona em viewport mobile — testado em 375×812, sem overflow horizontal (`scrollWidth === innerWidth`).
17. ✅ Links internos não produzem 404 — navegação Home → Fase → Módulo → volta testada.
18. ✅ Conteúdo publicado validado por schema — testado removendo `keyMessage` propositalmente: build falhou com erro claro (`InvalidContentEntryDataError`); revertido e build voltou a passar.

## Critérios arquiteturais

- ✅ Não existe conteúdo educacional significativo hardcoded em componentes (todo o texto de Context Engineering vive em `context-engineering.md`).
- ✅ `localStorage` é acessado apenas através de `src/lib/progress.ts`.
- ✅ Google Forms é acessado apenas através de `src/data/forms.json` + `src/lib/forms.ts`.
- ✅ Adicionar um novo módulo não exige criar uma página — comprovado adicionando 10 módulos `coming-soon` sem tocar em `src/pages/`.
- ✅ Componentes de apresentação não conhecem detalhes específicos de Context Engineering (LearningSection, TaskContextCanvas, FormEmbed etc. são genéricos).
- ✅ TypeScript sem erros: `astro check` → 0 errors, 0 warnings.
- ✅ Build sem erros.
- ✅ Não existem segredos ou credenciais no repositório (`forms.json` só tem URLs vazias de exemplo).

## Definition of Done (jornada ponta a ponta)

- [x] Participante: abrir URL → entender proposta → localizar Fase 1 → abrir Context Engineering → executar experiência completa → acessar pontos de coleta → marcar módulo concluído → fechar → reabrir → progresso mantido. **Verificado.**
- [x] Mantenedor: criar novo Markdown de módulo → configurar metadados → rodar build → nova página de módulo aparece automaticamente. **Verificado** (10 módulos coming-soon criados só com arquivos de conteúdo).
