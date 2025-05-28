import { useCallback, useEffect, useState } from "react";

export function useFilteredAdvocates(advocates) {
  const [filteredAdvocates, setFilteredAdvocates] =
    useState(advocates);
  
  useEffect(() => {
    if (advocates) {
      setFilteredAdvocates(advocates);
    }
  }, [advocates]);

  const filter = useCallback(
    (searchTermInput: string) => {
      if (!searchTermInput) {
        setFilteredAdvocates(advocates);
        return;
      }

      const results = advocates.filter((advocate) => {
        return (
          advocate.firstName.includes(searchTermInput) ||
          advocate.lastName.includes(searchTermInput) ||
          advocate.city.includes(searchTermInput) ||
          advocate.degree.includes(searchTermInput) ||
          advocate.specialties.includes(searchTermInput) ||
          advocate.yearsOfExperience.toString().includes(searchTermInput)
        );
      });

      setFilteredAdvocates(results);
    },
    [advocates]
  );

  const reset = useCallback(() => {
    setFilteredAdvocates(advocates);
  }, [advocates]);

  return {
    filteredAdvocates,
    filter,
    reset,
  };
}
