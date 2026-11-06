import formsData from "../data/forms.json";

export type FormKind = "baseline" | "evidence" | "reflection";

export interface FormConfig {
  url: string;
  embed: boolean;
  prefillParticipantIdField?: string;
}

type FormsData = Record<string, Partial<Record<FormKind, FormConfig>>>;

const data = formsData as FormsData;

export function getFormConfig(moduleId: string, kind: FormKind): FormConfig | undefined {
  return data[moduleId]?.[kind];
}

export function isFormConfigured(config: FormConfig | undefined): config is FormConfig {
  return Boolean(config && config.url && config.url.trim().length > 0);
}

/**
 * Pure function: builds the Google Form URL, adding the participant id as a
 * prefill parameter when the form config declares which entry field to use.
 */
export function buildFormUrl(config: FormConfig, participantId: string | null): string {
  if (!config.url) return "";
  if (!config.prefillParticipantIdField || !participantId) return config.url;

  const separator = config.url.includes("?") ? "&" : "?";
  const param = `${encodeURIComponent(config.prefillParticipantIdField)}=${encodeURIComponent(participantId)}`;
  return `${config.url}${separator}${param}`;
}
