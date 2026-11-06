#!/usr/bin/env node
// Servidor estático mínimo (Node puro) para os testes e2e.
// Imita o GitHub Pages: serve dist/ sob o base /ai-literacy-hub/, resolve
// `x/` → `x/index.html`, redireciona `x` → `x/` quando existe `x/index.html`
// e responde 404 para o resto.
//
// Uso: node tests/e2e/serve-dist.mjs [porta] [distDir] [base]
// (O `astro preview` do Astro 7 se coloca em segundo plano quando não há TTY,
// o que impede o Playwright de gerenciar o processo — por isso este servidor.)

import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const port = Number(process.argv[2] ?? 4321);
const distDir = resolve(process.argv[3] ?? "dist");
const base = process.argv[4] ?? "/ai-literacy-hub/";

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

function isFile(path) {
  return existsSync(path) && statSync(path).isFile();
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const pathname = decodeURIComponent(url.pathname);

  if (pathname === base.slice(0, -1)) {
    res.writeHead(301, { Location: base }).end();
    return;
  }
  if (!pathname.startsWith(base)) {
    res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
    return;
  }

  const target = resolve(distDir, pathname.slice(base.length));
  if (target !== distDir && !target.startsWith(distDir + sep)) {
    res.writeHead(403).end();
    return;
  }

  let file = target;
  if (pathname.endsWith("/")) {
    file = resolve(target, "index.html");
  } else if (!isFile(target) && isFile(resolve(target, "index.html"))) {
    res.writeHead(301, { Location: `${pathname}/${url.search}` }).end();
    return;
  }

  if (!isFile(file)) {
    res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": CONTENT_TYPES[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Servindo ${distDir} em http://localhost:${port}${base}`);
});
