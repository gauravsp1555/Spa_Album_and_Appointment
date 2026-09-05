"use client";

import React, { useState, useMemo, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { parseCSV, ParsedCSV } from "@/lib/csvParser";
import * as XLSX from "xlsx";
import {
  Upload,
  FileSpreadsheet,
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  Search,
  SlidersHorizontal,
  X,
  Database,
  ArrowUpDown,
  RefreshCw,
  Info,
  Sparkles,
  Maximize2,
  Minimize2,
  Users
} from "lucide-react";

// Pre-defined demo datasets
const DEMO_DATASETS = {
  salon: {
    name: "PHA Salon Bookings & Revenue",
    description: "Sample transactions, grooming services, hair treatments, and specialist earnings.",
    csv: `Date,Customer,Service,Specialist,Price,Status
2026-08-01,Aditi Sharma,Haircut & Taper,Rahul,1200,Completed
2026-08-01,Amit Patel,Beard Sculpting,Rahul,800,Completed
2026-08-01,Priya Nair,Hair Coloring,Sarah,3500,Completed
2026-08-02,Vikram Singh,Royal Pompadour,Sarah,1500,Completed
2026-08-02,Rohan Mehta,Drop Fade,Rahul,1000,Completed
2026-08-02,Neha Gupta,Luxury Spa Pedicure,Lisa,2200,Completed
2026-08-03,Karan Johar,Textured Crop,Sarah,1200,Completed
2026-08-03,Sneha Reddy,Hair Coloring,Sarah,3800,Completed
2026-08-03,Anil Kapoor,Silver Taper,Rahul,1500,Completed
2026-08-04,Rahul Dravid,Executive Grooming,Lisa,2500,Completed
2026-08-04,Sanjay Dutt,Royal Pompadour,Sarah,1500,Completed
2026-08-04,Ranbir Kapoor,Textured Quiff,Rahul,1200,Completed
2026-08-05,Deepika Padukone,Facial Treatment,Lisa,4500,Completed
2026-08-05,Alia Bhatt,Luxury Spa Pedicure,Lisa,2200,Completed`
  },
  ecommerce: {
    name: "E-commerce Sales Performance",
    description: "Product categories, orders, regional performance, target comparison.",
    csv: `Month,Product Category,Sales (USD),Target (USD),Orders,Region
2026-01,Electronics,45000,40000,320,North
2026-01,Fashion,28000,30000,560,East
2026-01,Home Decor,15000,12000,180,West
2026-02,Electronics,52000,42000,380,North
2026-02,Fashion,31000,31000,610,East
2026-02,Home Decor,18000,13000,210,West
2026-03,Electronics,58000,45000,410,North
2026-03,Fashion,35000,32000,690,East
2026-03,Home Decor,22000,15000,240,West
2026-04,Electronics,49000,46000,350,North
2026-04,Fashion,42000,35000,820,East
2026-04,Home Decor,25000,18000,280,West
2026-05,Electronics,63000,48000,450,North
2026-05,Fashion,49000,38000,980,East
2026-05,Home Decor,29000,20000,320,West`
  }
};

export default function Dashboard() {
  const [data, setData] = useState<ParsedCSV | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configuration states for charts
  const [groupByField, setGroupByField] = useState<string>("");
  const [aggregateField, setAggregateField] = useState<string>("");
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [isChartExpanded, setIsChartExpanded] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);

  // Cohort loyalty configuration
  const [customerHeader, setCustomerHeader] = useState<string>("");

  // Filter/Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file import
  const handleCSVImport = (csvText: string) => {
    try {
      const parsed = parseCSV(csvText);
      if (parsed.headers.length === 0) {
        throw new Error("Could not find any readable columns in this CSV file.");
      }
      setData(parsed);
      setError(null);

      // Auto-configure initial chart options
      const categoryCols = Object.entries(parsed.types)
        .filter(([, t]) => t === "category" || t === "date" || t === "text")
        .map(([k]) => k);
      const numberCols = Object.entries(parsed.types)
        .filter(([, t]) => t === "number")
        .map(([k]) => k);

      // Prioritize payer/receiver fields if present in headers for convenience
      const payerReceiverHeader = parsed.headers.find(
        h => h.toLowerCase().includes("payer") || h.toLowerCase().includes("receiver")
      );

      // Prioritize customer naming columns for cohorts
      const commonNames = ["customer", "name", "client", "user", "payer", "email", "id"];
      const detectedCust = parsed.headers.find(h => commonNames.includes(h.toLowerCase())) || "";

      setGroupByField(payerReceiverHeader || categoryCols[0] || parsed.headers[0]);
      setAggregateField(numberCols[0] || "");
      setCustomerHeader(detectedCust || categoryCols[0] || "");
      setFilters({});
      setSearchQuery("");
      setCurrentPage(1);
    } catch (e) {
      setError((e as Error).message || "Failed to parse CSV. Please check formatting.");
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file) return;
    setError(null);
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext === "csv") {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleCSVImport(event.target.result as string);
        }
      };
      reader.readAsText(file);
    } else if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const buffer = event.target?.result;
          const workbook = XLSX.read(buffer, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const csvText = XLSX.utils.sheet_to_csv(worksheet);
          handleCSVImport(csvText);
        } catch (err) {
          setError(`Excel parsing error: ${(err as Error).message || "Invalid Excel file"}`);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setError("Unsupported file format. Please upload a .csv, .xlsx, or .xls file.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  // Load sample dataset
  const loadDemo = (type: "salon" | "ecommerce") => {
    handleCSVImport(DEMO_DATASETS[type].csv);
  };

  // Reset dashboard
  const handleClear = () => {
    setData(null);
    setGroupByField("");
    setAggregateField("");
    setFilters({});
    setSearchQuery("");
    setCustomerHeader("");
    setIsChartExpanded(false);
    setIsTableVisible(false);
  };

  // Categorical options list (include text columns for custom grouping fields if requested)
  const categoryHeaders = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.types)
      .filter(([, t]) => t === "category" || t === "date" || t === "text")
      .map(([k]) => k);
  }, [data]);

  // Numerical options list
  const numericalHeaders = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.types)
      .filter(([, t]) => t === "number")
      .map(([k]) => k);
  }, [data]);

  // Filtered rows based on filters and search query
  const filteredRows = useMemo(() => {
    if (!data) return [];
    return data.rows.filter(row => {
      // 1. Category filters
      for (const [key, filterVal] of Object.entries(filters)) {
        if (filterVal && row[key]?.toString() !== filterVal) {
          return false;
        }
      }

      // 2. Global Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return Object.values(row).some(val =>
          val?.toString().toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [data, filters, searchQuery]);

  // Sorted rows
  const sortedRows = useMemo(() => {
    const list = [...filteredRows];
    if (sortConfig) {
      list.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        }
        const aStr = aVal?.toString() || "";
        const bStr = bVal?.toString() || "";
        return sortConfig.direction === "asc"
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }
    return list;
  }, [filteredRows, sortConfig]);

  // Paginated rows for the preview spreadsheet
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedRows.slice(start, start + rowsPerPage);
  }, [sortedRows, currentPage]);

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

  // Stats / KPI summary cards
  const statsSummary = useMemo(() => {
    if (!data || filteredRows.length === 0) return null;

    const summary: Record<string, { sum: number; avg: number; min: number; max: number }> = {};
    numericalHeaders.forEach(col => {
      let sum = 0;
      let min = Infinity;
      let max = -Infinity;

      filteredRows.forEach(row => {
        const val = Number(row[col]) || 0;
        sum += val;
        if (val < min) min = val;
        if (val > max) max = val;
      });

      summary[col] = {
        sum,
        avg: sum / filteredRows.length,
        min: min === Infinity ? 0 : min,
        max: max === -Infinity ? 0 : max
      };
    });

    return summary;
  }, [filteredRows, numericalHeaders, data]);

  // Cohort Loyalty Calculation (New vs Repeated Customers)
  const customerCohortData = useMemo(() => {
    if (!data || !customerHeader || filteredRows.length === 0) return null;

    // Track total frequency counts of each customer in the entire CSV (to know if they are returning clients overall)
    const overallCounts: Record<string, number> = {};
    data.rows.forEach(row => {
      const name = row[customerHeader]?.toString().trim();
      if (name) {
        overallCounts[name] = (overallCounts[name] || 0) + 1;
      }
    });

    // Compute counts within current filters
    let newCount = 0;
    let returningCount = 0;

    filteredRows.forEach(row => {
      const name = row[customerHeader]?.toString().trim();
      if (name) {
        if (overallCounts[name] > 1) {
          returningCount++;
        } else {
          newCount++;
        }
      }
    });

    return { newCount, returningCount };
  }, [data, filteredRows, customerHeader]);

  // Aggregated data for charts
  const chartData = useMemo(() => {
    if (!data || !groupByField || filteredRows.length === 0) return [];

    const grouped: Record<string, { label: string; count: number; sum: number; values: number[] }> = {};

    filteredRows.forEach(row => {
      const groupVal = row[groupByField]?.toString() || "Unknown";
      if (!grouped[groupVal]) {
        grouped[groupVal] = { label: groupVal, count: 0, sum: 0, values: [] };
      }
      grouped[groupVal].count += 1;

      if (aggregateField) {
        const val = Number(row[aggregateField]) || 0;
        grouped[groupVal].sum += val;
        grouped[groupVal].values.push(val);
      }
    });

    // Transform map to sorted array
    return Object.values(grouped).map(g => {
      const avg = g.count > 0 ? g.sum / g.count : 0;
      return {
        label: g.label,
        count: g.count,
        value: aggregateField ? g.sum : g.count, // Default to Count if no metric aggregated
        avg
      };
    }).sort((a, b) => {
      // Sort dates chronologically if grouping by date, else sort descending by value
      if (data.types[groupByField] === "date") {
        return a.label.localeCompare(b.label);
      }
      return b.value - a.value;
    });
  }, [filteredRows, groupByField, aggregateField, data]);

  // ── UPI/GPay Merchant Specific Insights ──────────────────
  const upiInsights = useMemo(() => {
    if (!data || filteredRows.length === 0) return null;

    const cleanHeaders = data.headers.map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ""));
    const findHeader = (candidates: string[]) => {
      const idx = cleanHeaders.findIndex(ch => candidates.some(cand => ch.includes(cand)));
      return idx !== -1 ? data.headers[idx] : null;
    };

    const amountCol = findHeader(["amount", "paid", "total", "inr", "rs", "value", "price", "credit", "amountinr"]);
    const dateCol = findHeader(["date", "time", "timestamp", "created", "transactiondate", "createdtime"]);
    const senderCol = findHeader(["upi", "sender", "payer", "from", "customer", "phone", "name", "vpa", "payeraddress", "sendername"]);
    const statusCol = findHeader(["status", "state", "result", "txnstatus", "paymentstatus"]);
    const noteCol = findHeader(["note", "remarks", "description", "comment", "narration", "particular"]);
    const netCol = findHeader(["net", "netamount", "settledamount", "credit", "credited", "payout"]);
    const idCol = findHeader(["txn", "id", "transactionid", "referenceid", "orderid", "ref", "txnid", "upiid"]);

    let totalAmount = 0;
    let totalNet = 0;
    let avgAmount = 0;

    let settledCount = 0;
    let pendingCount = 0;
    let failedCount = 0;
    let refundedCount = 0;

    const platformCounts: Record<string, { amount: number; count: number }> = {};
    const notesList: { id: string; note: string; amount: number; date: string; customer: string }[] = [];
    const senderCounts: Record<string, number> = {};

    filteredRows.forEach((row, idx) => {
      // Amount
      const rawAmt = amountCol ? Number(row[amountCol]) : 0;
      totalAmount += rawAmt;

      // Net
      const rawNet = netCol ? Number(row[netCol]) : Math.round(rawAmt * 0.98);
      totalNet += rawNet;

      // Status
      const rawStatus = statusCol ? String(row[statusCol]).toUpperCase() : "SUCCESS";
      if (rawStatus.includes("SUCCESS") || rawStatus.includes("CREDIT") || rawStatus.includes("SETTLED") || rawStatus.includes("COMPLETED") || rawStatus.includes("PAID")) {
        settledCount++;
      } else if (rawStatus.includes("PENDING") || rawStatus.includes("PROCESS")) {
        pendingCount++;
      } else if (rawStatus.includes("FAIL") || rawStatus.includes("DECLINE") || rawStatus.includes("REJECT") || rawStatus.includes("CANCEL")) {
        failedCount++;
      } else if (rawStatus.includes("REFUND") || rawStatus.includes("REVERSAL")) {
        refundedCount++;
      } else {
        settledCount++; // default fallback
      }

      // Sender / Loyalty
      const senderVal = senderCol ? String(row[senderCol]).trim() : "";
      if (senderVal) {
        senderCounts[senderVal] = (senderCounts[senderVal] || 0) + 1;
      }

      // Platform detection
      const textToScan = (senderVal + " " + (idCol && row[idCol] ? String(row[idCol]) : "")).toLowerCase();
      let platform = "Other UPI";
      if (textToScan.includes("@okicici") || textToScan.includes("icici")) platform = "PhonePe / ICICI";
      else if (textToScan.includes("@ybl") || textToScan.includes("phonepe")) platform = "PhonePe";
      else if (textToScan.includes("@okhdfcbank") || textToScan.includes("hdfc")) platform = "GPay / HDFC";
      else if (textToScan.includes("@okaxis") || textToScan.includes("axis")) platform = "GPay / Axis";
      else if (textToScan.includes("@gpay") || textToScan.includes("google")) platform = "Google Pay";
      else if (textToScan.includes("@paytm") || textToScan.includes("paytm")) platform = "Paytm";
      else if (textToScan.includes("@apl") || textToScan.includes("amazon")) platform = "Amazon Pay";
      else if (textToScan.includes("@upi") || textToScan.includes("upi")) platform = "BHIM UPI";
      else if (textToScan.includes("@axl") || textToScan.includes("airtel")) platform = "Airtel Payments";

      if (!platformCounts[platform]) platformCounts[platform] = { amount: 0, count: 0 };
      platformCounts[platform].amount += rawAmt;
      platformCounts[platform].count += 1;

      // Notes
      const noteVal = noteCol ? String(row[noteCol]).trim() : "";
      if (noteVal && noteVal !== "—" && noteVal !== "") {
        notesList.push({
          id: idCol ? String(row[idCol]) : `TXN-${idx + 1}`,
          note: noteVal,
          amount: rawAmt,
          date: dateCol ? String(row[dateCol]).slice(0, 10) : "",
          customer: senderVal || "Customer"
        });
      }
    });

    avgAmount = filteredRows.length ? Math.round(totalAmount / filteredRows.length) : 0;
    const avgNet = filteredRows.length ? Math.round(totalNet / filteredRows.length) : 0;

    // Top transactions by amount
    const topTxns = [...filteredRows]
      .map((row, idx) => ({
        id: idCol ? String(row[idCol]) : `TXN-${idx + 1}`,
        date: dateCol ? String(row[dateCol]).slice(0, 10) : "",
        amount: amountCol ? Number(row[amountCol]) : 0,
        sender: senderCol ? String(row[senderCol]) : `Customer`,
        status: statusCol ? String(row[statusCol]) : "Settled"
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);

    // Calculate customer loyalty
    const uniqueSenders = Object.keys(senderCounts).length;
    const repeatSenders = Object.values(senderCounts).filter(c => c > 1).length;
    const newCustomers = uniqueSenders - repeatSenders;

    return {
      totalAmount,
      totalNet,
      avgAmount,
      avgNet,
      settledCount,
      pendingCount,
      failedCount,
      refundedCount,
      platformCounts: Object.entries(platformCounts).map(([name, val]) => ({ name, amount: val.amount, count: val.count })).sort((a, b) => b.amount - a.amount),
      notesList,
      topTxns,
      uniqueSenders,
      repeatSenders,
      newCustomers,
      hasUPIColumns: !!(amountCol || senderCol)
    };
  }, [data, filteredRows]);

  // Handle Sort
  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Toggle filter value
  const handleFilterSelect = (header: string, val: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (!val) {
        delete updated[header];
      } else {
        updated[header] = val;
      }
      return updated;
    });
    setCurrentPage(1);
  };

  // SVG Chart Dimensions & Helpers
  const width = isChartExpanded ? 980 : 640;
  const height = isChartExpanded ? 380 : 280;
  const padding = isChartExpanded
    ? { top: 40, right: 40, bottom: 80, left: 80 }
    : { top: 30, right: 30, bottom: 60, left: 60 };

  const svgMaxVal = useMemo(() => {
    if (chartData.length === 0) return 100;
    const max = Math.max(...chartData.map(d => d.value));
    return max === 0 ? 100 : max;
  }, [chartData]);

  // Premium colors
  const palette = ["#fde047", "#f59e0b", "#d97706", "#b45309", "#78350f", "#451a03"];

  // Reusable Chart JSX Block
  const chartCard = data ? (
    <div className="bg-stone-900/30 border border-[#1c1917]/70 rounded-2xl p-6 relative overflow-hidden shadow-xl backdrop-blur-2xl transition-all duration-350">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="font-bold text-white flex items-center gap-2 text-base">
            {chartType === "bar" && <BarChart3 className="w-5 h-5 text-amber-200" />}
            {chartType === "line" && <TrendingUp className="w-5 h-5 text-amber-200" />}
            {chartType === "pie" && <PieIcon className="w-5 h-5 text-amber-200" />}
            {aggregateField ? `Total ${aggregateField}` : "Record Count"} by {groupByField}
          </h3>
          <p className="text-stone-400 text-xs mt-0.5">
            Visualizing {chartData.length} unique values on the dimension axis.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {chartData.length > 0 && (
            <div className="text-xs font-mono text-stone-400 bg-stone-950 border border-stone-850 px-3 py-1 rounded-full">
              Max Metric: {svgMaxVal.toLocaleString()}
            </div>
          )}
          <button
            onClick={() => setIsChartExpanded(prev => !prev)}
            className="px-3.5 py-1.5 border border-stone-800 bg-amber-200/10 hover:bg-amber-200/20 text-amber-200 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
          >
            {isChartExpanded ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" /> Normal Size
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" /> Full Size Graph
              </>
            )}
          </button>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-stone-550 border border-stone-850 border-dashed rounded-xl">
          <Info className="w-8 h-8 mb-2" />
          <span>No analytical data points found matching filters.</span>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          {/* SVG GRAPHICS RENDERER */}
          {chartType === "bar" && (
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none overflow-visible">
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                const y = padding.top + (1 - ratio) * (height - padding.top - padding.bottom);
                const gridVal = svgMaxVal * ratio;
                return (
                  <g key={index} className="opacity-40">
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      stroke="#27272a"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-stone-500 text-[10px] font-mono"
                    >
                      {gridVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </text>
                  </g>
                );
              })}

              {/* Bars rendering */}
              {chartData.map((d, index) => {
                const graphWidth = width - padding.left - padding.right;
                const barWidth = Math.max(8, Math.min(80, (graphWidth / chartData.length) * (isChartExpanded ? 0.7 : 0.6)));
                const step = graphWidth / chartData.length;
                const x = padding.left + index * step + (step - barWidth) / 2;

                const graphHeight = height - padding.top - padding.bottom;
                const barHeight = (d.value / svgMaxVal) * graphHeight;
                const y = height - padding.bottom - barHeight;

                const color = palette[index % palette.length];

                return (
                  <g key={index} className="group/bar cursor-pointer">
                    {/* Glowing Shadow */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={color}
                      opacity="0.1"
                      className="group-hover/bar:opacity-30 transition-opacity"
                    />
                    {/* Actual Solid Bar */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={color}
                      rx="4"
                      className="transition-all duration-350 transform origin-bottom hover:brightness-125"
                    />
                    {/* X Axis Labels */}
                    <text
                      x={x + barWidth / 2}
                      y={height - padding.bottom + (isChartExpanded ? 24 : 16)}
                      textAnchor="end"
                      className="fill-stone-400 text-[9px] sm:text-[10px] font-mono transition-colors group-hover/bar:fill-white"
                      transform={`rotate(-25, ${x + barWidth / 2}, ${height - padding.bottom + (isChartExpanded ? 24 : 16)})`}
                    >
                      {isChartExpanded
                        ? (d.label.length > 22 ? `${d.label.slice(0, 20)}..` : d.label)
                        : (d.label.length > 12 ? `${d.label.slice(0, 10)}..` : d.label)}
                    </text>
                    {/* Hover Value Popover */}
                    <title>{`${d.label}: ${d.value.toLocaleString()}`}</title>
                  </g>
                );
              })}
            </svg>
          )}

          {chartType === "line" && (
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none overflow-visible">
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                const y = padding.top + (1 - ratio) * (height - padding.top - padding.bottom);
                const gridVal = svgMaxVal * ratio;
                return (
                  <g key={index} className="opacity-45">
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      stroke="#27272a"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-stone-500 text-[10px] font-mono"
                    >
                      {gridVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </text>
                  </g>
                );
              })}

              {/* Render Line & Area path */}
              {(() => {
                const graphWidth = width - padding.left - padding.right;
                const graphHeight = height - padding.top - padding.bottom;
                const step = chartData.length > 1 ? graphWidth / (chartData.length - 1) : graphWidth;

                const points = chartData.map((d, index) => {
                  const x = padding.left + index * step;
                  const y = height - padding.bottom - (d.value / svgMaxVal) * graphHeight;
                  return { x, y, label: d.label, val: d.value };
                });

                const linePath = points.reduce((path, p, i) => {
                  return path + `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
                }, "");

                const areaPath = points.length > 0
                  ? `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`
                  : "";

                return (
                  <g>
                    {/* Area Fill */}
                    {areaPath && (
                      <path
                        d={areaPath}
                        fill="url(#area-glow)"
                        className="opacity-20"
                      />
                    )}
                    {/* Line Stroke */}
                    {linePath && (
                      <path
                        d={linePath}
                        fill="none"
                        stroke="#fde047"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Decorative LinearGradient Def */}
                    <defs>
                      <linearGradient id="area-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fde047" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Interactive Nodes */}
                    {points.map((p, index) => (
                      <g key={index} className="group/node cursor-pointer">
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={isChartExpanded ? "7" : "6"}
                          fill="#0c0a09"
                          stroke="#fde047"
                          strokeWidth="3"
                          className="transition-all group-hover/node:r-8"
                        />
                        <text
                          x={p.x}
                          y={height - padding.bottom + (isChartExpanded ? 24 : 18)}
                          textAnchor="end"
                          className="fill-stone-400 text-[9px] sm:text-[10px] font-mono"
                          transform={`rotate(-25, ${p.x}, ${height - padding.bottom + (isChartExpanded ? 24 : 18)})`}
                        >
                          {isChartExpanded
                            ? (p.label.length > 22 ? `${p.label.slice(0, 20)}..` : p.label)
                            : (p.label.length > 12 ? `${p.label.slice(0, 10)}..` : p.label)}
                        </text>
                        <title>{`${p.label}: ${p.val.toLocaleString()}`}</title>
                      </g>
                    ))}
                  </g>
                );
              })()}
            </svg>
          )}

          {chartType === "pie" && (
            <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-4">
              <svg viewBox="0 0 200 200" className="w-64 h-64 select-none overflow-visible">
                {(() => {
                  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
                  let accumulatedAngle = 0;

                  return (
                    <g transform="translate(100,100)">
                      {chartData.map((d, index) => {
                        const percentage = total > 0 ? d.value / total : 0;
                        const angle = percentage * 360;
                        const radStart = (accumulatedAngle * Math.PI) / 180;
                        const radEnd = ((accumulatedAngle + angle) * Math.PI) / 180;

                        // Coordinates for slice arc path
                        const r = 80;
                        const x1 = r * Math.sin(radStart);
                        const y1 = -r * Math.cos(radStart);
                        const x2 = r * Math.sin(radEnd);
                        const y2 = -r * Math.cos(radEnd);

                        const largeArc = angle > 180 ? 1 : 0;
                        const pathData = `
                          M 0 0
                          L ${x1} ${y1}
                          A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
                          Z
                        `;

                        const color = palette[index % palette.length];
                        accumulatedAngle += angle;

                        return (
                          <path
                            key={index}
                            d={pathData}
                            fill={color}
                            stroke="#0c0a09"
                            strokeWidth="1.5"
                            className="transition-all hover:scale-105 transform origin-center hover:brightness-110 cursor-pointer"
                          >
                            <title>{`${d.label}: ${d.value.toLocaleString()} (${(percentage * 100).toFixed(1)}%)`}</title>
                          </path>
                        );
                      })}
                      {/* Centered Ring (Donut Cutout) */}
                      <circle cx="0" cy="0" r="45" fill="#171514" />
                    </g>
                  );
                })()}
              </svg>

              {/* Custom Legend */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 max-w-sm text-xs font-medium">
                {chartData.slice(0, 10).map((d, index) => {
                  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
                  const pct = total > 0 ? (d.value / total) * 100 : 0;
                  return (
                    <div key={index} className="flex items-center gap-2 text-stone-300">
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: palette[index % palette.length] }}
                      />
                      <span className="truncate max-w-[120px]">{d.label}</span>
                      <span className="font-mono text-stone-500 text-[10px]">
                        ({pct.toFixed(1)}%)
                      </span>
                    </div>
                  );
                })}
                {chartData.length > 10 && (
                  <div className="text-stone-500 text-[10px] italic col-span-2 pt-2">
                    + {chartData.length - 10} more categories
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  ) : null;

  // New vs Returning Customer Cohort Visualizer Card
  const cohortCard = useMemo(() => {
    if (!data || !customerHeader || !customerCohortData) return null;
    const { newCount, returningCount } = customerCohortData;
    const total = newCount + returningCount;
    if (total === 0) return null;

    const newPct = ((newCount / total) * 100).toFixed(1);
    const retPct = ((returningCount / total) * 100).toFixed(1);

    return (
      <div className="bg-stone-900/30 border border-[#1c1917]/70 rounded-2xl p-6 relative overflow-hidden shadow-xl backdrop-blur-2xl">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <h3 className="font-bold text-white flex items-center gap-2 text-base">
          <Users className="w-5 h-5 text-amber-250" />
          Loyalty analysis (New vs. Returning)
        </h3>
        <p className="text-stone-400 text-xs mt-0.5 mb-6">
          Retention metrics calculated by analyzing frequencies in `{customerHeader}`.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-2">
          {/* Custom SVG Donut representation */}
          <svg viewBox="0 0 200 200" className="w-44 h-44 select-none overflow-visible">
            {(() => {
              const r = 70;
              const newAngle = (newCount / total) * 360;

              // Coordinates for New Customer segment (Amber 200)
              const radStart0 = 0;
              const radEnd0 = (newAngle * Math.PI) / 180;
              const x1_0 = r * Math.sin(radStart0);
              const y1_0 = -r * Math.cos(radStart0);
              const x2_0 = r * Math.sin(radEnd0);
              const y2_0 = -r * Math.cos(radEnd0);
              const largeArc0 = newAngle > 180 ? 1 : 0;
              const path0 = `M 0 0 L ${x1_0} ${y1_0} A ${r} ${r} 0 ${largeArc0} 1 ${x2_0} ${y2_0} Z`;

              // Coordinates for Returning Customer segment (Amber 500)
              const radEnd1 = 2 * Math.PI;
              const x1_1 = x2_0;
              const y1_1 = y2_0;
              const x2_1 = r * Math.sin(radEnd1);
              const y2_1 = -r * Math.cos(radEnd1);
              const retAngle = 360 - newAngle;
              const largeArc1 = retAngle > 180 ? 1 : 0;
              const path1 = `M 0 0 L ${x1_1} ${y1_1} A ${r} ${r} 0 ${largeArc1} 1 ${x2_1} ${y2_1} Z`;

              return (
                <g transform="translate(100,100)">
                  {newCount > 0 && (
                    <path
                      d={path0}
                      fill="#fde047"
                      stroke="#0c0a09"
                      strokeWidth="2"
                      className="transition-all hover:scale-105 transform origin-center hover:brightness-110 cursor-pointer"
                    >
                      <title>{`New Clients: ${newCount} (${newPct}%)`}</title>
                    </path>
                  )}
                  {returningCount > 0 && (
                    <path
                      d={path1}
                      fill="#f59e0b"
                      stroke="#0c0a09"
                      strokeWidth="2"
                      className="transition-all hover:scale-105 transform origin-center hover:brightness-110 cursor-pointer"
                    >
                      <title>{`Returning Clients: ${returningCount} (${retPct}%)`}</title>
                    </path>
                  )}
                  {/* Central Ring Cutout */}
                  <circle cx="0" cy="0" r="45" fill="#171514" />
                </g>
              );
            })()}
          </svg>

          {/* Color Indicators & Stats details */}
          <div className="flex flex-col gap-4 text-xs font-medium w-full max-w-[200px]">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-200">
                  <span className="w-3.5 h-3.5 rounded bg-[#fde047] flex-shrink-0" />
                  <span>New Clients</span>
                </div>
                <span className="font-mono text-stone-300 font-bold">{newCount}</span>
              </div>
              <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-850">
                <div className="bg-[#fde047] h-full" style={{ width: `${newPct}%` }} />
              </div>
              <span className="text-[10px] text-stone-500 font-mono block text-right">{newPct}% of total</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-200">
                  <span className="w-3.5 h-3.5 rounded bg-[#f59e0b] flex-shrink-0" />
                  <span>Returning Clients</span>
                </div>
                <span className="font-mono text-stone-300 font-bold">{returningCount}</span>
              </div>
              <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-850">
                <div className="bg-[#f59e0b] h-full" style={{ width: `${retPct}%` }} />
              </div>
              <span className="text-[10px] text-stone-500 font-mono block text-right">{retPct}% of total</span>
            </div>
          </div>
        </div>
      </div>
    );
  }, [data, customerHeader, customerCohortData]);

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-100 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-950">
      <Header />

      <main className="flex-1 max-w-full px-4 sm:px-12 py-8 w-full space-y-8 relative z-10">

        {/* HEADER / INTRO */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-850 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <Database className="w-8 h-8 text-amber-200" />
              BUSINESS ANALYTICS
            </h1>
            <p className="text-stone-400 text-sm mt-1">
              Upload any corporate or salon statement to dynamically generate KPIs, custom SVG charts, and interactive slice-and-dice visualizations.
            </p>
          </div>
          {data && (
            <button
              onClick={handleClear}
              className="px-4 py-2 border border-stone-800 bg-stone-900/60 hover:bg-stone-800 rounded-xl text-stone-300 transition-all flex items-center gap-2 text-sm font-semibold cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Upload Different File
            </button>
          )}
        </div>

        {/* ERROR MESSAGE DISPLAY */}
        {error && (
          <div className="bg-red-950/40 border border-red-900/60 text-red-200 p-4 rounded-xl text-sm flex items-start gap-3 animate-fadeIn">
            <Info className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Error Processing Document:</span> {error}
            </div>
          </div>
        )}

        {/* CSV IMPORT SCREEN */}
        {!data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Drag & Drop Area */}
            <div className="lg:col-span-2">
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-350 ${dragActive
                  ? "border-amber-200 bg-amber-200/5 shadow-2xl scale-[1.01]"
                  : "border-stone-800 bg-stone-900/30 hover:bg-stone-900/50 hover:border-stone-700"
                  }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-16 h-16 rounded-2xl bg-amber-200/10 border border-amber-200/20 flex items-center justify-center mb-6">
                  <Upload className="w-8 h-8 text-amber-200" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Drag and drop your transaction file here
                </h3>
                <p className="text-stone-400 text-sm mb-6 max-w-sm">
                  Supports CSV and Excel (.xlsx, .xls) statement exports. Dates, numbers, and categories will be classified automatically.
                </p>
                <button className="px-6 py-2.5 rounded-xl bg-amber-200 hover:bg-amber-100 text-stone-950 font-bold text-sm shadow-lg shadow-amber-200/10 cursor-pointer transition-transform active:scale-95">
                  Select Data File
                </button>
              </div>
            </div>

            {/* Quick Demo Datasets */}
            <div className="bg-stone-900/40 border border-stone-850 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-stone-400 text-xs font-mono tracking-widest uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" /> Need Quick Data?
                </div>
                <h4 className="text-lg font-bold text-white mb-3">Load Demo Templates</h4>
                <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                  Don&apos;t have a CSV file on hand? Click on one of our high-quality analytical datasets below to preview the platform features instantly.
                </p>

                <div className="space-y-4">
                  {Object.entries(DEMO_DATASETS).map(([key, dataset]) => (
                    <button
                      key={key}
                      onClick={() => loadDemo(key as "salon" | "ecommerce")}
                      className="w-full text-left p-4 rounded-xl bg-stone-950/60 hover:bg-stone-950 border border-stone-850 hover:border-amber-200/40 transition-all group flex flex-col gap-1 cursor-pointer"
                    >
                      <span className="text-sm font-bold text-stone-200 group-hover:text-amber-200 transition-colors flex items-center justify-between">
                        {dataset.name}
                        <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-200" />
                      </span>
                      <span className="text-xs text-stone-400 leading-normal">
                        {dataset.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-850 text-xs text-stone-500 flex items-center gap-2">
                <Info className="w-3.5 h-3.5" />
                Uploaded data is parsed entirely in your browser and never sent to a server.
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD ANALYTICS CONTAINER */}
        {data && (
          <div className="space-y-8 animate-fadeIn">

            {/* KPI Summary Cards Grid (Always full-width) */}
            {upiInsights && upiInsights.totalAmount > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Gross Volume */}
                <div className="bg-stone-900/30 border border-stone-850 p-5 rounded-2xl space-y-2 relative overflow-hidden backdrop-blur-xl">
                  <div className="text-xs font-bold text-stone-450 tracking-wider font-mono">GROSS VOLUME</div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-200">
                    ₹{upiInsights.totalAmount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {filteredRows.length} transactions
                  </div>
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" />
                </div>

                {/* Net settled */}
                <div className="bg-stone-900/30 border border-stone-850 p-5 rounded-2xl space-y-2 relative overflow-hidden backdrop-blur-xl">
                  <div className="text-xs font-bold text-stone-450 tracking-wider font-mono">NET REVENUE</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                    ₹{upiInsights.totalNet.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Est. after UPI fees
                  </div>
                </div>

                {/* Ticket size (avg) */}
                <div className="bg-stone-900/30 border border-stone-850 p-5 rounded-2xl space-y-2 relative overflow-hidden backdrop-blur-xl">
                  <div className="text-xs font-bold text-stone-450 tracking-wider font-mono">AVG TRANSACTION</div>
                  <div className="text-2xl sm:text-3xl font-black text-sky-400">
                    ₹{upiInsights.avgAmount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Net Avg: ₹{upiInsights.avgNet.toLocaleString()}
                  </div>
                </div>

                {/* Success Rate */}
                <div className="bg-stone-900/30 border border-stone-850 p-5 rounded-2xl space-y-2 relative overflow-hidden backdrop-blur-xl">
                  <div className="text-xs font-bold text-stone-450 tracking-wider font-mono">SETTLEMENT RATE</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                    {Math.round((upiInsights.settledCount / Math.max(1, filteredRows.length)) * 100)}%
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {upiInsights.settledCount} settled / {upiInsights.pendingCount} pending
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Card 1: Records Count */}
                <div className="bg-stone-900/30 border border-stone-850 p-5 rounded-2xl space-y-2 relative overflow-hidden backdrop-blur-xl">
                  <div className="text-xs font-bold text-stone-450 tracking-wider font-mono">TOTAL TRANSACTIONS</div>
                  <div className="text-3xl font-black text-white">{filteredRows.length}</div>
                  <div className="text-[10px] text-stone-550">
                    of {data.rows.length} total rows
                  </div>
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" />
                </div>

                {/* Dynamic Metric Cards from aggregate settings */}
                {numericalHeaders.slice(0, 3).map((col) => {
                  const stat = statsSummary ? statsSummary[col] : { sum: 0, avg: 0, max: 0 };
                  const isCurrency = col.toLowerCase().includes("price") || col.toLowerCase().includes("sales") || col.toLowerCase().includes("revenue") || col.toLowerCase().includes("usd") || col.toLowerCase().includes("inr") || col.toLowerCase().includes("amount");
                  const prefix = isCurrency ? "₹" : "";
                  return (
                    <div key={col} className="bg-stone-900/30 border border-stone-850 p-5 rounded-2xl space-y-2 relative overflow-hidden backdrop-blur-xl">
                      <div className="text-xs font-bold text-stone-450 tracking-wider font-mono truncate">TOTAL {col.toUpperCase()}</div>
                      <div className="text-2xl font-black text-amber-200 truncate">
                        {prefix}{stat.sum.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                      </div>
                      <div className="text-[10px] text-stone-450">
                        Avg: {prefix}{stat.avg.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                      </div>
                    </div>
                  );
                })}

                {/* If fewer than 3 numerical columns, fill with dimension statistics */}
                {numericalHeaders.length < 3 && categoryHeaders.slice(0, 3 - numericalHeaders.length).map((col) => (
                  <div key={`cat-${col}`} className="bg-stone-900/30 border border-stone-850 p-5 rounded-2xl space-y-2 backdrop-blur-xl">
                    <div className="text-xs font-bold text-stone-450 tracking-wider font-mono truncate">UNIQUE {col.toUpperCase()}</div>
                    <div className="text-2xl font-black text-stone-100">
                      {(data.uniqueValues[col] || []).length}
                    </div>
                    <div className="text-[10px] text-stone-550">Distinct Categories</div>
                  </div>
                ))}
              </div>
            )}

            {/* EXPANDED GRAPH DISPLAY (FULL WIDTH) */}
            {isChartExpanded && (
              <div className="w-full animate-scaleUp">
                {chartCard}
              </div>
            )}

            {/* SPLIT GRID CONTAINER FOR SIDEBAR + GRAPH/TABLE */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

              {/* LEFT BAR: Dynamic Interactive Filters */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-stone-900/40 border border-stone-850 rounded-2xl p-5 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-amber-200" />
                      Filters & Slices
                    </h3>
                    {Object.keys(filters).length > 0 && (
                      <button
                        onClick={() => setFilters({})}
                        className="text-xs text-amber-200 hover:text-amber-100 underline cursor-pointer"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>

                  {/* Categories filter dropdowns */}
                  <div className="space-y-4">
                    {categoryHeaders.map(col => {
                      const vals = data.uniqueValues[col] || [];
                      if (vals.length === 0) return null;
                      return (
                        <div key={col} className="space-y-1.5">
                          <label className="text-xs font-semibold text-stone-400 font-mono">
                            {col.toUpperCase()}
                          </label>
                          <select
                            value={filters[col] || ""}
                            onChange={(e) => handleFilterSelect(col, e.target.value)}
                            className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 outline-none focus:border-amber-200/50 cursor-pointer"
                          >
                            <option value="">All Categories ({vals.length})</option>
                            {vals.map(v => (
                              <option key={v} value={v}>
                                {v}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}

                    {categoryHeaders.length === 0 && (
                      <p className="text-xs text-stone-500 italic">No discrete categories detected in CSV.</p>
                    )}
                  </div>
                </div>

                {/* Chart Visualizer Configuration */}
                <div className="bg-stone-900/40 border border-stone-850 rounded-2xl p-5 space-y-6">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-200" />
                    Visualizer Config
                  </h3>

                  <div className="space-y-4">
                    {/* Chart Type Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-400 font-mono">CHART DISPLAY</label>
                      <div className="grid grid-cols-3 gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
                        {(["bar", "line", "pie"] as const).map(t => (
                          <button
                            key={t}
                            onClick={() => setChartType(t)}
                            className={`py-1.5 text-[11px] font-bold rounded-lg transition-all capitalize cursor-pointer ${chartType === t
                              ? "bg-amber-200 text-stone-950"
                              : "text-stone-400 hover:text-white"
                              }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Group By Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-400 font-mono">X-AXIS / DIMENSION</label>
                      <select
                        value={groupByField}
                        onChange={(e) => setGroupByField(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 outline-none focus:border-amber-200/50 cursor-pointer"
                      >
                        {categoryHeaders.map(col => (
                          <option key={col} value={col}>
                            {col}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Value / Metric Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-400 font-mono">Y-AXIS / METRIC</label>
                      <select
                        value={aggregateField}
                        onChange={(e) => setAggregateField(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 outline-none focus:border-amber-200/50 cursor-pointer"
                      >
                        <option value="">Record Count (Frequency)</option>
                        {numericalHeaders.map(col => (
                          <option key={col} value={col}>
                            Total {col}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Cohort Loyalty Column Selector */}
                    <div className="space-y-1.5 border-t border-stone-800 pt-4">
                      <label className="text-xs font-semibold text-stone-400 font-mono flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-250" /> COHORT / CUSTOMER COLUMN
                      </label>
                      <select
                        value={customerHeader}
                        onChange={(e) => setCustomerHeader(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 outline-none focus:border-amber-200/50 cursor-pointer"
                      >
                        <option value="">-- Disable Loyalty Chart --</option>
                        {categoryHeaders.map(col => (
                          <option key={col} value={col}>
                            {col}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT AREA: Normal Graph Display, Cohort Chart & Raw Data Table */}
              <div className="lg:col-span-3 space-y-8">

                {/* Render normal size graph if not expanded */}
                {!isChartExpanded && chartCard}

                {/* Render Cohort Donut Chart separately */}
                {cohortCard}

                {/* UPI MERCHANT PERFORMANCE PANELS (shown if valid GPay/UPI data is loaded) */}
                {upiInsights && upiInsights.totalAmount > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                    {/* Panel 1: Platform Distribution */}
                    <div className="bg-stone-900/30 border border-stone-850 rounded-2xl p-5 relative overflow-hidden shadow-xl">
                      <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-200" />
                        Platform Distribution
                      </h4>
                      <div className="space-y-3.5">
                        {upiInsights.platformCounts.map((plat, idx) => {
                          const pct = ((plat.amount / upiInsights.totalAmount) * 100).toFixed(1);
                          return (
                            <div key={plat.name} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-stone-300 font-semibold">{plat.name}</span>
                                <span className="text-stone-450 font-mono">
                                  ₹{plat.amount.toLocaleString()} ({pct}%)
                                </span>
                              </div>
                              <div className="w-full bg-stone-950 h-1.5 rounded-full overflow-hidden border border-stone-850">
                                <div
                                  className="bg-amber-200 h-full rounded-full"
                                  style={{
                                    width: `${pct}%`,
                                    backgroundColor: palette[idx % palette.length]
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Panel 2: Settlement Status counts */}
                    <div className="bg-stone-900/30 border border-stone-850 rounded-2xl p-5 relative overflow-hidden shadow-xl">
                      <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-amber-200" />
                        Settlement Breakdown
                      </h4>
                      <div className="space-y-3">
                        {[
                          { name: "Settled / Success", count: upiInsights.settledCount, color: "#34d399" },
                          { name: "Pending", count: upiInsights.pendingCount, color: "#f59e0b" },
                          { name: "Failed", count: upiInsights.failedCount, color: "#fb7185" },
                          { name: "Refunded", count: upiInsights.refundedCount, color: "#60a5fa" }
                        ].map(status => {
                          const pct = filteredRows.length ? ((status.count / filteredRows.length) * 100).toFixed(1) : "0";
                          return (
                            <div key={status.name} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2 text-stone-300">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: status.color }} />
                                <span>{status.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-stone-100 font-bold">{status.count}</span>
                                <span className="text-stone-500 font-mono text-[10px]">({pct}%)</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Panel 3: Notes & Customer Remarks */}
                    <div className="bg-stone-900/30 border border-stone-850 rounded-2xl p-5 relative overflow-hidden shadow-xl md:col-span-2">
                      <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-amber-200" />
                        Payment Notes & Remarks
                      </h4>
                      {upiInsights.notesList.length === 0 ? (
                        <div className="text-xs text-stone-500 italic py-4">No notes or remarks found in transactions.</div>
                      ) : (
                        <div className="max-h-44 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                          {upiInsights.notesList.map((note, idx) => (
                            <div key={idx} className="bg-stone-950/45 p-3 rounded-xl border border-stone-850 flex items-start justify-between gap-4 text-xs">
                              <div>
                                <div className="font-mono text-[10px] text-stone-500 mb-0.5">{note.customer || "Anonymous"} · {note.date || "N/A"}</div>
                                <p className="text-stone-300 font-medium italic">&quot;{note.note}&quot;</p>
                              </div>
                              <span className="font-mono text-amber-200 font-bold flex-shrink-0">₹{note.amount.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Panel 4: Top Transaction IDs */}
                    <div className="bg-stone-900/30 border border-stone-850 rounded-2xl p-5 relative overflow-hidden shadow-xl md:col-span-2">
                      <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-amber-200" />
                        Top 10 Transactions (by Amount)
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-stone-950/80 border-b border-stone-850 font-mono text-stone-400">
                              <th className="py-2.5 px-3">Date</th>
                              <th className="py-2.5 px-3">Transaction ID</th>
                              <th className="py-2.5 px-3">Sender / Payer</th>
                              <th className="py-2.5 px-3 text-right">Amount</th>
                              <th className="py-2.5 px-3 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-850">
                            {upiInsights.topTxns.map((txn, idx) => (
                              <tr key={idx} className="hover:bg-stone-900/20 font-medium">
                                <td className="py-2.5 px-3 text-stone-400 font-mono">{txn.date || "—"}</td>
                                <td className="py-2.5 px-3 text-stone-300 font-mono">{txn.id || "—"}</td>
                                <td className="py-2.5 px-3 text-stone-350">{txn.sender || "—"}</td>
                                <td className="py-2.5 px-3 text-right text-amber-200 font-mono font-bold">₹{txn.amount.toLocaleString()}</td>
                                <td className="py-2.5 px-3 text-center">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${txn.status.toLowerCase().includes("success") || txn.status.toLowerCase().includes("settled") || txn.status.toLowerCase().includes("credit") || txn.status.toLowerCase().includes("completed") || txn.status.toLowerCase().includes("paid")
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    }`}>
                                    {txn.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* COLLAPSIBLE DATASET TABLE TRIGGER */}
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => setIsTableVisible(prev => !prev)}
                    className="px-6 py-3 border border-stone-800 bg-stone-900/60 hover:bg-stone-850 hover:border-amber-200/30 text-stone-200 hover:text-white rounded-xl transition-all flex items-center gap-2 text-xs font-bold shadow-lg cursor-pointer"
                  >
                    {isTableVisible ? (
                      <>
                        <X className="w-4 h-4 text-amber-200" />
                        Hide Detailed Dataset Table
                      </>
                    ) : (
                      <>
                        <FileSpreadsheet className="w-4 h-4 text-amber-200" />
                        Show Detailed Dataset Table ({sortedRows.length} rows)
                      </>
                    )}
                  </button>
                </div>

                {/* RAW DATA SPREADSHEET TABLE */}
                {isTableVisible && (
                  <div className="bg-stone-900/30 border border-stone-850 rounded-2xl overflow-hidden shadow-lg animate-scaleUp">
                    <div className="p-5 border-b border-stone-850 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-white flex items-center gap-2">
                          <FileSpreadsheet className="w-5 h-5 text-amber-200" />
                          Detailed Dataset Table
                        </h3>
                        <p className="text-stone-400 text-xs mt-0.5">
                          Spreadsheet view of filtered rows. Click columns to sort values.
                        </p>
                      </div>

                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                        <input
                          type="text"
                          placeholder="Search records..."
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="bg-stone-950 border border-stone-800 focus:border-amber-200/50 outline-none text-stone-200 pl-10 pr-4 py-2 rounded-xl text-xs w-full sm:w-64"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-455 hover:text-white cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-stone-950 border-b border-stone-850">
                            {data.headers.map(header => {
                              const isSorted = sortConfig?.key === header;
                              return (
                                <th
                                  key={header}
                                  onClick={() => requestSort(header)}
                                  className="px-6 py-3.5 text-stone-400 font-mono tracking-wider font-semibold cursor-pointer hover:bg-stone-900/60 hover:text-white select-none transition-colors"
                                >
                                  <div className="flex items-center gap-1.5 uppercase">
                                    {header}
                                    <ArrowUpDown
                                      className={`w-3 h-3 transition-opacity ${isSorted ? "opacity-100 text-amber-200" : "opacity-40"
                                        }`}
                                    />
                                  </div>
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-850">
                          {paginatedRows.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className="hover:bg-stone-900/20 transition-colors"
                            >
                              {data.headers.map(header => (
                                <td key={header} className="px-6 py-3.5 text-stone-300 font-medium">
                                  {typeof row[header] === "number"
                                    ? row[header].toLocaleString()
                                    : row[header]?.toString() || "-"}
                                </td>
                              ))}
                            </tr>
                          ))}
                          {paginatedRows.length === 0 && (
                            <tr>
                              <td
                                colSpan={data.headers.length}
                                className="text-center py-12 text-stone-500 italic bg-stone-900/5"
                              >
                                No records found matching filters or search queries.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* PAGINATION CONTROLS */}
                    {totalPages > 1 && (
                      <div className="p-4 border-t border-stone-850 flex items-center justify-between bg-stone-950/20 text-xs">
                        <span className="text-stone-450">
                          Showing page <span className="font-bold text-stone-200">{currentPage}</span> of{" "}
                          <span className="font-bold text-stone-200">{totalPages}</span> ({sortedRows.length} total filtered items)
                        </span>
                        <div className="flex items-center gap-1.5 font-bold">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 border border-stone-800 bg-stone-900 rounded-lg hover:bg-stone-800 text-stone-200 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                          >
                            Prev
                          </button>
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 border border-stone-800 bg-stone-900 rounded-lg hover:bg-stone-800 text-stone-200 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
