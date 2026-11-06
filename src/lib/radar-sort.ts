/** Pure helper: ordena por data decrescente; empate desempata por id (estável e determinístico). */
export function sortByDateDesc<T extends { id: string; data: { date: Date } }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => {
    const diff = b.data.date.getTime() - a.data.date.getTime();
    return diff !== 0 ? diff : a.id.localeCompare(b.id);
  });
}
