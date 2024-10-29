// src/components/Calculator.tsx
import React, { useRef, useEffect } from "react";
import { useCalculator } from "../hooks/useCalculator";
import Display from "./Display";
import Button from "./Button";
import "../styles/Calculator.scss";
const Calculator = () => {
  const { displayValue, handleButtonClick } = useCalculator();
  const displayRef = useRef<HTMLDivElement>(null);

  const handleDisplayClick = () => {
    if (displayRef.current) {
      displayRef.current.contentEditable = "true";
      displayRef.current.focus();
    }
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
        displayValue={displayValue}
        onClick={handleDisplayClick}
        ref={displayRef}
      />
      <div className="buttons">
        {[
          "AC",
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
