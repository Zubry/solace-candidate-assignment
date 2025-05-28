import { useState, useEffect } from "react";
import { Advocate } from "../types/Advocate";
import { AdvocateResponse } from "../types/AdvocateResponse";
import { FetchStatus } from "../../types/FetchStatus";

type UseAdvocatesState = {
  advocates: Advocate[];
  status: FetchStatus;
  error: string | null;
  nextCursor?: number | null;
};

export function useAdvocates(
  cursor: number = 0,
  limit: number = 100
): UseAdvocatesState {
  const [state, setState] = useState<UseAdvocatesState>({
    advocates: [],
    status: FetchStatus.INITIAL,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({
          ...prevState,
          status: FetchStatus.LOADING,
          error: null,
        }));

        const queryParams = `cursor=${cursor}&limit=${limit}`;
        const url = `/api/advocates?${queryParams}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const { data, nextCursor } =
          (await response.json()) as AdvocateResponse;
        setState({
          advocates: data,
          nextCursor: nextCursor,
          status: FetchStatus.SUCCESS,
          error: null,
        });
      } catch (error) {
        setState({
          advocates: [],
          status: FetchStatus.ERROR,
          error: (error as Error).message,
        });
      }
    };
    fetchData();
  }, [cursor, limit]);

  return state;
}
