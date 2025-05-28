"use client";

import { useState } from "react";
import { SearchBar } from "./frontend/components/SearchBar";
import { useAdvocates } from "./frontend/advocates/hooks/useAdvocates";
import { useFilteredAdvocates } from "./frontend/advocates/hooks/useFilteredAdvocates";
import { AdvocatesTable } from "./frontend/advocates/components/AdvocatesTable";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const advocates = useAdvocates() ?? [];
  const { filteredAdvocates, filter, reset } = useFilteredAdvocates(advocates);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTermInput = e.target.value;

    setSearchTerm(searchTermInput);
    filter(searchTermInput);
  };

  const onClick = () => {
    reset();
    setSearchTerm("");
    filter("");
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <SearchBar
        searchTerm={searchTerm}
        onChange={onChange}
        onReset={onClick}
      />
      <br />
      <br />
      <AdvocatesTable advocates={filteredAdvocates} />
    </main>
  );
}
