import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

export default function handler(req, res) {
  try {
    const { age, family, coverage } = req.query;

    if (!age || !family || !coverage) {
      return res.status(400).json({
        error: "age, family, and coverage are required",
      });
    }

    // Normalize helper (Excel-proof)
    const normalize = (v) =>
      String(v).trim().toLowerCase().replace(/\s+/g, " ");

    // Load Excel file (read-only)
    const filePath = path.join(process.cwd(), "data", "rater.xlsx");
    const fileBuffer = fs.readFileSync(filePath);

    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const rows = XLSX.utils.sheet_to_json(sheet);

    if (!rows.length) {
      return res.status(500).json({
        error: "Excel sheet is empty",
      });
    }

    // Find matching row (age + family composition)
    const row = rows.find(
      (r) =>
        normalize(r.Age) === normalize(age) &&
        normalize(r["Family Composition"]) === normalize(family)
    );

    if (!row) {
      return res.status(404).json({
        error: "No matching rate found",
      });
    }

    // Find matching coverage column dynamically
    const coverageKey = Object.keys(row).find(
      (key) => normalize(key) === normalize(coverage)
    );

    if (!coverageKey) {
      return res.status(404).json({
        error: `Coverage '${coverage}' not found`,
      });
    }

    const price = row[coverageKey];

    return res.status(200).json({
      age: Number(age),
      family,
      coverage,
      price,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
