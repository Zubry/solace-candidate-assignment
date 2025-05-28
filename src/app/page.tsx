"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "./frontend/components/SearchBar";
import { useAdvocates } from "./frontend/advocates/hooks/useAdvocates";
import { useFilteredAdvocates } from "./frontend/advocates/hooks/useFilteredAdvocates";
import { AdvocatesTable } from "./frontend/advocates/components/AdvocatesTable";
import { FetchStatus } from "./frontend/types/FetchStatus";
import { Advocate } from "./frontend/advocates/types/Advocate";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cursor, setCursor] = useState<number>(0);
  const [limit] = useState(3); // We will set this as state since we may manipulate it later

  const advocates = useAdvocates(cursor, limit);
  const [allAdvocates, setAllAdvocates] = useState<Advocate[]>([]);
  const { filteredAdvocates, filter, reset } =
    useFilteredAdvocates(allAdvocates);

  useEffect(() => {
    if (advocates.status === FetchStatus.SUCCESS) {
      setAllAdvocates((prev) => [...prev, ...advocates.advocates]);
    }
  }, [advocates.status]);

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

  const loadMore = () => {
    if (advocates.advocates.length > 0) {
      setCursor(advocates.nextCursor ?? null); // Use the last advocate's ID as the next cursor
    }
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
        <>
          <AdvocatesTable advocates={filteredAdvocates} />
          {advocates.advocates.length === limit && (
            <button onClick={loadMore} style={{ marginTop: "16px" }}>
              Load More
            </button>
          )}
        </>
      )}
    </main>
  );
}
