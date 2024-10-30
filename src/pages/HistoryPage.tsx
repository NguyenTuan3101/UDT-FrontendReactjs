import React, { useEffect, useState } from "react";
import historyApi from "../api/historyApi"; // Import your API method
import "../styles/Table.scss"; // Add custom styling if needed
// Define the columns for date, time, and calculator
const columns = [
  { name: "date", text: "Date", style: { minWidth: "200px" } },
  { name: "time", text: "Time", style: { minWidth: "200px" } },
  { name: "calculator", text: "Calculator", style: { minWidth: "400px" } },
];

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);

  // Fetch data from API
  const getHistory = async () => {
    try {
      const response = await historyApi.getHistory();
      setHistoryData(response.history || []); // Ensure response is an array
    } catch (error) {
      console.error("Error loading history:", error);
      setHistoryData([]); // Reset to empty array on error
    }
  };

  useEffect(() => {
    getHistory();
    const interval = setInterval(() => {
      getHistory();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="table">
        <div className="table-header">
          <div className="header-item">
            {columns.map((col) => (
              <a key={col.name} className="filter-link" style={col.style}>
                {col.text}
              </a>
            ))}
          </div>
        </div>
        <div className="table-content">
          {historyData.map((item, index) => (
            <div className="table-row" key={index}>
              {columns.map((col) => (
                <div key={col.name} className="table-data" style={col.style}>
                  {item[col.name]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
