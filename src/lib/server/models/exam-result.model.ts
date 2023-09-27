import { Document, Model, Schema, model, models } from "mongoose";

import { IQuestion } from "./question.model";
import { IQuestionSet } from "./question-set.model";
import { ITimeStamps } from "./base.model";
import { IUser } from "./user.model";
import autopopulate from "mongoose-autopopulate";

interface IQuestionAnswerStatus {
  question: IQuestion;
  isCorrect: boolean;
}

interface ISectionResult {
  questionSet: IQuestionSet;
  score: number;
  timeTaken: number;
  questionAnswerStatus: IQuestionAnswerStatus[];
}

export interface IExamResult extends Document, ITimeStamps {
  user: IUser;
  results: ISectionResult[];
}

const QuestionAnswerStatusSchema = new Schema<IQuestionAnswerStatus>(
  {
    question: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: false,
  }
);

const SectionResultSchema = new Schema<ISectionResult>(
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
    questionAnswerStatus: {
      type: [QuestionAnswerStatusSchema],
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
    results: {
      type: [SectionResultSchema],
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
