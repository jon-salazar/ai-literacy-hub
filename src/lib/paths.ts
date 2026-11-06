/**
 * Pure helper: prefixes an app-internal path with the deployment base
 * (e.g. "/ai-literacy-hub/" on GitHub Pages, "/" locally).
 */
export function joinBase(base: string, path: string): string {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, "");
  return `${normalizedBase}${normalizedPath}`;
}

/** Prefixes an app-internal path with the base configured in astro.config.mjs. */
export function withBase(path: string): string {
  return joinBase(import.meta.env.BASE_URL, path);
}

/** Pure helper: compares two pathnames ignoring a trailing slash. */
export function isSamePath(a: string, b: string): boolean {
  const strip = (value: string) => (value.length > 1 ? value.replace(/\/+$/, "") : value);
  return strip(a) === strip(b);
}
