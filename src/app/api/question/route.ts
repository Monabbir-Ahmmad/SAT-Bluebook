import { NextRequest, NextResponse } from "next/server";

import { QuestionModel } from "@/lib/server/models";
import connectDB from "@/lib/server/db/connect-db";

connectDB();

export async function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(req: NextRequest) {
  const questionData = await req.json();

  const question = await QuestionModel.create(questionData);

  return NextResponse.json(question);
}
