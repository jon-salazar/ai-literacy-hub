const STORAGE_KEY = "ai-literacy-hub:progress:v1";

export interface ModuleProgress {
  startedAt: string;
  completedAt: string | null;
}

export interface ProgressState {
  participantId: string;
  modules: Record<string, ModuleProgress>;
}

interface StorageLike {
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

function readState(storage: StorageLike): ProgressState {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial: ProgressState = { participantId: generateParticipantId(), modules: {} };
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
    const fallback: ProgressState = { participantId: generateParticipantId(), modules: {} };
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

export { STORAGE_KEY };
