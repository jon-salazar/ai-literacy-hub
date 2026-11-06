import { describe, expect, it } from "vitest";
import { buildFormUrl, isFormConfigured, type FormConfig } from "../src/lib/forms";

describe("isFormConfigured", () => {
  it("is false when config is undefined or url is empty", () => {
    expect(isFormConfigured(undefined)).toBe(false);
    expect(isFormConfigured({ url: "", embed: false })).toBe(false);
  });

  it("is true when url is present", () => {
    expect(isFormConfigured({ url: "https://forms.gle/abc", embed: false })).toBe(true);
  });
});

describe("buildFormUrl", () => {
  it("returns empty string when url is missing", () => {
    expect(buildFormUrl({ url: "", embed: false }, "participant_x")).toBe("");
  });

  it("returns the bare url when no prefill field is configured", () => {
    const config: FormConfig = { url: "https://forms.gle/abc", embed: false };
    expect(buildFormUrl(config, "participant_x")).toBe("https://forms.gle/abc");
  });

  it("returns the bare url when participantId is null", () => {
    const config: FormConfig = {
      url: "https://forms.gle/abc",
      embed: false,
      prefillParticipantIdField: "entry.123",
    };
    expect(buildFormUrl(config, null)).toBe("https://forms.gle/abc");
  });

  it("adds the prefill parameter when both are present", () => {
    const config: FormConfig = {
      url: "https://forms.gle/abc",
      embed: false,
      prefillParticipantIdField: "entry.123",
    };
    expect(buildFormUrl(config, "participant_x")).toBe("https://forms.gle/abc?entry.123=participant_x");
  });

  it("appends with & when the url already has a query string", () => {
    const config: FormConfig = {
      url: "https://forms.gle/abc?usp=pp_url",
      embed: false,
      prefillParticipantIdField: "entry.123",
    };
    expect(buildFormUrl(config, "participant_x")).toBe(
      "https://forms.gle/abc?usp=pp_url&entry.123=participant_x"
    );
  });
});
