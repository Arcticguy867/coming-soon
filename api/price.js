import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

export default function handler(req, res) {
  const { age, family, coverage } = req.query;

  if (!age || !family || !coverage) {
    return res.status(400).json({
      error: "age, family, and coverage are required",
    });
  }

  // Load Excel file
  const filePath = path.join(process.cwd(), "data", "rater.xlsx");
  const fileBuffer = fs.readFileSync(filePath);

  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert sheet to JSON
  const rows = XLSX.utils.sheet_to_json(sheet);

  // Find matching row
  const row = rows.find(
    (r) => String(r.Age) === String(age) && r["Family Composition"] === family
  );

  if (!row) {
    return res.status(404).json({
      error: "No matching rate found",
    });
  }

  const price = row[coverage];

  if (!price) {
    return res.status(404).json({
      error: `Coverage '${coverage}' not found`,
    });
  }

  return res.status(200).json({
    age,
    family,
    coverage,
    price,
  });
}
