// src/hooks/useCalculator.ts
import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import History from "../interface/history";

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [historyCalculator, setHistoryCalculator] = useState<
    { id: number; entry: string }[]
  >([]);
  const [nextId, setNextId] = useState(1); // Trạng thái cho ID tiếp theo

  const handleButtonClick = (value: string) => {
    if (value === "AC") {
      setDisplayValue("0");
    } else if (value === "C") {
      setDisplayValue(displayValue.slice(0, -1) || "0");
    } else if (value === "=") {
      try {
        let expression = displayValue
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-");
        expression = expression.replace(/(\d+)%/g, "($1/100)");

        const result = evaluate(expression);
        const roundedResult = Math.round(result * 1000000000) / 1000000000;

        // Get the current date and time
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        // Create the formatted history entry
        const History = {
          id: nextId, // Sử dụng ID tiếp theo
          date: date,
          time: time,
          calculator: `${displayValue} = ${roundedResult}`,
        };

        // Thêm mục lịch sử vào trạng thái
        setHistoryCalculator((prev) => [
          ...prev,
          { id: nextId, entry: JSON.stringify(History) },
        ]);
        setDisplayValue(String(roundedResult));

        // Lưu lịch sử vào tệp
        saveHistoryToFile(History);

        // Tăng ID tiếp theo
        setNextId((prev) => prev + 1);
      } catch {
        setDisplayValue("Error");
      }
    } else if (value === ".") {
      const lastNumber = displayValue.split(/[+\-×÷]/).pop();
      if (!lastNumber || !lastNumber.includes(".")) {
        setDisplayValue((prev) => prev + value);
      }
    } else {
      const lastChar = displayValue.slice(-1);
      if ("+-×÷".includes(lastChar) && "+-×÷".includes(value)) return;

      setDisplayValue((prev) => (prev === "0" ? value : prev + value));
    }
  };

  const saveHistoryToFile = async (History: History) => {
    try {
      await fetch("http://localhost:5000/save-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(History),
      });
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  const loadHistoryFromFile = async () => {
    try {
      const response = await fetch("http://localhost:5000/load-history");
      const data: History[] = await response.json(); // Specify the expected type here

      // Chuyển đổi dữ liệu thành dạng có ID
      const historyWithId = data.map((entry: History) => ({
        id: entry.id, // Sử dụng ID từ mục lịch sử
        entry: entry.calculator, // Lưu giá trị calculator cho entry
      }));

      setHistoryCalculator(historyWithId);
      setNextId(
        historyWithId.length > 0
          ? Math.max(...historyWithId.map((e) => e.id)) + 1
          : 1,
      ); // Cập nhật ID tiếp theo
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  useEffect(() => {
    loadHistoryFromFile(); // Load history when the component mounts
  }, []);

  return {
    displayValue,
    setDisplayValue,
    historyCalculator,
    handleButtonClick,
    saveHistoryToFile,
    loadHistoryFromFile,
  };
};
