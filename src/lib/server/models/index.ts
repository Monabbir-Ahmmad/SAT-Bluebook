import { IQuestion, QuestionSchema } from "@/lib/server/models/Question";

import mongoose from "mongoose";

export const QuestionModel =
  mongoose.models.Question ??
  mongoose.model<IQuestion>("Question", QuestionSchema);
