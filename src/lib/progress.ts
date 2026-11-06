const STORAGE_KEY = "ai-literacy-hub:progress:v1";

/** Version of the exported progress file format. Bump on breaking changes. */
export const EXPORT_VERSION = 1;

/** DOM event dispatched on `document` when progress is replaced (import/reset). */
export const PROGRESS_CHANGED_EVENT = "ai-literacy-hub:progress-changed";

/** Upper bound for an import file; real progress files are a few KB. */
export const MAX_IMPORT_BYTES = 100_000;

export interface ModuleProgress {
  startedAt: string;
  completedAt: string | null;
}

export interface ProgressState {
  participantId: string;
  modules: Record<string, ModuleProgress>;
}

export interface ProgressExport {
  version: typeof EXPORT_VERSION;
  exportedAt: string;
  progress: ProgressState;
}

export type ImportResult =
  | { ok: true; state: ProgressState; importedModules: number }
  | { ok: false; error: string };

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function getStorage(): StorageLike | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage;
}

export function generateParticipantId(): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
  return `participant_${random.replace(/-/g, "").slice(0, 12)}`;
}

function createEmptyState(): ProgressState {
  return { participantId: generateParticipantId(), modules: {} };
}

function readState(storage: StorageLike): ProgressState {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = createEmptyState();
    storage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    const parsed = JSON.parse(raw) as ProgressState;
    if (!parsed.participantId || typeof parsed.modules !== "object") {
      throw new Error("invalid shape");
    }
    return parsed;
  } catch {
    const fallback = createEmptyState();
    storage.setItem(STORAGE_KEY, JSON.stringify(fallback));
    return fallback;
  }
}

function writeState(storage: StorageLike, state: ProgressState): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getOrCreateParticipantId(): string | null {
  const storage = getStorage();
  if (!storage) return null;
  return readState(storage).participantId;
}

export function getProgress(): ProgressState | null {
  const storage = getStorage();
  if (!storage) return null;
  return readState(storage);
}

export function markModuleStarted(moduleId: string): ProgressState | null {
  const storage = getStorage();
  if (!storage) return null;
  const state = readState(storage);
  if (!state.modules[moduleId]) {
    state.modules[moduleId] = { startedAt: new Date().toISOString(), completedAt: null };
    writeState(storage, state);
  }
  return state;
}

export function markModuleCompleted(moduleId: string): ProgressState | null {
  const storage = getStorage();
  if (!storage) return null;
  const state = readState(storage);
  const existing = state.modules[moduleId];
  state.modules[moduleId] = {
    startedAt: existing?.startedAt ?? new Date().toISOString(),
    completedAt: new Date().toISOString(),
  };
  writeState(storage, state);
  return state;
}

export function isModuleCompleted(state: ProgressState | null, moduleId: string): boolean {
  return Boolean(state?.modules[moduleId]?.completedAt);
}

/**
 * Pure helper: percentage of the given module ids marked completed in state.
 */
export function calculatePhaseProgress(state: ProgressState | null, moduleIdsInPhase: string[]): number {
  if (!state || moduleIdsInPhase.length === 0) return 0;
  const completed = moduleIdsInPhase.filter((id) => isModuleCompleted(state, id)).length;
  return Math.round((completed / moduleIdsInPhase.length) * 100);
}

// ---------------------------------------------------------------------------
// Export / import / reset
// ---------------------------------------------------------------------------

/** Pure: wraps a progress state in the versioned export envelope. */
export function createProgressExport(state: ProgressState, now: Date = new Date()): ProgressExport {
  return { version: EXPORT_VERSION, exportedAt: now.toISOString(), progress: state };
}

/** Pure: suggested file name for an export, e.g. `ai-literacy-hub-progresso-2026-11-06.json`. */
export function exportFileName(now: Date = new Date()): string {
  return `ai-literacy-hub-progresso-${now.toISOString().slice(0, 10)}.json`;
}

const MODULE_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,99}$/;
const PARTICIPANT_ID_PATTERN = /^participant_[a-z0-9]{1,64}$/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && value.length <= 40 && !Number.isNaN(Date.parse(value));
}

/**
 * Pure: parses and validates an export file's text. Never throws; returns a
 * user-facing error message (pt-BR) when the file is not a valid export.
 */
