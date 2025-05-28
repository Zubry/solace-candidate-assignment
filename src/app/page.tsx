"use client";

import { useState } from "react";
import { SearchBar } from "./frontend/components/SearchBar";
import { useAdvocates } from "./frontend/advocates/hooks/useAdvocates";
import { useFilteredAdvocates } from "./frontend/advocates/hooks/useFilteredAdvocates";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const advocates = useAdvocates() ?? [];
  const { filteredAdvocates, filter, reset } = useFilteredAdvocates(advocates);

  const onChange = (e) => {
    const searchTermInput = e.target.value;

    setSearchTerm(searchTermInput);
    filter(searchTermInput);
  };

  const onClick = () => {
    reset();
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
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr
                key={`${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}`}
              >
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
