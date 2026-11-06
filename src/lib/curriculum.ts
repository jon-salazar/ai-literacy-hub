import curriculumData from "../data/curriculum.json";

export type PhaseStatus = "active" | "coming-soon";

export interface Phase {
  id: string;
  order: number;
  title: string;
  description: string;
  transformation: string;
  status: PhaseStatus;
}

export function getPhases(): Phase[] {
  return [...curriculumData.phases].sort((a, b) => a.order - b.order) as Phase[];
}

export function getPhase(id: string): Phase | undefined {
  return getPhases().find((phase) => phase.id === id);
}
