import { NextRequest, NextResponse } from "next/server";

import { Question } from "@/lib/server/models";
import connectDB from "@/lib/server/config/connect-db";

connectDB();

const createQuestion = async (req: NextRequest) => {
  const questionData = await req.json();

  const question = await Question.create(questionData);

  return NextResponse.json(question);
};

export { createQuestion as POST };
