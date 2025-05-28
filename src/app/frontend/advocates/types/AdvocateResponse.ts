import { Advocate } from "./Advocate";

export interface AdvocateResponse {
  data: Advocate[];
  nextCursor: number | null;
}
