import { describe, expect, it } from "vitest";
import { sortByDateDesc } from "../src/lib/radar-sort";

const item = (id: string, iso: string) => ({ id, data: { date: new Date(iso) } });

describe("sortByDateDesc", () => {
  it("ordena do mais recente para o mais antigo", () => {
    const sorted = sortByDateDesc([item("a", "2026-01-01"), item("b", "2026-03-01"), item("c", "2026-02-01")]);
    expect(sorted.map((i) => i.id)).toEqual(["b", "c", "a"]);
  });

  it("desempata pelo id quando as datas são iguais", () => {
    const sorted = sortByDateDesc([item("z", "2026-01-01"), item("m", "2026-01-01")]);
    expect(sorted.map((i) => i.id)).toEqual(["m", "z"]);
  });

  it("não altera o array original", () => {
    const input = [item("a", "2026-01-01"), item("b", "2026-02-01")];
    sortByDateDesc(input);
    expect(input.map((i) => i.id)).toEqual(["a", "b"]);
  });
});
