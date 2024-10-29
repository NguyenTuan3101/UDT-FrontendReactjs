import React from "react";

interface ButtonProps {
  value: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ value, onClick }) => {
  // Xác định className dựa trên giá trị của value
  const getClassName = () => {
    if (["AC", "C", "+/-", "%"].includes(value)) return "btn-dark";
    if (["÷", "×", "+", "-", "="].includes(value)) return "btn-orange";
    if (value === "0") return "btn-light btn-zero";
    return "btn-light";
  };

  return (
    <button className={`btn ${getClassName()}`} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
