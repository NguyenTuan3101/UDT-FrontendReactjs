// src/hooks/useCalculator.ts
import { useState } from "react";
import { evaluate } from "mathjs";
import History from "../interface/history";
import historyApi from "../api/historyApi";

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState("0");

  const handleButtonClick = (value: string) => {
    if (value === "AC") {
      setDisplayValue("0");
    } else if (value === "C") {
      setDisplayValue(displayValue.slice(0, -1) || "0");
    } else if (value === "+/-") {
      if (displayValue !== "0") {
        setDisplayValue((prev) => {
          return prev.startsWith("-") ? prev.slice(1) : `-${prev}`;
        });
      }
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
        const historyId = `${date}|${time}`;

        // Create the formatted history entry
        const History = {
          id: historyId,
          date: date,
          time: time,
          calculator: `${displayValue} = ${roundedResult}`,
        };
        setDisplayValue(String(roundedResult));

        // Save history to file
        saveHistoryToFile(History);
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

  const saveHistoryToFile = async (history: History) => {
    try {
      const response = await historyApi.saveHistory(history);
      console.log(response);
    } catch (error) {
      console.log("Error saving history:", error);
    }
  };

  return {
    displayValue,
    setDisplayValue,
    handleButtonClick,
    saveHistoryToFile,
  };
};
