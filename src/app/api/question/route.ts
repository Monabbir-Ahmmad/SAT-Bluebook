import { NextRequest, NextResponse } from "next/server";

import { QuestionModel } from "@/models";
import connectDB from "@/lib/connect-db";


export async function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}

export async function POST(req: NextRequest) {
  const questionData = await req.json();

  const question = await QuestionModel.create(questionData);

  return NextResponse.json(question);
}
