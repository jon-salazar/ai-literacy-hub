# ADR 004 — Progresso: exportar, importar, recomeçar e dados do Maturity Map

- Status: aceito
- Data: 2026-11-06
- Frente: D (v0.2.0)

## Contexto

O progresso vive só no `localStorage` (chave `ai-literacy-hub:progress:v1`), sem conta nem backend. Isso deixa o
participante preso a um navegador: trocar de máquina, limpar dados do site ou usar uma janela anônima perde o
progresso. Também não havia como recomeçar do zero. O Maturity Map da página `/progresso` tinha dados fixos no HTML.

## Decisões

### 1. Exportar como JSON versionado

`exportProgress()` gera:

```json
{ "version": 1, "exportedAt": "<ISO 8601>", "progress": { "participantId": "participant_…", "modules": { "<moduleId>": { "startedAt": "<ISO>", "completedAt": "<ISO> | null" } } } }
```

O download é feito no cliente (`Blob` + `<a download>`), sem servidor. `version` permite evoluir o formato; uma
mudança incompatível incrementa `EXPORT_VERSION` e o import rejeita versões desconhecidas.

### 2. Importar mescla, não substitui

- O arquivo é validado por inteiro antes de qualquer escrita (`parseProgressExport`): JSON válido, `version`
  suportada, datas ISO, `participantId` no formato `participant_…`, ids de módulo `^[a-z0-9][a-z0-9-]*$` (o que
  também bloqueia chaves como `__proto__`), e no máximo 100 KB. Arquivo inválido retorna uma mensagem de erro e
  **não altera** o estado atual.
- A mescla mantém o **`participantId` atual** do navegador. O id do arquivo é ignorado: o navegador já tem uma
  identidade pseudônima e trocá-la silenciosamente quebraria a ligação com respostas já enviadas aos Forms.
- Por módulo, fica a **data de início mais antiga** e a **data de conclusão mais recente**. Uma conclusão nunca é
  desfeita por um import.
- Mesclar foi preferido a substituir porque é seguro por padrão: importar um arquivo antigo não apaga trabalho
  feito depois. Quem quiser "substituir" pode recomeçar e então importar.
- Não há validação dos ids contra o currículo: `progress.ts` (State) não depende de Curriculum. Ids desconhecidos
  são mantidos e simplesmente não contam no progresso de nenhuma fase.

### 3. Recomeçar gera novo `participantId`

`resetProgress()` apaga todos os módulos e gera um **novo** `participantId`. Recomeçar é tratado como "nova
participação": desvincula o navegador das respostas anteriores nos Forms (bom para computador compartilhado e para
privacidade). A UI exige confirmação explícita em um `<dialog>` modal com foco inicial em "Cancelar"; `Esc` cancela.

### 4. Notificação da página

Import e reset disparam o evento `PROGRESS_CHANGED_EVENT` em `document`; o resumo da página `/progresso` se
re-renderiza ao recebê-lo. Componentes continuam sem acessar `localStorage` diretamente.

### 5. Maturity Map lido de `src/data/maturity.json`

Formato (validado por `parseMaturityData` em `src/lib/maturity.ts`; dado inválido **quebra o build**):

| Campo | Tipo | Regra |
| --- | --- | --- |
| `demo` | boolean | `true` mostra o selo "Dados demonstrativos" e textos de exemplo |
| `updatedAt` | string | data ISO (`YYYY-MM-DD` ou timestamp) da última agregação |
| `competencies` | `{ id, label, score }[]` | `id` em kebab-case e único; `label` não vazio; `score` numérico de **1 a 5** |
| `nextIntervention` | string \| null | próxima intervenção sugerida; `null` oculta a linha |

Na v0.3 este arquivo será gerado a partir de dados reais **agregados** (nunca por participante). Basta trocar o
conteúdo e definir `demo: false`; a página não precisa mudar.

## Consequências

- O participante pode levar o progresso entre navegadores sem backend nem conta.
- O arquivo exportado contém o `participantId` pseudônimo e timestamps; nenhum dado pessoal.
- A UI usa prefixo textual ("✔ Sucesso:" / "✖ Erro:") em região `role="status"`, sem depender só de cor.
- Mudanças de formato exigem incrementar `EXPORT_VERSION` e, se desejado, um conversor da versão anterior.
