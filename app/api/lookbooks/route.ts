export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lookbook from "@/models/Lookbook";

export async function GET() {
  try {
    await connectDB();
    const lookbooks = await Lookbook.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: lookbooks });
  } catch (error) {
    const err = error as Error;
    console.error("API GET Lookbooks error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch lookbooks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newLookbook = await Lookbook.create(body);
    return NextResponse.json({ success: true, data: newLookbook }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    console.error("API POST Lookbooks error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create lookbook" },
      { status: 500 }
    );
  }
}
