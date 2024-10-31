// src/components/Calculator.tsx
import React, { useRef, useEffect } from "react";
import { useCalculator } from "../hooks/useCalculator";
import Display from "./Display";
import Button from "./Button";
import "../styles/Calculator.scss";

const Calculator = () => {
  const { displayValue, setDisplayValue, handleButtonClick } = useCalculator();
  const displayRef = useRef<HTMLDivElement>(null);

  const handleValueChange = (value: string) => {
    setDisplayValue(value); // Update the display value
  };

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
      <Display
        displayValue={displayValue} onValueChange={handleValueChange}
        ref={displayRef}
      />
      <div className="buttons">
        <Button
          key="AC"
          value={displayValue === "0" ? "AC" : "C"}
          onClick={() => handleButtonClick(displayValue === "0" ? "AC" : "C")}
        />
        {[
          "+/-",
          "%",
          "÷",
          "7",
          "8",
          "9",
          "×",
          "4",
          "5",
          "6",
          "-",
          "1",
          "2",
          "3",
          "+",
          "0",
          ".",
          "=",
        ].map((value) => (
          <Button
            key={value}
            value={value}
            onClick={() => handleButtonClick(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
