import { gt } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const cursor = parseInt(searchParams.get("cursor") ?? "", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "100"), 100);

  let query = db.select().from(advocates).limit(limit).offset(0);

  if (cursor) {
    query = query.where(cursor ? gt(advocates.id, cursor) : undefined);
  }

  const data = await query;

  const nextCursor = data.length > 0 ? data[data.length - 1].id : null;

  return Response.json({ data, nextCursor });
}
