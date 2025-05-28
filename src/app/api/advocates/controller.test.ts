import { getAdvocatesController } from "./controller";
import { getAdvocates } from "./service";

jest.mock("./service");

describe("getAdvocatesController", () => {
  const mockGetAdvocates = getAdvocates as jest.Mock;

  global.Response = class {
    status: number;
    
    static json(data: any) {
      return {
        status: 200,
        json: async () => data,
        text: async () => JSON.stringify(data),
      };
    }

    constructor(public body: string, public init: { status: number }) {
      this.status = init.status;
    }

    async text() {
      return this.body;
    }
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns advocates and nextCursor when data is available", async () => {
    const mockRequest = {
      url: "http://localhost/api/advocates?cursor=0&limit=10",
    };
    const mockData = [
      { id: 1, name: "Advocate 1" },
      { id: 2, name: "Advocate 2" },
    ];
    mockGetAdvocates.mockResolvedValue({ data: mockData, nextCursor: 2 });

    const response = await getAdvocatesController(mockRequest as any);
    const jsonResponse = await response.json();

    expect(mockGetAdvocates).toHaveBeenCalledWith(0, 10);
    expect(response.status).toBe(200);
    expect(jsonResponse).toEqual({
      data: mockData,
      nextCursor: 2,
    });
  });

  it("returns an empty array and null nextCursor when no data is available", async () => {
    const mockRequest = {
      url: "http://localhost/api/advocates?cursor=0&limit=10",
    };
    mockGetAdvocates.mockResolvedValue({ data: [], nextCursor: null });

    const response = await getAdvocatesController(mockRequest as any);
    const jsonResponse = await response.json();

    expect(mockGetAdvocates).toHaveBeenCalledWith(0, 10);
    expect(response.status).toBe(200);
    expect(jsonResponse).toEqual({
      data: [],
      nextCursor: null,
    });
  });

  it("handles errors thrown by the service", async () => {
    const mockRequest = {
      url: "http://localhost/api/advocates?cursor=0&limit=10",
    };
    mockGetAdvocates.mockRejectedValue(new Error("Service error"));

    const response = await getAdvocatesController(mockRequest as any);

    expect(mockGetAdvocates).toHaveBeenCalledWith(0, 10);
    console.log(response);
    expect(response.status).toBe(500);
    const textResponse = await response.text();
    expect(textResponse).toBe("Service error");
  });

  it("parses query parameters correctly", async () => {
    const mockRequest = {
      url: "http://localhost/api/advocates?cursor=5&limit=20",
    };
    const mockData = [{ id: 6, name: "Advocate 6" }];
    mockGetAdvocates.mockResolvedValue({ data: mockData, nextCursor: 6 });

    const response = await getAdvocatesController(mockRequest as any);
    const jsonResponse = await response.json();

    expect(mockGetAdvocates).toHaveBeenCalledWith(5, 20);
    expect(response.status).toBe(200);
    expect(jsonResponse).toEqual({
      data: mockData,
      nextCursor: 6,
    });
  });

  it("defaults limit to 100 if not provided", async () => {
    const mockRequest = {
      url: "http://localhost/api/advocates?cursor=0",
    };
    const mockData = [{ id: 1, name: "Advocate 1" }];
    mockGetAdvocates.mockResolvedValue({ data: mockData, nextCursor: 1 });

    const response = await getAdvocatesController(mockRequest as any);
    const jsonResponse = await response.json();

    expect(mockGetAdvocates).toHaveBeenCalledWith(0, 100);
    expect(response.status).toBe(200);
    expect(jsonResponse).toEqual({
      data: mockData,
      nextCursor: 1,
    });
  });
});
