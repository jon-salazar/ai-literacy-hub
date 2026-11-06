import { getCollection, type CollectionEntry } from "astro:content";
import { sortByDateDesc } from "./radar-sort";

export type RadarEntry = CollectionEntry<"radar">;
export type RadarType = RadarEntry["data"]["type"];

export const RADAR_TYPE_LABELS: Record<RadarType, string> = {
  conceito: "Conceito",
  pratica: "Prática",
  ferramenta: "Ferramenta",
  tendencia: "Tendência",
};

/** Itens publicados do AI Radar, do mais recente para o mais antigo. */
export async function getRadarItems(): Promise<RadarEntry[]> {
  const items = await getCollection("radar", (entry) => !entry.data.draft);
  return sortByDateDesc(items);
}

export function formatRadarDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(date);
}
