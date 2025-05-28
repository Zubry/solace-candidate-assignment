"use client";

import { useState } from "react";
import { SearchBar } from "./frontend/components/SearchBar";
import { useAdvocates } from "./frontend/advocates/hooks/useAdvocates";
import { useFilteredAdvocates } from "./frontend/advocates/hooks/useFilteredAdvocates";
import { AdvocatesTable } from "./frontend/advocates/components/AdvocatesTable";
import { FetchStatus } from "./frontend/types/FetchStatus";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const advocates = useAdvocates();
  const { filteredAdvocates, filter, reset } = useFilteredAdvocates(
    advocates.advocates ?? []
  );

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
      {advocates.status === FetchStatus.LOADING && <p>Loading...</p>}
      {advocates.status === FetchStatus.ERROR && (
        <p>Error: {advocates.error}</p>
      )}
      {advocates.status === FetchStatus.SUCCESS && (
        <AdvocatesTable advocates={filteredAdvocates} />
      )}
    </main>
  );
}
