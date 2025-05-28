import { getAdvocates } from "./service";

export async function getAdvocatesController(request: Request) {
  const url = new URL(request.url);
  const cursor = parseInt(url.searchParams.get("cursor") ?? "0", 10);
  const limit = Math.max(
    Math.min(parseInt(url.searchParams.get("limit") ?? "100"), 100),
    0
  );

  try {
    const { data, nextCursor } = await getAdvocates(cursor, limit);
    return Response.json({ data, nextCursor });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
