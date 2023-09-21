import { Difficulties, SectionTypes } from "@/constants/enums";
import { Document, Model, Schema, model, models } from "mongoose";

import { IExamResult } from "./exam-result.model";
import { IQuestionSet } from "./question-set.model";
import { IUser } from "./user.model";
import { Types } from "mongoose";

export interface IExam extends Document {
  title: string;
  [SectionTypes.MATH]: {
    [Difficulties.EASY]: IQuestionSet;
    [Difficulties.BASE]: IQuestionSet;
    [Difficulties.HARD]: IQuestionSet;
  };
  [SectionTypes.READING_WRITING]: {
    [Difficulties.EASY]: IQuestionSet;
    [Difficulties.BASE]: IQuestionSet;
    [Difficulties.HARD]: IQuestionSet;
  };
  assignedTo: Types.Array<IUser>;
  attendedBy: Types.Array<{
    user: IUser;
    result: IExamResult;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema = new Schema<IExam>(
  {
    title: {
      type: String,
      required: true,
    },
    [SectionTypes.MATH]: {
      [Difficulties.EASY]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "QuestionSet",
      },
      [Difficulties.BASE]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "QuestionSet",
      },
      [Difficulties.HARD]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "QuestionSet",
      },
    },
    [SectionTypes.READING_WRITING]: {
      [Difficulties.EASY]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "QuestionSet",
      },
      [Difficulties.BASE]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "QuestionSet",
      },
      [Difficulties.HARD]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "QuestionSet",
      },
    },
    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    attendedBy: [
      {
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        result: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "ExamResult",
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ExamModel: Model<IExam> = models.Exam || model<IExam>("Exam", ExamSchema);

export default ExamModel;
