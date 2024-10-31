// server.js
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name from the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000; // You can change the port as needed

app.use(cors());

app.use(express.json());

// Endpoint to save history
app.post("/save-history", (req, res) => {
  const { id, date, time, calculator } = req.body;
  const filePath = path.join(
    __dirname,
    "src",
    "history",
    "historyCalculator.json",
  );

  const historyEntry = { id, date, time, calculator };

  fs.readFile(filePath, "utf8", (err, data) => {
    let historyArray = [];

    if (!err) {
      try {
        historyArray = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing history data:", parseError);
      }
    }

    const existingEntry = historyArray.find((entry) => entry.id === id);
    if (existingEntry) {
      return res.status(400).json({
        code: 400,
        message: "History entry with this ID already exists.",
      });
    }

    historyArray.push(historyEntry);

    fs.writeFile(filePath, JSON.stringify(historyArray, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ code: 500, message: "Error saving history" });
      }
      res.status(200).json({
        code: 200,
        message: "History saved successfully",
        history: historyEntry,
      });
    });
  });
});

// Endpoint to load history
app.get("/load-history", (req, res) => {
  const filePath = path.join(
    __dirname,
    "src",
    "history",
    "historyCalculator.json",
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ code: 500, message: "Error reading history" });
    }

    if (!data.trim()) {
      return res
        .status(200)
        .json({ code: 200, message: "History is empty", history: [] });
    }

    try {
      const historyEntries = JSON.parse(data);

      res.status(200).json({ code: 200, history: historyEntries });
    } catch (parseError) {
      return res.status(500).json({
        code: 500,
        message: "Error parsing history data: " + parseError.message,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
