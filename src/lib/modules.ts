import { getCollection, type CollectionEntry } from "astro:content";

export type ModuleEntry = CollectionEntry<"modules">;

export async function getAllModules(): Promise<ModuleEntry[]> {
  const modules = await getCollection("modules");
  return modules.sort((a, b) => a.data.order - b.data.order);
}

export async function getModulesByPhase(phaseId: string): Promise<ModuleEntry[]> {
  const modules = await getAllModules();
  return modules.filter((entry) => entry.data.phase === phaseId);
}

export async function getModuleBySlug(slug: string): Promise<ModuleEntry | undefined> {
  const modules = await getAllModules();
  return modules.find((entry) => entry.data.slug === slug);
}

export function countPublished(modules: ModuleEntry[]): number {
  return modules.filter((entry) => entry.data.status === "published").length;
}
