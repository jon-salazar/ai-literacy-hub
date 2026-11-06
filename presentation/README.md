# Apresentação — AI Literacy Hub POC

A apresentação foi movida para [`public/apresentacao/`](../public/apresentacao/index.html) e é publicada junto com o site em
<https://jon-salazar.github.io/ai-literacy-hub/apresentacao/>. A decisão está registrada em
[docs/adr/003-estrutura-site.md](../docs/adr/003-estrutura-site.md).

Este diretório existe apenas para não quebrar referências antigas (por exemplo, em `docs/presentation-brief.md`).

## Como abrir

- **Online:** acesse `/ai-literacy-hub/apresentacao/` no site publicado, ou em `npm run preview` /
  `npm run dev` (`http://localhost:4321/ai-literacy-hub/apresentacao/`).
- **Offline:** dê duplo clique em [`public/apresentacao/index.html`](../public/apresentacao/index.html). O arquivo é
  autocontido (CSS e JS inline, imagens em `assets/` com caminhos relativos) e não precisa de servidor, `npm install`
  nem internet.

## Atalhos de teclado

| Tecla | Ação |
|---|---|
| `→`, `Espaço`, `Page Down` | Próximo slide |
| `←`, `Page Up` | Slide anterior |
| `Home` | Primeiro slide |
| `End` | Último slide |
| `Esc` | Abrir/fechar visão geral (grade de todos os slides) |
| `N` | Mostrar/ocultar notas do apresentador do slide atual |

Também há botões `‹` `›` no canto inferior direito, para navegação por clique/toque.

## URL da POC (slide 6)

O botão "Abrir POC" é configurado em `PRESENTATION_CONFIG.pocUrl`, no início do `<script>` de
`public/apresentacao/index.html`:

- servida por HTTP(S) (site publicado ou preview local), aponta para o próprio Hub (`../`);
- aberta via `file://`, aponta para `http://localhost:4321/ai-literacy-hub/` (`npm run dev`);
- com valor `""`, o botão vira um aviso de configuração pendente — a apresentação nunca quebra por isso.

## Assets

`public/apresentacao/assets/*.png` são screenshots reais da POC (build de produção), não mockups. Se a aplicação mudar
significativamente, recapture: Fase 1, módulo Context Engineering (Demo e Lab) e Progresso.

## Observações

- Os dados de "Maturity Map" no screenshot de progresso são marcados como demonstrativos pela própria aplicação.
- O slide 11 ("Validado vs. hipótese") separa fatos técnicos verificados de hipóteses de aprendizagem ainda não
  testadas.
- A apresentação é um arquivo estático em `public/`: nenhuma rota de `src/pages/` depende dela, e ela não depende do
  build do Astro.
