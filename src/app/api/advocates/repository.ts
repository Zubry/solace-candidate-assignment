import { gt } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function fetchAdvocates(cursor: number, limit: number) {
  let query = db.select().from(advocates).limit(limit);

  if (cursor) {
    query = query.where(gt(advocates.id, cursor));
  }

  return await query;
}
