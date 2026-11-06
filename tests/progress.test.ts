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
