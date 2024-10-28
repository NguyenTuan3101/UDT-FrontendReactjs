import React from "react";

const HomePage = () => {
  return (
    <div className="calculator">
      <div className="calculator-header">
        <div className="button red"></div>
        <div className="button yellow"></div>
        <div className="button green"></div>
      </div>
      <div className="display">0</div>
      <div className="buttons">
        <button className="btn-dark">AC</button>
        <button className="btn-dark">+/-</button>
        <button className="btn-dark">%</button>
        <button className="btn-orange">÷</button>

        <button className="btn-light">7</button>
        <button className="btn-light">8</button>
        <button className="btn-light">9</button>
        <button className="btn-orange">×</button>

        <button className="btn-light">4</button>
        <button className="btn-light">5</button>
        <button className="btn-light">6</button>
        <button className="btn-orange">−</button>

        <button className="btn-light">1</button>
        <button className="btn-light">2</button>
        <button className="btn-light">3</button>
        <button className="btn-orange">+</button>

        <button className="btn-light btn-zero">0</button>
        <button className="btn-light">,</button>
        <button className="btn-orange">=</button>
      </div>
    </div>
  );
};

export default HomePage;
