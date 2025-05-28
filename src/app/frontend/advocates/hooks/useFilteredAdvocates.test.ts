import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useFilteredAdvocates } from "./useFilteredAdvocates";
import { Advocate } from "../types/Advocate";

// Sample test data
const mockAdvocates: Advocate[] = [
  {
    firstName: "John (not Johnson)",
    lastName: "Doe",
    city: "New York",
    specialties: ["Cardiology", "Internal Medicine"],
    yearsOfExperience: 10,
    phoneNumber: "555-0101",
    degree: "MD",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    city: "Boston",
    specialties: ["Pediatrics"],
    yearsOfExperience: 5,
    phoneNumber: "555-0202",
    degree: "MD",
  },
  {
    firstName: "Alex",
    lastName: "Johnson",
    city: "Chicago",
    specialties: ["Neurology", "Psychiatry"],
    yearsOfExperience: 8,
    phoneNumber: "555-0303",
    degree: "MD",
  },
];

describe("useFilteredAdvocates", () => {
  it("should return all advocates when no filter applied", () => {
    const { result } = renderHook(() => useFilteredAdvocates(mockAdvocates));
    expect(result.current.filteredAdvocates).toEqual(mockAdvocates);
  });

  it("should filter by firstName", () => {
    const { result } = renderHook(() => useFilteredAdvocates(mockAdvocates));

    act(() => {
      result.current.filter("John (not Johnson)");
    });

    expect(result.current.filteredAdvocates).toEqual([mockAdvocates[0]]);
  });

  it("should filter by lastName", () => {
    const { result } = renderHook(() => useFilteredAdvocates(mockAdvocates));

    act(() => {
      result.current.filter("Smith");
    });

    expect(result.current.filteredAdvocates).toEqual([mockAdvocates[1]]);
  });

  it("should filter by city", () => {
    const { result } = renderHook(() => useFilteredAdvocates(mockAdvocates));

    act(() => {
      result.current.filter("Boston");
    });

    expect(result.current.filteredAdvocates).toEqual([mockAdvocates[1]]);
  });

  it("should filter by specialty", () => {
    const { result } = renderHook(() => useFilteredAdvocates(mockAdvocates));

    act(() => {
      result.current.filter("Psychiatry");
    });

    expect(result.current.filteredAdvocates).toEqual([mockAdvocates[2]]);
  });

  it("should filter by years of experience", () => {
    const { result } = renderHook(() => useFilteredAdvocates(mockAdvocates));

    act(() => {
      result.current.filter("10");
    });

    expect(result.current.filteredAdvocates).toEqual([mockAdvocates[0]]);
  });

  it("should reset filters", () => {
    const { result } = renderHook(() => useFilteredAdvocates(mockAdvocates));

    // Apply filter
    act(() => {
      result.current.filter("John");
    });

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.filteredAdvocates).toEqual(mockAdvocates);
  });

  it("should return empty array when no matches found", () => {
    const { result } = renderHook(() => useFilteredAdvocates(mockAdvocates));

    act(() => {
      result.current.filter("NonExistent");
    });

    expect(result.current.filteredAdvocates).toEqual([]);
  });
});
