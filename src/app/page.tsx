"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "./frontend/components/SearchBar";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTermInput = e.target.value;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTermInput) ||
        advocate.lastName.includes(searchTermInput) ||
        advocate.city.includes(searchTermInput) ||
        advocate.degree.includes(searchTermInput) ||
        advocate.specialties.includes(searchTermInput) ||
        advocate.yearsOfExperience.toString().includes(searchTermInput)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
    setSearchTerm(searchTermInput);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
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
