import { getAdvocatesController } from "./controller";

export async function GET(request: Request) {
  return getAdvocatesController(request);
}
