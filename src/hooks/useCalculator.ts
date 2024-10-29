// src/hooks/useCalculator.ts
import { useState } from "react";
import { evaluate } from "mathjs";

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [historyCalculator, setHistoryCalculator] = useState<string[]>([]);

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
        setHistoryCalculator([
          ...historyCalculator,
          `${displayValue} = ${roundedResult}`,
        ]);
        setDisplayValue(String(roundedResult));
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

  return {
    displayValue,
    setDisplayValue,
    historyCalculator,
    setHistoryCalculator,
    handleButtonClick,
  };
};
