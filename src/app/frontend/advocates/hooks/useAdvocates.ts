import { useState, useEffect } from "react";
import { Advocate } from "../types/Advocate";
import { AdvocateResponse } from "../types/AdvocateResponse";
import { FetchStatus } from "../../types/FetchStatus";

type UseAdvocatesState = {
  advocates: Advocate[];
  status: FetchStatus;
  error: string | null;
};

export function useAdvocates() {
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
        const response = await fetch("/api/advocates");

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const { data } = (await response.json()) as AdvocateResponse;
        setState({ advocates: data, status: FetchStatus.SUCCESS, error: null });
      } catch (error) {
        setState({
          advocates: [],
          status: FetchStatus.ERROR,
          error: (error as Error).message,
        });
      }
    };
    fetchData();
  }, []);

  return state;
}
