import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CalculatorPage from "../pages/CalculatorPage";
import HomePage from "../pages/HomePage";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/calculator" element={<CalculatorPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
