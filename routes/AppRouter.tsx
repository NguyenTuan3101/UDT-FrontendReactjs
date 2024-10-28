import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calculator from "../pages/Calculator";
import HomePage from "../pages/HomePage";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/calculator" element={<Calculator />} />
    </Routes>
  </Router>
);

export default AppRouter;
