// useAdvocates.test.ts
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useAdvocates } from "./useAdvocates";

describe("useAdvocates", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("returns undefined on the first render and advocate data on the second render", async () => {
    const mockData = [{ id: 1, name: "Test" }];
    
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: mockData }),
    });

    const { result } = renderHook(() => useAdvocates());

    expect(result.current).toEqual([]);

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("/api/advocates");
  });
});
