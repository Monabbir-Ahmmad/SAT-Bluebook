import { Document, Model, Schema, model, models } from "mongoose";

import { IQuestion } from "./question.model";
import { IQuestionSet } from "./question-set.model";
import { ITimeStamps } from "./base.model";
import { IUser } from "./user.model";
import autopopulate from "mongoose-autopopulate";

export interface IExamQuestionAnswerResult {
  question: IQuestion;
  isCorrect: boolean;
  selectedOption?: number;
  textAnswer?: string;
}

export interface IExamSectionResult {
  questionSet: IQuestionSet;
  score: number;
  timeTaken: number;
  questionAnswerResults: IExamQuestionAnswerResult[];
}

export interface IExamResult extends Document, ITimeStamps {
  user: IUser;
  sectionResults: IExamSectionResult[];
}

const ExamQuestionAnswerResultSchema = new Schema<IExamQuestionAnswerResult>(
  {
    question: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
      autopopulate: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    selectedOption: {
      type: Number,
    },
    textAnswer: {
      type: String,
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: false,
  }
);

const ExamSectionResultSchema = new Schema<IExamSectionResult>(
  {
    questionSet: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "QuestionSet",
      autopopulate: true,
    },
    score: {
      type: Number,
      required: true,
    },
    timeTaken: {
      type: Number,
      required: true,
    },
    questionAnswerResults: {
      type: [ExamQuestionAnswerResultSchema],
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: false,
  }
);

const ExamResultSchema = new Schema<IExamResult>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sectionResults: {
      type: [ExamSectionResultSchema],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
ExamResultSchema.plugin(autopopulate);

const ExamResultModel: Model<IExamResult> =
  models.ExamResult || model<IExamResult>("ExamResult", ExamResultSchema);

export default ExamResultModel;
