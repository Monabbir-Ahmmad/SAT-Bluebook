import { IQuestion, QuestionSchema } from "@/models/Question";

import mongoose from "mongoose";

export const QuestionModel = mongoose.model<IQuestion>(
  "Question",
  QuestionSchema
);
