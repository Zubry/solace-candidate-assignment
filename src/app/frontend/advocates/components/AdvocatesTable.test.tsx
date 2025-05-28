import { render, screen, within } from "@testing-library/react";
import {AdvocatesTable} from "./AdvocatesTable";
import { Advocate } from "../types/Advocate";

// Sample test data
const mockAdvocates: Advocate[] = [
  {
    firstName: "John",
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
];

describe("AdvocatesTable", () => {
  it("should render a table with headers", () => {
    render(<AdvocatesTable advocates={mockAdvocates} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("Specialties")).toBeInTheDocument();
    expect(screen.getByText("Years of Experience")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
  });

  it("should display all advocates in the table", () => {
    render(<AdvocatesTable advocates={mockAdvocates} />);

    const rows = screen.getAllByRole("row");
    // +1 for header row
    expect(rows).toHaveLength(mockAdvocates.length + 1);

    mockAdvocates.forEach((advocate) => {
      expect(screen.getByText(advocate.firstName)).toBeInTheDocument();
      expect(screen.getByText(advocate.lastName)).toBeInTheDocument();
    });
  });

  it("should render years of experience", () => {
    render(<AdvocatesTable advocates={mockAdvocates} />);

    const janesRow = screen.getByText("Jane").closest("tr");
    if (janesRow) {
      expect(within(janesRow).getByText("5")).toBeInTheDocument();
    }
  });
});
