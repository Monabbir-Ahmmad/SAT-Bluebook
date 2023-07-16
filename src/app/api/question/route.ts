import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(request: Request) {
  const res = await request.json();
  return NextResponse.json({ res });
}
