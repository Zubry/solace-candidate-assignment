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

    expect(result.current.status).toEqual("loading");
    expect(result.current.advocates).toEqual([]);
    expect(result.current.error).toBeNull();

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.status).toEqual("success");
    expect(result.current.advocates).toEqual(mockData);
    expect(result.current.error).toBeNull();

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/advocates?cursor=0&limit=100"
    );
  });

  it("returns handles errors", async () => {
    const mockData = [{ id: 1, name: "Test" }];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ data: mockData }),
    });

    const { result } = renderHook(() => useAdvocates());

    expect(result.current.status).toEqual("loading");
    expect(result.current.advocates).toEqual([]);
    expect(result.current.error).toBeNull();

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.status).toEqual("error");

    expect(fetch).toHaveBeenCalledWith("/api/advocates?cursor=0&limit=100");
  });

  it("supports cursor pagination", async () => {
    const mockData = [{ id: 1, name: "Test" }];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: mockData }),
    });

    renderHook(() => useAdvocates(10, 50));

    await act(async () => {
      await Promise.resolve();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/advocates?cursor=10&limit=50"
    );
  });
});
