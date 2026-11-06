# ADR 003 — Estrutura do site: 404, metadados de compartilhamento e apresentação publicada

- **Status:** aceito
- **Data:** 2026-11-06
- **Frente:** C (v0.2.0)

## Contexto

O Hub é publicado no GitHub Pages como project site (`https://jon-salazar.github.io/ai-literacy-hub/`, `base`
`/ai-literacy-hub`). Na v0.1.0 faltavam: uma página 404 própria (o Pages mostrava a 404 genérica do GitHub), metadados
para compartilhamento de links e a publicação da apresentação da POC, que só existia como arquivo local em
`presentation/`.

## Decisões

### 1. Página 404 em `src/pages/404.astro`

O Astro gera `dist/404.html`, que o GitHub Pages serve automaticamente para qualquer caminho inexistente — inclusive
aninhado (`/ai-literacy-hub/a/b/c`). Como a URL do navegador é a do caminho pedido, **todo link e recurso da página é
absoluto com o base** (`withBase()`; CSS do Astro já sai como `/ai-literacy-hub/_astro/...`). O link "Ver o currículo"
usa a primeira fase de `curriculum.json` em vez de um slug fixo. A página recebe `noindex` e não declara canonical.

### 2. Metadados no `BaseLayout`

Todas as páginas ganham `theme-color`, `<link rel="canonical">`, Open Graph (`og:title`, `og:description`, `og:url`,
`og:image` com dimensões e `alt`, `og:locale=pt_BR`, `og:site_name`, `og:type`) e Twitter card `summary_large_image`.
URLs absolutas são montadas com `new URL(Astro.url.pathname, Astro.site)` — `Astro.url.pathname` já inclui o base,
então não há duplicação de `/ai-literacy-hub`. Uma prop opcional `noindex` desliga canonical/`og:url`.

### 3. Imagem de compartilhamento estática

`public/og-image.png` (1200×630) foi gerada uma única vez a partir de um HTML simples com as cores do site, renderizado
pelo Chrome headless local (`--headless=new --window-size=1200,630 --screenshot=...`). Nenhuma dependência nova no
projeto; regenerar é manual e raro. Alternativa descartada: SVG como `og:image` — vários consumidores (redes sociais,
mensageiros) não renderizam SVG.

### 4. Apresentação publicada em `/ai-literacy-hub/apresentacao/`

`presentation/index.html` e os assets usados foram **movidos** (não copiados) para `public/apresentacao/`. O arquivo
continua autocontido e com caminhos relativos (`assets/*.png`), então funciona igualmente:

- servido pelo site (Pages, `npm run preview`, `npm run dev`);
- aberto offline via `file://`.

`presentation/` passa a conter apenas um `README.md` apontando para o novo local. Mover em vez de copiar evita duas
fontes de verdade que divergiriam. `presentation/assets/home.png`, não referenciado por nenhum slide, foi removido.

O CTA "Abrir POC" (slide 6) agora deriva a URL: servido por HTTP(S) aponta para o próprio Hub (`../`); via `file://`
cai em `http://localhost:4321/ai-literacy-hub/`.

## Consequências

- Um novo arquivo em `public/` é publicado sem passar pelo build do Astro; a apresentação não usa `BaseLayout` nem os
  metadados do site — é intencionalmente independente.
- A regra "a apresentação não é referenciada por rotas de `src/pages/`" continua valendo: ela é só um arquivo estático.
- Links para `/apresentacao/` a partir do Hub (ex.: no header ou em "Como funciona") ficam a critério das frentes donas
  desses arquivos.
- `docs/presentation-brief.md` ainda cita `presentation/`; o README desse diretório redireciona para o novo local.
