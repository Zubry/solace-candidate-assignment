import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("should render with empty value", () => {
    render(<SearchBar searchTerm="" onChange={() => {}} onReset={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("should call onChange when typing", () => {
    const mockOnChange = jest.fn();
    render(
      <SearchBar searchTerm="" onChange={mockOnChange} onReset={() => {}} />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "cardio" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
  });

  it("should display current value", () => {
    render(
      <SearchBar
        searchTerm="test value"
        onChange={() => {}}
        onReset={() => {}}
      />
    );
    expect(screen.getByRole("textbox")).toHaveValue("test value");
  });
});
