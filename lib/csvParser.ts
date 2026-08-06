export interface ParsedCSV {
  headers: string[];
  types: Record<string, "number" | "category" | "date" | "text">;
  rows: Record<string, string | number>[];
  uniqueValues: Record<string, string[]>;
}

export function parseCSV(csvText: string): ParsedCSV {
  if (!csvText || !csvText.trim()) {
    throw new Error("CSV file is empty.");
  }

  // Parse lines, supporting quotes and comma splits
  const lines: string[][] = [];
  const chars = csvText.trim().split("");
  let currentField = "";
  let insideQuote = false;
  let currentLine: string[] = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const nextChar = chars[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // skip next quote
      } else {
        // Toggle quote state
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      currentLine.push(currentField.trim());
      currentField = "";
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip LF
      }
      currentLine.push(currentField.trim());
      if (currentLine.some(field => field !== "")) {
        lines.push(currentLine);
      }
      currentLine = [];
      currentField = "";
    } else {
      currentField += char;
    }
  }
  // Push last field & line
  if (currentField !== "" || currentLine.length > 0) {
    currentLine.push(currentField.trim());
    if (currentLine.some(field => field !== "")) {
      lines.push(currentLine);
    }
  }

  if (lines.length === 0) {
    throw new Error("No data found in the CSV file.");
  }

  // Find the header row (typically the first row that doesn't look like generic title metadata)
  // 1. Find the maximum column count in the first 15 rows.
  let maxCols = 0;
  for (let i = 0; i < Math.min(lines.length, 15); i++) {
    if (lines[i].length > maxCols) {
      maxCols = lines[i].length;
    }
  }

  // 2. Identify the first row with at least 80% of maxCols that contains transaction keywords.
  let headerRowIdx = -1;
  for (let i = 0; i < Math.min(lines.length, 15); i++) {
    const line = lines[i];
    if (line.length >= Math.max(2, maxCols * 0.8)) {
      const stringValues = line.map(v => String(v || "").toLowerCase().replace(/[\s_]/g, ""));
      const hasAmount = stringValues.some(v => ["amount", "paid", "total", "inr", "rs", "value", "price", "credit", "fee"].some(kw => v.includes(kw)));
      const hasDate = stringValues.some(v => ["date", "time", "timestamp", "created"].some(kw => v.includes(kw)));
      
      if (hasAmount || hasDate) {
        headerRowIdx = i;
        break;
      }
    }
  }

  // 3. Fallback: If no header found by keywords, use the row with the most columns
  if (headerRowIdx === -1) {
    for (let i = 0; i < Math.min(lines.length, 15); i++) {
      if (lines[i].length === maxCols) {
        headerRowIdx = i;
        break;
      }
    }
  }

  if (headerRowIdx === -1) {
    // Fallback to row 0 if no header found
    headerRowIdx = 0;
  }

  const headers = lines[headerRowIdx].map(h => h.replace(/^["']|["']$/g, "").trim());
  const rows: Record<string, string | number>[] = [];

  // Parse remaining rows into objects
  for (let i = headerRowIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.length === 0) continue;

    const rowObj: Record<string, string | number> = {};
    headers.forEach((header, colIdx) => {
      const valStr = line[colIdx] !== undefined ? line[colIdx] : "";
      // Clean quotes
      const cleanVal = valStr.replace(/^["']|["']$/g, "").trim();

      // Check if it's a number
      const numVal = cleanVal.replace(/[^0-9.-]/g, "");
      const parsedNum = parseFloat(numVal);
      if (cleanVal !== "" && !isNaN(parsedNum) && String(parsedNum) === numVal) {
        rowObj[header] = parsedNum;
      } else {
        rowObj[header] = cleanVal;
      }
    });
    rows.push(rowObj);
  }

  // Detect Column Types
  const types: Record<string, "number" | "category" | "date" | "text"> = {};
  const uniqueValues: Record<string, string[]> = {};

  headers.forEach(header => {
    const vals = rows.map(r => r[header]).filter(v => v !== undefined && v !== null && v !== "");
    const uniqueValsSet = new Set(vals.map(v => String(v)));
    uniqueValues[header] = Array.from(uniqueValsSet).sort();

    // Determine type
    let isNumber = true;
    let isDate = false;

    if (vals.length > 0) {
      // Check numbers
      isNumber = vals.every(v => typeof v === "number" || !isNaN(parseFloat(String(v).replace(/[^0-9.-]/g, ""))));

      // Check dates
      const dateSample = vals.slice(0, 5).map(v => String(v));
      isDate = dateSample.some(v => (v.includes("-") || v.includes("/")) && !isNaN(Date.parse(v)));
    } else {
      isNumber = false;
    }

    if (isNumber) {
      types[header] = "number";
      // Convert remaining string representations of numbers to floats just in case
      rows.forEach(r => {
        if (r[header] !== undefined && typeof r[header] !== "number") {
          const parsed = parseFloat(String(r[header]).replace(/[^0-9.-]/g, ""));
          r[header] = isNaN(parsed) ? 0 : parsed;
        }
      });
    } else if (isDate) {
      types[header] = "date";
    } else if (uniqueValsSet.size <= 25) {
      types[header] = "category";
    } else {
      types[header] = "text";
    }
  });

  return {
    headers,
    types,
    rows,
    uniqueValues,
  };
}
