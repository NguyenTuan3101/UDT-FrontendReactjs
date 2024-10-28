import React, { useState, useRef, useEffect } from "react";
import { evaluate } from "mathjs";
const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const displayRef = useRef<HTMLDivElement>(null);

  // Function to handle button clicks
  const handleButtonClick = (value: string) => {
    if (value === "AC") {
      setDisplayValue("0");
    } else if (value === "C") {
      setDisplayValue(displayValue.slice(0, -1) || "0");
    } else if (value === "=") {
      try {
        // Use mathjs to evaluate the expression
        const result = evaluate(
          displayValue.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-"),
        );
        // Round the result to a fixed number of decimal places
        const roundedResult = Math.round(result * 1000000000) / 1000000000;
        setHistory([...history, `${displayValue} = ${roundedResult}`]);
        setDisplayValue(String(roundedResult));
      } catch {
        setDisplayValue("Error");
      }
    } else if (value === ".") {
      const lastNumber = displayValue.split(/[+\-×÷]/).pop();
      // Allow a decimal point if the last number doesn't have one or if the last character is an operator
      if (!lastNumber || !lastNumber.includes(".")) {
        setDisplayValue((prev) => prev + value);
      }
    } else {
      setDisplayValue((prev) => (prev === "0" ? value : prev + value));
    }
  };

  // Function to handle display click for editing
  const handleDisplayClick = () => {
    if (displayRef.current) {
      displayRef.current.contentEditable = "true";
      displayRef.current.focus();
    }
  };

  // Function to handle click outside the calculator
  const handleClickOutside = (event: MouseEvent) => {
    if (
      displayRef.current &&
      !displayRef.current.contains(event.target as Node)
    ) {
      displayRef.current.contentEditable = "false";
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="calculator">
      <div className="calculator-header">
        <div className="button red"></div>
        <div className="button yellow"></div>
        <div className="button green"></div>
      </div>
      <div className="display" ref={displayRef} onClick={handleDisplayClick}>
        {displayValue}
      </div>
      <div className="buttons">
        <button
          className="btn-dark"
          onClick={() => handleButtonClick(displayValue === "0" ? "AC" : "C")}
        >
          {displayValue === "0" ? "AC" : "C"}
        </button>
        <button className="btn-dark" onClick={() => handleButtonClick("+/-")}>
          +/-
        </button>
        <button className="btn-dark" onClick={() => handleButtonClick("%")}>
          %
        </button>
        <button className="btn-orange" onClick={() => handleButtonClick("÷")}>
          ÷
        </button>

        <button className="btn-light" onClick={() => handleButtonClick("7")}>
          7
        </button>
        <button className="btn-light" onClick={() => handleButtonClick("8")}>
          8
        </button>
        <button className="btn-light" onClick={() => handleButtonClick("9")}>
          9
        </button>
        <button className="btn-orange" onClick={() => handleButtonClick("×")}>
          ×
        </button>

        <button className="btn-light" onClick={() => handleButtonClick("4")}>
          4
        </button>
        <button className="btn-light" onClick={() => handleButtonClick("5")}>
          5
        </button>
        <button className="btn-light" onClick={() => handleButtonClick("6")}>
          6
        </button>
        <button className="btn-orange" onClick={() => handleButtonClick("−")}>
          −
        </button>

        <button className="btn-light" onClick={() => handleButtonClick("1")}>
          1
        </button>
        <button className="btn-light" onClick={() => handleButtonClick("2")}>
          2
        </button>
        <button className="btn-light" onClick={() => handleButtonClick("3")}>
          3
        </button>
        <button className="btn-orange" onClick={() => handleButtonClick("+")}>
          +
        </button>

        <button
          className="btn-light btn-zero"
          onClick={() => handleButtonClick("0")}
        >
          0
        </button>
        <button className="btn-light" onClick={() => handleButtonClick(".")}>
          .
        </button>
        <button className="btn-orange" onClick={() => handleButtonClick("=")}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
