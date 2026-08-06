export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lookbook from "@/models/Lookbook";

const sampleLookbooks = [
  {
    title: "Summer Collection 2026",
    icon: "☀️",
    bgColor: "#ffe4e6",
  },
  {
    title: "Minimalist Essentials",
    icon: "🌿",
    bgColor: "#e0f2fe",
  },
  {
    title: "Urban Streetwear",
    icon: "⚡",
    bgColor: "#fef3c7",
  },
  {
    title: "Evening & Luxe",
    icon: "✨",
    bgColor: "#f3e8ff",
  },
];

export async function GET() {
  try {
    await connectDB();
    const count = await Lookbook.countDocuments();
    if (count === 0) {
      const created = await Lookbook.insertMany(sampleLookbooks);
      return NextResponse.json({
        success: true,
        message: "Database seeded successfully with initial lookbooks!",
        data: created,
      });
    }
    return NextResponse.json({
      success: true,
      message: `Database already has ${count} lookbooks.`,
    });
  } catch (error) {
    const err = error as Error;
    console.error("API Seed error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Seeding failed" },
      { status: 500 }
    );
  }
}
