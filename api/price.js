import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

export default function handler(req, res) {
  try {
    const { age, family, coverage } = req.query;
    const inputAge = Number(age);

    if (!inputAge || !family || !coverage) {
      return res.status(400).json({
        error: "age, family, and coverage are required",
      });
    }

    const normalize = (v) =>
      String(v).trim().toLowerCase().replace(/\s+/g, " ");

    const ageInRange = (range, age) => {
      const cleaned = range.replace(/[–—]/g, "-");
      const match = cleaned.match(/(\d+)\s*-\s*(\d+)/);
      if (!match) return false;

      const min = Number(match[1]);
      const max = Number(match[2]);
      return age >= min && age <= max;
    };

    const filePath = path.join(process.cwd(), "data", "rater.xlsx");
    const fileBuffer = fs.readFileSync(filePath);

    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const row = rows.find(
      (r) =>
        ageInRange(String(r.Age || r["Age Band"]), inputAge) &&
        normalize(r["Family Composition"]) === normalize(family)
    );

    if (!row) {
      return res.status(404).json({
        error: "No matching rate found",
      });
    }

    const coverageKey = Object.keys(row).find(
      (k) => normalize(k) === normalize(coverage)
    );

    if (!coverageKey) {
      return res.status(404).json({
        error: `Coverage '${coverage}' not found`,
      });
    }

    return res.status(200).json({
      age: inputAge,
      family,
      coverage,
      price: row[coverageKey],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
