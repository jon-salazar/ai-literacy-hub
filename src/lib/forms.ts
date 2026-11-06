import formsData from "../data/forms.json";

export const FORM_KINDS = ["baseline", "evidence", "reflection"] as const;

export type FormKind = (typeof FORM_KINDS)[number];

/** How one Google Form is reached: shared by every module unless overridden. */
export interface FormDefinition {
  url: string;
  embed: boolean;
  /** `entry.*` field of the hidden `participant_id` question. */
  prefillParticipantIdField?: string;
  /** `entry.*` field of the hidden `module_id` question. */
  prefillModuleIdField?: string;
}

/** A form definition resolved for one module (defaults + overrides). */
export interface FormConfig extends FormDefinition {
  kind: FormKind;
  moduleId: string;
}

export type FormOverrides = Partial<Record<string, Partial<Record<FormKind, Partial<FormDefinition>>>>>;

export interface FormsData {
  defaults: Record<FormKind, FormDefinition>;
  overrides?: FormOverrides;
}

const data = formsData as FormsData;

/** Drops undefined values so a partial override never erases a default. */
function definedFields(override: Partial<FormDefinition> | undefined): Partial<FormDefinition> {
  if (!override) return {};
  return Object.fromEntries(
    Object.entries(override).filter(([, value]) => value !== undefined)
  ) as Partial<FormDefinition>;
}

/**
 * Pure function: resolves the form of `kind` for `moduleId`, applying the
 * module override (if any) on top of the shared default.
 */
export function resolveFormConfig(source: FormsData, moduleId: string, kind: FormKind): FormConfig {
  const base = source.defaults[kind];
  const override = definedFields(source.overrides?.[moduleId]?.[kind]);
  return { ...base, ...override, kind, moduleId };
}

/** Resolves the form of `kind` for `moduleId` from `src/data/forms.json`. */
export function getFormConfig(moduleId: string, kind: FormKind): FormConfig | undefined {
  return resolveFormConfig(data, moduleId, kind);
}

export function isFormConfigured(config: FormConfig | undefined): config is FormConfig {
  return Boolean(config && config.url && config.url.trim().length > 0);
}

function prefillParam(field: string | undefined, value: string | null | undefined): string | null {
  if (!field || !field.trim() || !value) return null;
  return `${encodeURIComponent(field.trim())}=${encodeURIComponent(value)}`;
}

/**
 * Pure function: builds the Google Form URL, pre-filling the participant id
 * and the module id when the config declares which `entry.*` field to use.
 */
export function buildFormUrl(
  config: Pick<FormConfig, "url" | "prefillParticipantIdField" | "prefillModuleIdField"> & {
    moduleId?: string;
  },
  participantId: string | null
): string {
  const url = config.url.trim();
  if (!url) return "";

  const params = [
    prefillParam(config.prefillParticipantIdField, participantId),
    prefillParam(config.prefillModuleIdField, config.moduleId),
  ].filter((param): param is string => param !== null);
  if (params.length === 0) return url;

  const separator = !url.includes("?") ? "?" : url.endsWith("?") || url.endsWith("&") ? "" : "&";
  return `${url}${separator}${params.join("&")}`;
}

/** Data attributes that carry a resolved config to the client script. */
export function formDataAttributes(config: FormConfig): Record<string, string> {
  return {
    "data-form-url": config.url,
    "data-form-module-id": config.moduleId,
    "data-form-prefill-participant-field": config.prefillParticipantIdField ?? "",
    "data-form-prefill-module-field": config.prefillModuleIdField ?? "",
  };
}

/** Pure function: inverse of `formDataAttributes`, reading an element's dataset. */
export function formUrlInputFromDataset(dataset: DOMStringMap): Parameters<typeof buildFormUrl>[0] {
  return {
    url: dataset.formUrl ?? "",
    moduleId: dataset.formModuleId || undefined,
    prefillParticipantIdField: dataset.formPrefillParticipantField || undefined,
    prefillModuleIdField: dataset.formPrefillModuleField || undefined,
  };
}
