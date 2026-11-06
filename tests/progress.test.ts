import { beforeEach, describe, expect, it, vi } from "vitest";

class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length() {
    return this.store.size;
  }
  clear(): void {
    this.store.clear();
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

beforeEach(() => {
  vi.stubGlobal("localStorage", new MemoryStorage());
  vi.stubGlobal("crypto", { randomUUID: () => "11111111-2222-3333-4444-555555555555" });
  vi.resetModules();
});

describe("generateParticipantId", () => {
  it("never contains personal data and starts with participant_", async () => {
    const { generateParticipantId } = await import("../src/lib/progress");
    const id = generateParticipantId();
    expect(id).toMatch(/^participant_[a-z0-9]+$/i);
  });
});

describe("getOrCreateParticipantId", () => {
  it("persists the same id across calls", async () => {
    const { getOrCreateParticipantId } = await import("../src/lib/progress");
    const first = getOrCreateParticipantId();
    const second = getOrCreateParticipantId();
    expect(first).toBe(second);
  });
});

describe("markModuleStarted / markModuleCompleted", () => {
  it("tracks module state and survives re-reads", async () => {
    const { markModuleStarted, markModuleCompleted, getProgress, isModuleCompleted } = await import(
      "../src/lib/progress"
    );

    markModuleStarted("context-engineering");
    expect(isModuleCompleted(getProgress(), "context-engineering")).toBe(false);

    markModuleCompleted("context-engineering");
    expect(isModuleCompleted(getProgress(), "context-engineering")).toBe(true);
  });
});

describe("calculatePhaseProgress", () => {
  it("returns 0 for empty phase", async () => {
    const { calculatePhaseProgress } = await import("../src/lib/progress");
    expect(calculatePhaseProgress(null, [])).toBe(0);
  });

  it("computes the percentage of completed modules", async () => {
    const { markModuleCompleted, getProgress, calculatePhaseProgress } = await import("../src/lib/progress");
    markModuleCompleted("a");
    const state = getProgress();
    expect(calculatePhaseProgress(state, ["a", "b"])).toBe(50);
    expect(calculatePhaseProgress(state, ["a"])).toBe(100);
  });
});

const NOW = new Date("2026-11-06T12:00:00.000Z");

function exportText(modules: Record<string, { startedAt: string; completedAt: string | null }>, extra: object = {}) {
  return JSON.stringify({
    version: 1,
    exportedAt: "2026-11-01T10:00:00.000Z",
    progress: { participantId: "participant_abcdef123456", modules },
    ...extra,
  });
}

describe("exportProgress", () => {
  it("wraps the stored state in a versioned envelope", async () => {
    const { exportProgress, markModuleCompleted, exportFileName } = await import("../src/lib/progress");
    markModuleCompleted("context-engineering");
    const data = exportProgress(localStorage, NOW);
    expect(data?.version).toBe(1);
    expect(data?.exportedAt).toBe(NOW.toISOString());
    expect(data?.progress.participantId).toMatch(/^participant_/);
    expect(data?.progress.modules["context-engineering"].completedAt).not.toBeNull();
    expect(exportFileName(NOW)).toBe("ai-literacy-hub-progresso-2026-11-06.json");
  });

  it("returns null without storage", async () => {
    const { exportProgress } = await import("../src/lib/progress");
    expect(exportProgress(null)).toBeNull();
  });

  it("round-trips through importProgress", async () => {
    const { exportProgress, importProgress, markModuleCompleted, resetProgress, isModuleCompleted, getProgress } =
      await import("../src/lib/progress");
    markModuleCompleted("tools");
    const text = JSON.stringify(exportProgress(localStorage, NOW));
    resetProgress(localStorage);
    expect(isModuleCompleted(getProgress(), "tools")).toBe(false);
    expect(importProgress(text, localStorage).ok).toBe(true);
    expect(isModuleCompleted(getProgress(), "tools")).toBe(true);
  });
});

describe("importProgress", () => {
  it("imports a valid file and keeps the current participantId", async () => {
    const { importProgress, getProgress } = await import("../src/lib/progress");
    const before = getProgress()!.participantId;
    const result = importProgress(
      exportText({ tools: { startedAt: "2026-10-01T00:00:00.000Z", completedAt: "2026-10-02T00:00:00.000Z" } }),
      localStorage,
    );
    expect(result).toMatchObject({ ok: true, importedModules: 1 });
    const after = getProgress()!;
    expect(after.participantId).toBe(before);
    expect(after.participantId).not.toBe("participant_abcdef123456");
    expect(after.modules.tools.completedAt).toBe("2026-10-02T00:00:00.000Z");
  });

  it.each([
    ["not JSON", "{not json"],
    ["wrong version", exportText({}, { version: 2 })],
    ["missing progress", JSON.stringify({ version: 1, exportedAt: "2026-11-01T10:00:00.000Z" })],
    ["array root", "[]"],
    ["unrelated JSON", JSON.stringify({ itens: ["pão"] })],
    ["bad participantId", exportText({}, { progress: { participantId: "maria@example.com", modules: {} } })],
    ["bad module id", exportText({ "Bad Id": { startedAt: "2026-10-01T00:00:00.000Z", completedAt: null } })],
    [
      "__proto__ module id",
      exportText({}).replace('"modules":{}', '"modules":{"__proto__":{"startedAt":"2026-10-01T00:00:00.000Z","completedAt":null}}'),
    ],
    ["bad startedAt", exportText({ tools: { startedAt: "ontem", completedAt: null } })],
    ["bad completedAt", exportText({ tools: { startedAt: "2026-10-01T00:00:00.000Z", completedAt: 42 } as never })],
  ])("rejects %s without touching the stored state", async (_label, text) => {
    const { importProgress, markModuleCompleted, STORAGE_KEY } = await import("../src/lib/progress");
    markModuleCompleted("models");
    const snapshot = localStorage.getItem(STORAGE_KEY);
    const result = importProgress(text, localStorage);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.length).toBeGreaterThan(0);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(snapshot);
  });

  it("rejects oversized files", async () => {
    const { importProgress, MAX_IMPORT_BYTES } = await import("../src/lib/progress");
    expect(importProgress(" ".repeat(MAX_IMPORT_BYTES + 1), localStorage).ok).toBe(false);
  });

  it("merges keeping earliest start and latest completion", async () => {
    const { importProgress, getProgress, STORAGE_KEY } = await import("../src/lib/progress");
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        participantId: "participant_current000001",
        modules: {
          tools: { startedAt: "2026-10-05T00:00:00.000Z", completedAt: "2026-10-06T00:00:00.000Z" },
          models: { startedAt: "2026-10-01T00:00:00.000Z", completedAt: null },
          seguranca: { startedAt: "2026-10-01T00:00:00.000Z", completedAt: "2026-10-03T00:00:00.000Z" },
        },
      }),
    );
    importProgress(
      exportText({
        tools: { startedAt: "2026-10-01T00:00:00.000Z", completedAt: "2026-10-02T00:00:00.000Z" },
        models: { startedAt: "2026-10-02T00:00:00.000Z", completedAt: "2026-10-04T00:00:00.000Z" },
        seguranca: { startedAt: "2026-10-01T00:00:00.000Z", completedAt: null },
        "grounding-rag": { startedAt: "2026-10-07T00:00:00.000Z", completedAt: null },
      }),
      localStorage,
    );
    const state = getProgress()!;
    expect(state.participantId).toBe("participant_current000001");
    expect(state.modules.tools).toEqual({
      startedAt: "2026-10-01T00:00:00.000Z",
      completedAt: "2026-10-06T00:00:00.000Z",
    });
    expect(state.modules.models).toEqual({
      startedAt: "2026-10-01T00:00:00.000Z",
      completedAt: "2026-10-04T00:00:00.000Z",
    });
    // A completion is never undone by an import.
    expect(state.modules.seguranca.completedAt).toBe("2026-10-03T00:00:00.000Z");
    expect(state.modules["grounding-rag"]).toEqual({ startedAt: "2026-10-07T00:00:00.000Z", completedAt: null });
  });
});

describe("resetProgress", () => {
  it("clears modules and issues a new participantId", async () => {
    const { resetProgress, markModuleCompleted, getProgress, STORAGE_KEY } = await import("../src/lib/progress");
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ participantId: "participant_old000000001", modules: {} }));
    markModuleCompleted("tools");
    const fresh = resetProgress(localStorage);
    expect(fresh?.modules).toEqual({});
    expect(fresh?.participantId).not.toBe("participant_old000000001");
    expect(getProgress()).toEqual(fresh);
  });

  it("returns null without storage", async () => {
    const { resetProgress } = await import("../src/lib/progress");
    expect(resetProgress(null)).toBeNull();
  });
});
