import { ChangeEvent } from "react";

interface SearchBarProps {
  searchTerm: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export function SearchBar({ searchTerm, onChange, onReset }: Readonly<SearchBarProps>) {
  return (
    <div>
      <p>Search</p>
      <p>
        Searching for: <span>{searchTerm}</span>
      </p>
      <input
        style={{ border: "1px solid black" }}
        value={searchTerm}
        onChange={onChange}
      />
      <button onClick={onReset}>Reset Search</button>
    </div>
  );
}
