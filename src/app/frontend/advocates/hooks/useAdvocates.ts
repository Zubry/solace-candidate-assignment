import { useState, useEffect } from "react";
import { Advocate } from "../types/Advocate";
import { AdvocateResponse } from "../types/AdvocateResponse";

export function useAdvocates() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/advocates");
      const { data } = (await response.json()) as AdvocateResponse;
      setAdvocates(data);
    };
    fetchData();
  }, []);

  return advocates;
}
