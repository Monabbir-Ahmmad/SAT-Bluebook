import { Document, Model, Schema, Types, model, models } from "mongoose";

import { IUser } from "./user.model";
import { IQuestionSet } from "./question-set.model";

export interface IExamResult extends Document {
  user: IUser;
  results: Types.Array<{
    questionSet: IQuestionSet;
    score: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ExamResultSchema = new Schema<IExamResult>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    results: [
      {
        questionSet: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "QuestionSet",
        },
        score: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ExamResultModel: Model<IExamResult> =
  models.ExamResult || model<IExamResult>("ExamResult", ExamResultSchema);

export default ExamResultModel;
