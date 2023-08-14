import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/connect-db";

connectDB();

export async function POST(req: NextRequest) {
  return NextResponse.json({
    message: "Hello, World!",
  });
}