export function parseProgressExport(text: string): { ok: true; data: ProgressExport } | { ok: false; error: string } {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: "O arquivo não é um JSON válido." };
  }
  if (!isRecord(raw) || !("version" in raw) || !("progress" in raw)) {
    return { ok: false, error: "O arquivo não tem o formato de exportação do Hub." };
  }
  if (raw.version !== EXPORT_VERSION) {
    return { ok: false, error: `Versão de arquivo não suportada (esperado: ${EXPORT_VERSION}).` };
  }
  if (!isIsoDate(raw.exportedAt)) return { ok: false, error: "Campo exportedAt ausente ou inválido." };

  const progress = raw.progress;
  if (!isRecord(progress)) return { ok: false, error: "Campo progress ausente ou inválido." };
  if (typeof progress.participantId !== "string" || !PARTICIPANT_ID_PATTERN.test(progress.participantId)) {
    return { ok: false, error: "participantId ausente ou em formato inválido." };
  }
  if (!isRecord(progress.modules)) return { ok: false, error: "Campo modules ausente ou inválido." };

  const modules: Record<string, ModuleProgress> = {};
  for (const [moduleId, entry] of Object.entries(progress.modules)) {
    if (!MODULE_ID_PATTERN.test(moduleId)) {
      return { ok: false, error: `Identificador de módulo inválido: "${moduleId.slice(0, 40)}".` };
    }
    if (!isRecord(entry) || !isIsoDate(entry.startedAt)) {
      return { ok: false, error: `Data de início inválida no módulo "${moduleId}".` };
    }
    if (entry.completedAt !== null && !isIsoDate(entry.completedAt)) {
      return { ok: false, error: `Data de conclusão inválida no módulo "${moduleId}".` };
    }
    modules[moduleId] = { startedAt: entry.startedAt, completedAt: entry.completedAt };
  }

  return {
    ok: true,
    data: {
      version: EXPORT_VERSION,
      exportedAt: raw.exportedAt,
      progress: { participantId: progress.participantId, modules },
    },
  };
}

function earliest(a: string, b: string): string {
  return Date.parse(a) <= Date.parse(b) ? a : b;
}

function latest(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return Date.parse(a) >= Date.parse(b) ? a : b;
}

/**
 * Pure: merges imported progress into the current one. Keeps the current
 * participantId; per module keeps the earliest start and the latest completion.
 */
export function mergeProgress(current: ProgressState, incoming: ProgressState): ProgressState {
  const modules: Record<string, ModuleProgress> = { ...current.modules };
  for (const [moduleId, entry] of Object.entries(incoming.modules)) {
    const existing = modules[moduleId];
    modules[moduleId] = existing
      ? { startedAt: earliest(existing.startedAt, entry.startedAt), completedAt: latest(existing.completedAt, entry.completedAt) }
      : { ...entry };
  }
  return { participantId: current.participantId, modules };
}

/** Returns the current state as a versioned export, or null without storage. */
export function exportProgress(storage: StorageLike | null = getStorage(), now: Date = new Date()): ProgressExport | null {
  if (!storage) return null;
  return createProgressExport(readState(storage), now);
}

/**
 * Validates `text` and merges it into the stored progress. On any validation
 * error the stored state is left untouched.
 */
export function importProgress(text: string, storage: StorageLike | null = getStorage()): ImportResult {
  if (!storage) return { ok: false, error: "Não foi possível acessar o armazenamento local deste navegador." };
  if (text.length > MAX_IMPORT_BYTES) return { ok: false, error: "Arquivo grande demais para ser um progresso do Hub." };
  const parsed = parseProgressExport(text);
  if (!parsed.ok) return parsed;
  const merged = mergeProgress(readState(storage), parsed.data.progress);
  writeState(storage, merged);
  return { ok: true, state: merged, importedModules: Object.keys(parsed.data.progress.modules).length };
}

/** Clears all module progress and issues a new pseudonymous participantId. */
export function resetProgress(storage: StorageLike | null = getStorage()): ProgressState | null {
  if (!storage) return null;
  const fresh = createEmptyState();
  writeState(storage, fresh);
  return fresh;
}

export { STORAGE_KEY };
