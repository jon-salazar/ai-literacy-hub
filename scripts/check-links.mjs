#!/usr/bin/env node
// Verificador de links internos do build estático (Node puro, sem dependências).
//
// Percorre dist/**/*.html e, para cada href/src/srcset/poster interno, garante que:
//   1. links absolutos ("/...") começam com o base de publicação (padrão: /ai-literacy-hub/);
//      links relativos são resolvidos a partir da pasta da página;
//   2. o alvo existe em dist/ (considerando `x/` → `x/index.html` e `x` → `x/index.html` | `x.html`).
//
// Uso: node scripts/check-links.mjs [distDir] [base]
// Sai com código 1 listando todos os problemas encontrados.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

const DEFAULT_DIST = "dist";
const DEFAULT_BASE = "/ai-literacy-hub/";

/** Esquemas/prefixos que não são links internos e não devem ser verificados. */
const EXTERNAL_PATTERN = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/** Atributos que carregam uma URL única. */
const URL_ATTRIBUTE_PATTERN = /\s(?:href|src|poster|action)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;

/** Atributos que carregam listas de URLs (srcset). */
const SRCSET_ATTRIBUTE_PATTERN = /\s(?:srcset|imagesrcset)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;

/** @param {string} dir @returns {string[]} */
function listHtmlFiles(dir) {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listHtmlFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

/** Decodifica as entidades HTML que podem aparecer dentro de atributos de URL. */
function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** @param {string} html @returns {string[]} */
function extractUrls(html) {
  // Ignora o conteúdo de <script> e <style> inline e comentários HTML.
  const markup = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (tag) => tag.slice(0, tag.indexOf(">") + 1))
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");

  /** @type {string[]} */
  const urls = [];
  for (const match of markup.matchAll(URL_ATTRIBUTE_PATTERN)) {
    urls.push(decodeEntities((match[1] ?? match[2] ?? "").trim()));
  }
  for (const match of markup.matchAll(SRCSET_ATTRIBUTE_PATTERN)) {
    const candidates = decodeEntities(match[1] ?? match[2] ?? "").split(",");
    for (const candidate of candidates) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url) urls.push(url);
    }
  }
  return urls;
}

/** @param {string} url */
function isInternal(url) {
  if (url === "" || url.startsWith("#")) return false;
  return !EXTERNAL_PATTERN.test(url);
}

/**
 * Resolve o caminho público (já sem o base) para um arquivo em dist.
 * @param {string} distDir @param {string} pathWithinBase
 * @returns {string | null}
 */
function resolveTarget(distDir, pathWithinBase) {
  const candidates =
    pathWithinBase === "" || pathWithinBase.endsWith("/")
      ? [join(pathWithinBase, "index.html")]
      : [pathWithinBase, join(pathWithinBase, "index.html"), `${pathWithinBase}.html`];

  for (const candidate of candidates) {
    const fullPath = resolve(distDir, candidate);
    // Impede que `..` escape de dist/.
    if (fullPath !== distDir && !fullPath.startsWith(distDir + sep)) continue;
    if (existsSync(fullPath) && statSync(fullPath).isFile()) return fullPath;
  }
  return null;
}

/**
 * @param {string} url @param {string} base @param {string} distDir
 * @param {string} file arquivo HTML onde o link aparece (para resolver links relativos)
 * @returns {string | null} descrição do problema, ou null se o link é válido
 */
function checkUrl(url, base, distDir, file) {
  const pathname = url.split(/[?#]/)[0];

  // Links relativos (ex.: "assets/x.png" na apresentação, que também precisa funcionar
  // offline) são resolvidos a partir da pasta da página e só precisam existir em dist/.
  if (!pathname.startsWith("/")) {
    if (pathname === "") return null;
    let decoded;
    try {
      decoded = decodeURIComponent(pathname);
    } catch {
      return "URL com codificação inválida";
    }
    const pageDir = relative(distDir, dirname(file));
    return resolveTarget(distDir, join(pageDir, decoded)) ? null : "alvo relativo não existe em dist/";
  }

  // Links absolutos precisam carregar o base (pega um withBase() esquecido).
  if (!pathname.startsWith(base) && `${pathname}/` !== base) {
    return `não começa com o base "${base}"`;
  }

  let pathWithinBase;
  try {
    pathWithinBase = decodeURIComponent(pathname.slice(base.length));
  } catch {
    return "URL com codificação inválida";
  }

  return resolveTarget(distDir, pathWithinBase) ? null : "alvo não existe em dist/";
}

function main() {
  const distDir = resolve(process.argv[2] ?? DEFAULT_DIST);
  const rawBase = process.argv[3] ?? DEFAULT_BASE;
  const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

  if (!existsSync(distDir) || !statSync(distDir).isDirectory()) {
    console.error(`✗ Diretório "${distDir}" não encontrado. Rode "npm run build" antes.`);
    process.exit(1);
  }

  const htmlFiles = listHtmlFiles(distDir);
  if (htmlFiles.length === 0) {
    console.error(`✗ Nenhum arquivo .html encontrado em "${distDir}".`);
    process.exit(1);
  }

  /** @type {{ file: string, url: string, reason: string }[]} */
  const problems = [];
  let checked = 0;

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    for (const url of extractUrls(html)) {
      if (!isInternal(url)) continue;
      checked += 1;
      const reason = checkUrl(url, base, distDir, file);
      if (reason) problems.push({ file: relative(distDir, file), url, reason });
    }
  }

  if (problems.length > 0) {
    console.error(`✗ ${problems.length} link(s) interno(s) inválido(s):\n`);
    for (const { file, url, reason } of problems) {
      console.error(`  ${file}\n    ${url} → ${reason}`);
    }
    process.exit(1);
  }

  console.log(
    `✓ ${checked} link(s) interno(s) verificados em ${htmlFiles.length} página(s); todos válidos sob "${base}".`,
  );
}

main();
