# Apresentação — AI Literacy Hub POC

Artefato HTML estático e independente, criado conforme [docs/presentation-brief.md](../docs/presentation-brief.md). Não faz parte da aplicação do Hub e não depende dela para funcionar — apenas para a demonstração ao vivo (slide 6).

## Como abrir

Dê duplo clique em [index.html](index.html), ou abra pelo navegador:

```
file:///caminho/para/presentation/index.html
```

Nenhum `npm install`, servidor ou conexão com a internet é necessário.

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

## Configurar a URL da POC

O slide 6 ("Vamos experimentar como participante") tem um botão para abrir a POC real. A URL é configurada no início do bloco `<script>` de `index.html`:

```js
const PRESENTATION_CONFIG = {
  pocUrl: "http://localhost:4321",
};
```

- Aponta por padrão para o servidor local (`npm run dev` na pasta do projeto).
- Se a POC estiver publicada em outra URL, troque o valor.
- Se `pocUrl` estiver vazio (`""`), o botão é substituído por um aviso de configuração pendente — a apresentação nunca quebra por causa disso.

## Assets

`assets/*.png` são screenshots reais da POC, gerados a partir do build de produção (`astro build` + `astro preview`), não mockups. Se o conteúdo da aplicação mudar significativamente, os assets podem ser regenerados repetindo esse processo e recapturando as telas de: Home, Fase 1, módulo Context Engineering (seções Demo e Lab) e página de Progresso.

## Observações

- Os dados de "Maturity Map" que aparecem no screenshot de progresso são explicitamente marcados como demonstrativos pela própria aplicação — não são dados de participantes reais.
- O slide 11 ("Validado vs. hipótese") separa deliberadamente fatos técnicos verificados de hipóteses de aprendizagem ainda não testadas com pessoas reais.
- Este diretório não deve ser referenciado por nenhuma rota da aplicação Astro (`src/pages/`) — a independência entre POC e apresentação é intencional.
