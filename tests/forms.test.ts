import { describe, expect, it } from "vitest";
import formsJson from "../src/data/forms.json";
import {
  FORM_KINDS,
  buildFormUrl,
  formDataAttributes,
  formUrlInputFromDataset,
  getFormConfig,
  isFormConfigured,
  resolveFormConfig,
  type FormConfig,
  type FormsData,
} from "../src/lib/forms";

const fixture: FormsData = {
  defaults: {
    baseline: {
      url: "https://docs.google.com/forms/d/e/BASE/viewform",
      embed: false,
      prefillParticipantIdField: "entry.111",
      prefillModuleIdField: "entry.222",
    },
    evidence: {
      url: "https://docs.google.com/forms/d/e/EVID/viewform",
      embed: true,
      prefillParticipantIdField: "entry.333",
      prefillModuleIdField: "entry.444",
    },
    reflection: { url: "", embed: false },
  },
  overrides: {
    "context-engineering": {
      evidence: { url: "https://docs.google.com/forms/d/e/SPECIAL/viewform", embed: false },
    },
  },
};

function config(overrides: Partial<FormConfig> = {}): FormConfig {
  return {
    kind: "baseline",
    moduleId: "tokens-context-window",
    url: "https://forms.gle/abc",
    embed: false,
    ...overrides,
  };
}

describe("resolveFormConfig", () => {
  it("returns the shared default with the module id for any module", () => {
    expect(resolveFormConfig(fixture, "modulo-novo-sem-entrada", "baseline")).toEqual({
      ...fixture.defaults.baseline,
      kind: "baseline",
      moduleId: "modulo-novo-sem-entrada",
    });
  });

  it("applies a partial override, keeping the default prefill fields", () => {
    expect(resolveFormConfig(fixture, "context-engineering", "evidence")).toEqual({
      url: "https://docs.google.com/forms/d/e/SPECIAL/viewform",
      embed: false,
      prefillParticipantIdField: "entry.333",
      prefillModuleIdField: "entry.444",
      kind: "evidence",
      moduleId: "context-engineering",
    });
  });

  it("only overrides the kind declared in the override", () => {
    expect(resolveFormConfig(fixture, "context-engineering", "baseline").url).toBe(
      fixture.defaults.baseline.url
    );
  });

  it("ignores undefined values in an override", () => {
    const source: FormsData = {
      ...fixture,
      overrides: { m: { baseline: { url: undefined, embed: true } } },
    };
    const resolved = resolveFormConfig(source, "m", "baseline");
    expect(resolved.url).toBe(fixture.defaults.baseline.url);
    expect(resolved.embed).toBe(true);
  });

  it("keeps a default without URL as not configured", () => {
    expect(isFormConfigured(resolveFormConfig(fixture, "any", "reflection"))).toBe(false);
  });
});

describe("forms.json", () => {
  it("declares a default for every form kind", () => {
    const data = formsJson as FormsData;
    for (const kind of FORM_KINDS) {
      expect(typeof data.defaults[kind].url).toBe("string");
      expect(typeof data.defaults[kind].embed).toBe("boolean");
    }
  });

  it("resolves a config for a module that has no entry in the JSON", () => {
    for (const kind of FORM_KINDS) {
      const resolved = getFormConfig("mcp", kind);
      expect(resolved?.moduleId).toBe("mcp");
      expect(resolved?.kind).toBe(kind);
    }
  });
});

describe("isFormConfigured", () => {
  it("is false when config is undefined or url is empty/blank", () => {
    expect(isFormConfigured(undefined)).toBe(false);
    expect(isFormConfigured(config({ url: "" }))).toBe(false);
    expect(isFormConfigured(config({ url: "   " }))).toBe(false);
  });

  it("is true when url is present", () => {
    expect(isFormConfigured(config())).toBe(true);
  });
});

describe("buildFormUrl", () => {
  it("returns empty string when url is missing", () => {
    expect(buildFormUrl(config({ url: "", prefillParticipantIdField: "entry.1" }), "participant_x")).toBe("");
  });

  it("returns the bare url when no prefill field is configured", () => {
    expect(buildFormUrl(config(), "participant_x")).toBe("https://forms.gle/abc");
  });

  it("treats empty prefill fields as absent", () => {
    const c = config({ prefillParticipantIdField: "", prefillModuleIdField: " " });
    expect(buildFormUrl(c, "participant_x")).toBe("https://forms.gle/abc");
  });

  it("skips the participant param when participantId is null", () => {
    const c = config({ prefillParticipantIdField: "entry.1", prefillModuleIdField: "entry.2" });
    expect(buildFormUrl(c, null)).toBe("https://forms.gle/abc?entry.2=tokens-context-window");
  });

  it("adds only the participant param when no module field is configured", () => {
    const c = config({ prefillParticipantIdField: "entry.123" });
    expect(buildFormUrl(c, "participant_x")).toBe("https://forms.gle/abc?entry.123=participant_x");
  });

  it("pre-fills both participant id and module id", () => {
    const c = config({ prefillParticipantIdField: "entry.1", prefillModuleIdField: "entry.2" });
    expect(buildFormUrl(c, "participant_x")).toBe(
      "https://forms.gle/abc?entry.1=participant_x&entry.2=tokens-context-window"
    );
  });

  it("appends with & when the url already has a query string", () => {
    const c = config({
      url: "https://docs.google.com/forms/d/e/X/viewform?usp=pp_url",
      prefillParticipantIdField: "entry.1",
      prefillModuleIdField: "entry.2",
    });
    expect(buildFormUrl(c, "participant_x")).toBe(
      "https://docs.google.com/forms/d/e/X/viewform?usp=pp_url&entry.1=participant_x&entry.2=tokens-context-window"
    );
  });

  it("does not duplicate the separator when the url ends with ? or &", () => {
    const c = config({ url: "https://forms.gle/abc?", prefillParticipantIdField: "entry.1" });
    expect(buildFormUrl(c, "p")).toBe("https://forms.gle/abc?entry.1=p");
    expect(buildFormUrl({ ...c, url: "https://forms.gle/abc?usp=pp_url&" }, "p")).toBe(
      "https://forms.gle/abc?usp=pp_url&entry.1=p"
    );
  });

  it("encodes the values", () => {
    const c = config({ moduleId: "a b&c", prefillModuleIdField: "entry.2" });
    expect(buildFormUrl(c, null)).toBe("https://forms.gle/abc?entry.2=a%20b%26c");
  });
});

describe("formDataAttributes / formUrlInputFromDataset", () => {
  it("round-trips a config through data attributes", () => {
    const c = config({ prefillParticipantIdField: "entry.1", prefillModuleIdField: "entry.2" });
    const attrs = formDataAttributes(c);
    const dataset: DOMStringMap = {
      formUrl: attrs["data-form-url"],
      formModuleId: attrs["data-form-module-id"],
      formPrefillParticipantField: attrs["data-form-prefill-participant-field"],
      formPrefillModuleField: attrs["data-form-prefill-module-field"],
    };
    expect(buildFormUrl(formUrlInputFromDataset(dataset), "p")).toBe(buildFormUrl(c, "p"));
  });

  it("maps empty dataset values to undefined", () => {
    expect(formUrlInputFromDataset({ formUrl: "u", formPrefillParticipantField: "" })).toEqual({
      url: "u",
      moduleId: undefined,
      prefillParticipantIdField: undefined,
      prefillModuleIdField: undefined,
    });
  });
});
