import { renderHook, act } from "@testing-library/react";
import { useCalculator } from "../hooks/useCalculator";
import historyApi from "../api/historyApi";
import { jest } from "@jest/globals";
// Mock the history API
jest.mock("../api/historyApi");

describe("useCalculator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize displayValue to '0'", () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.displayValue).toBe("0");
  });

  it("should handle 'AC' button by resetting displayValue to '0'", () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.handleButtonClick("5"));
    act(() => result.current.handleButtonClick("AC"));
    expect(result.current.displayValue).toBe("0");
  });

  it("should handle 'C' button by removing the last character", () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.handleButtonClick("5"));
    act(() => result.current.handleButtonClick("3"));
    act(() => result.current.handleButtonClick("C"));
    expect(result.current.displayValue).toBe("5");
  });

  it("should calculate expression correctly on '='", async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.handleButtonClick("4"));
    act(() => result.current.handleButtonClick("×"));
    act(() => result.current.handleButtonClick("2"));
    await act(async () => result.current.handleButtonClick("="));

    expect(result.current.displayValue).toBe("8");
    expect(historyApi.saveHistory).toHaveBeenCalled();
  });

  it("should handle decimal point correctly", () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.handleButtonClick("3"));
    act(() => result.current.handleButtonClick("."));
    act(() => result.current.handleButtonClick("5"));
    expect(result.current.displayValue).toBe("3.5");
  });

  it("should prevent multiple operators in a row", () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.handleButtonClick("5"));
    act(() => result.current.handleButtonClick("+"));
    act(() => result.current.handleButtonClick("+"));
    expect(result.current.displayValue).toBe("5+");
  });

  it("should handle percentage calculations correctly", async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.handleButtonClick("50"));
    act(() => result.current.handleButtonClick("%"));
    await act(async () => result.current.handleButtonClick("="));

    expect(result.current.displayValue).toBe("0.5");
  });

  it("should handle error in expression evaluation", async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.handleButtonClick("5"));
    act(() => result.current.handleButtonClick("/"));
    act(() => result.current.handleButtonClick("0"));
    await act(async () => result.current.handleButtonClick("="));

    expect(result.current.displayValue).toBe("Infinity");
  });

  it("should calculate '2×3 - 5/2' correctly", async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.handleButtonClick("2"));
    act(() => result.current.handleButtonClick("×"));
    act(() => result.current.handleButtonClick("3"));
    act(() => result.current.handleButtonClick("-"));
    act(() => result.current.handleButtonClick("5"));
    act(() => result.current.handleButtonClick("/"));
    act(() => result.current.handleButtonClick("2"));
    await act(async () => result.current.handleButtonClick("="));

    expect(result.current.displayValue).toBe("4.5");
  });

  it("should handle division by zero in '2/0 + 16'", async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.handleButtonClick("2"));
    act(() => result.current.handleButtonClick("/"));
    act(() => result.current.handleButtonClick("0"));
    act(() => result.current.handleButtonClick("+"));
    act(() => result.current.handleButtonClick("16"));
    await act(async () => result.current.handleButtonClick("="));

    expect(result.current.displayValue).toBe("Infinity");
  });

  it("should calculate '2×0 - 4×2 + 2×0.5' correctly", async () => {
    const { result } = renderHook(() => useCalculator());
    act(() => result.current.handleButtonClick("2"));
    act(() => result.current.handleButtonClick("×"));
    act(() => result.current.handleButtonClick("0"));
    act(() => result.current.handleButtonClick("-"));
    act(() => result.current.handleButtonClick("4"));
    act(() => result.current.handleButtonClick("×"));
    act(() => result.current.handleButtonClick("2"));
    act(() => result.current.handleButtonClick("+"));
    act(() => result.current.handleButtonClick("2"));
    act(() => result.current.handleButtonClick("×"));
    act(() => result.current.handleButtonClick("0.5"));
    await act(async () => result.current.handleButtonClick("="));

    expect(result.current.displayValue).toBe("-6");
  });

  it("should save history to file correctly", async () => {
    const { result } = renderHook(() => useCalculator());

    const historyData = {
      id: "mockId",
      date: "2024-10-30",
      time: "10:00:00",
      calculator: "5+3=8",
    };

    await act(async () => result.current.saveHistoryToFile(historyData));
    expect(historyApi.saveHistory).toHaveBeenCalledWith(historyData);
  });
});
