import { fetchAdvocates } from "./repository";

export async function getAdvocates(cursor: number, limit: number) {
  const data = await fetchAdvocates(cursor, limit);

  const nextCursor = data.length > 0 ? data[data.length - 1].id : null;

  return { data, nextCursor };
}
