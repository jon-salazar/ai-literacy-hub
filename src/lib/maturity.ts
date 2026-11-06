import maturityJson from "../data/maturity.json";

/** Maturity scores use a 1–5 scale. */
export const MATURITY_SCORE_MIN = 1;
export const MATURITY_SCORE_MAX = 5;

export interface MaturityCompetency {
  id: string;
  label: string;
  score: number;
}

export interface MaturityData {
  /** true while the map shows illustrative (not collected) data. */
  demo: boolean;
  /** ISO date (YYYY-MM-DD or full timestamp) of the last aggregation. */
  updatedAt: string;
  competencies: MaturityCompetency[];
  /** Suggested next learning intervention, or null when there is none. */
  nextIntervention: string | null;
}

function fail(message: string): never {
  throw new Error(`maturity.json inválido: ${message}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseCompetency(value: unknown, index: number): MaturityCompetency {
  if (!isRecord(value)) fail(`competencies[${index}] deve ser um objeto.`);
  const { id, label, score } = value;
  if (typeof id !== "string" || !/^[a-z0-9-]+$/.test(id)) fail(`competencies[${index}].id inválido.`);
  if (typeof label !== "string" || label.trim() === "") fail(`competencies[${index}].label vazio.`);
  if (typeof score !== "number" || !Number.isFinite(score) || score < MATURITY_SCORE_MIN || score > MATURITY_SCORE_MAX) {
    fail(`competencies[${index}].score deve estar entre ${MATURITY_SCORE_MIN} e ${MATURITY_SCORE_MAX}.`);
  }
  return { id, label, score };
}

/**
 * Validates raw maturity data. Throws on invalid input so a bad data file
 * breaks the build instead of silently shipping (see AGENTS.md).
 */
export function parseMaturityData(raw: unknown): MaturityData {
  if (!isRecord(raw)) fail("a raiz deve ser um objeto.");
  if (typeof raw.demo !== "boolean") fail("demo deve ser boolean.");
  if (typeof raw.updatedAt !== "string" || Number.isNaN(Date.parse(raw.updatedAt))) fail("updatedAt deve ser uma data ISO.");
  if (!Array.isArray(raw.competencies)) fail("competencies deve ser uma lista.");
  const competencies = raw.competencies.map(parseCompetency);
  const ids = new Set(competencies.map((c) => c.id));
  if (ids.size !== competencies.length) fail("competencies contém ids duplicados.");
  const next = raw.nextIntervention;
  if (next !== null && (typeof next !== "string" || next.trim() === "")) {
    fail("nextIntervention deve ser texto não vazio ou null.");
  }
  return { demo: raw.demo, updatedAt: raw.updatedAt, competencies, nextIntervention: next };
}

export function getMaturityData(): MaturityData {
  return parseMaturityData(maturityJson);
}

/** Pure: formats a score with one decimal in pt-BR (e.g. 4,1). */
export function formatMaturityScore(score: number): string {
  return score.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
