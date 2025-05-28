import { useState, useEffect } from "react";

export function useAdvocates() {
  const [advocates, setAdvocates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/advocates");
      const { data } = await response.json();
      setAdvocates(data);
    };
    fetchData();
  }, []);

  return advocates;
}
