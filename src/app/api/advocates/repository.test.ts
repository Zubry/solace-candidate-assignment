import { fetchAdvocates } from "./repository";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { gt } from "drizzle-orm";

jest.mock("../../../db", () => ({
  select: jest.fn(() => ({
    from: jest.fn(() => ({
      limit: jest.fn(() => ({
        where: jest.fn(),
      })),
    })),
  })),
}));

describe("fetchAdvocates", () => {
  const mockQuery = {
    from: jest.fn(),
    limit: jest.fn(),
    where: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (db.select as jest.Mock).mockReturnValue(mockQuery);
    mockQuery.from.mockReturnValue(mockQuery);
    mockQuery.limit.mockReturnValue(mockQuery);
    mockQuery.where.mockReturnValue(mockQuery);
  });

  it("fetches advocates without a cursor", async () => {
    const mockData = [{ id: 1, name: "Test Advocate" }];
    mockQuery.limit.mockResolvedValue(mockData);

    const result = await fetchAdvocates(0, 10);

    expect(db.select).toHaveBeenCalled();
    expect(mockQuery.from).toHaveBeenCalledWith(advocates);
    expect(mockQuery.limit).toHaveBeenCalledWith(10);
    expect(mockQuery.where).not.toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it("fetches advocates with a cursor", async () => {
    const mockData = [{ id: 2, name: "Another Advocate" }];
    mockQuery.where.mockResolvedValue(mockData);

    const result = await fetchAdvocates(1, 10);

    expect(db.select).toHaveBeenCalled();
    expect(mockQuery.from).toHaveBeenCalledWith(advocates);
    expect(mockQuery.limit).toHaveBeenCalledWith(10);
    expect(mockQuery.where).toHaveBeenCalledWith(gt(advocates.id, 1));
    expect(result).toEqual(mockData);
  });

  it("returns an empty array if no advocates are found", async () => {
    mockQuery.limit.mockResolvedValue([]);

    const result = await fetchAdvocates(0, 10);

    expect(db.select).toHaveBeenCalled();
    expect(mockQuery.from).toHaveBeenCalledWith(advocates);
    expect(mockQuery.limit).toHaveBeenCalledWith(10);
    expect(result).toEqual([]);
  });
});
