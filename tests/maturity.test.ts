import { describe, expect, it } from "vitest";
import { formatMaturityScore, getMaturityData, parseMaturityData } from "../src/lib/maturity";

const valid = {
  demo: true,
  updatedAt: "2026-11-06",
  competencies: [{ id: "evals", label: "Evals", score: 1.7 }],
  nextIntervention: "Dojo",
};

describe("getMaturityData", () => {
  it("reads and validates src/data/maturity.json", () => {
    const data = getMaturityData();
    expect(typeof data.demo).toBe("boolean");
    expect(data.competencies.length).toBeGreaterThan(0);
    for (const c of data.competencies) {
      expect(c.score).toBeGreaterThanOrEqual(1);
      expect(c.score).toBeLessThanOrEqual(5);
    }
  });
});

describe("parseMaturityData", () => {
  it("accepts a valid payload and null nextIntervention", () => {
    expect(parseMaturityData(valid)).toEqual(valid);
    expect(parseMaturityData({ ...valid, demo: false, nextIntervention: null }).nextIntervention).toBeNull();
  });

  it.each([
    ["non-object root", []],
    ["missing demo", { ...valid, demo: undefined }],
    ["bad updatedAt", { ...valid, updatedAt: "algum dia" }],
    ["competencies not array", { ...valid, competencies: {} }],
    ["score out of range", { ...valid, competencies: [{ id: "evals", label: "Evals", score: 7 }] }],
    ["empty label", { ...valid, competencies: [{ id: "evals", label: " ", score: 2 }] }],
    [
      "duplicate ids",
      {
        ...valid,
        competencies: [
          { id: "evals", label: "Evals", score: 2 },
          { id: "evals", label: "Evals 2", score: 3 },
        ],
      },
    ],
    ["empty nextIntervention", { ...valid, nextIntervention: "" }],
  ])("rejects %s", (_label, raw) => {
    expect(() => parseMaturityData(raw)).toThrow(/maturity\.json inválido/);
  });
});

describe("formatMaturityScore", () => {
  it("formats with one decimal in pt-BR", () => {
    expect(formatMaturityScore(3)).toBe("3,0");
    expect(formatMaturityScore(4.14)).toBe("4,1");
  });
});
