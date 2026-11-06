import { describe, expect, it } from "vitest";
import { isSamePath, joinBase } from "../src/lib/paths";

describe("joinBase", () => {
  it("keeps root-relative paths when base is the root", () => {
    expect(joinBase("/", "/sobre")).toBe("/sobre");
    expect(joinBase("/", "/")).toBe("/");
  });

  it("prefixes paths with a sub-path base", () => {
    expect(joinBase("/ai-literacy-hub/", "/modulos/tools")).toBe("/ai-literacy-hub/modulos/tools");
    expect(joinBase("/ai-literacy-hub/", "/")).toBe("/ai-literacy-hub/");
  });

  it("accepts a base without trailing slash and paths without leading slash", () => {
    expect(joinBase("/ai-literacy-hub", "progresso")).toBe("/ai-literacy-hub/progresso");
  });
});

describe("isSamePath", () => {
  it("ignores a trailing slash", () => {
    expect(isSamePath("/ai-literacy-hub/sobre/", "/ai-literacy-hub/sobre")).toBe(true);
    expect(isSamePath("/ai-literacy-hub/", "/ai-literacy-hub/")).toBe(true);
  });

  it("does not treat different paths as equal", () => {
    expect(isSamePath("/ai-literacy-hub/", "/ai-literacy-hub/sobre")).toBe(false);
    expect(isSamePath("/", "/sobre")).toBe(false);
  });
});
