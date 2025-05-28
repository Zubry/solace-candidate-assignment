import { getAdvocates } from "./service";
import { fetchAdvocates } from "./repository";

jest.mock("./repository");

describe("getAdvocates", () => {
  const mockFetchAdvocates = fetchAdvocates as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns advocates and the next cursor when data is available", async () => {
    const mockData = [
      { id: 1, name: "Advocate 1" },
      { id: 2, name: "Advocate 2" },
    ];
    mockFetchAdvocates.mockResolvedValue(mockData);

    const result = await getAdvocates(0, 10);

    expect(mockFetchAdvocates).toHaveBeenCalledWith(0, 10);
    expect(result).toEqual({
      data: mockData,
      nextCursor: 2, // Last item's ID
    });
  });

  it("returns an empty array and null next cursor when no data is available", async () => {
    mockFetchAdvocates.mockResolvedValue([]);

    const result = await getAdvocates(0, 10);

    expect(mockFetchAdvocates).toHaveBeenCalledWith(0, 10);
    expect(result).toEqual({
      data: [],
      nextCursor: null,
    });
  });

  it("handles errors thrown by the repository", async () => {
    mockFetchAdvocates.mockRejectedValue(new Error("Database error"));

    await expect(getAdvocates(0, 10)).rejects.toThrow("Database error");

    expect(mockFetchAdvocates).toHaveBeenCalledWith(0, 10);
  });
});
