import { Difficulties, SectionTypes } from "@/constants/enums";
import { Document, Model, Schema, model, models } from "mongoose";

import { IExamResult } from "./exam-result.model";
import { IQuestionSet } from "./question-set.model";
import { ITimeStamps } from "./base.model";
import { IUser } from "./user.model";
import autopopulate from "mongoose-autopopulate";

export interface IQuestionSetWithTime {
  questionSet: IQuestionSet;
  timeLimit?: number;
  breakTime?: number;
}

export interface IFullQuestionSet {
  [Difficulties.EASY]: IQuestionSetWithTime;
  [Difficulties.BASE]: IQuestionSetWithTime;
  [Difficulties.HARD]: IQuestionSetWithTime;
}

export interface IAttendedBy extends ITimeStamps {
  user: IUser;
  result?: IExamResult;
}

export interface IExam extends Document, ITimeStamps {
  title: string;
  [SectionTypes.MATH]: IFullQuestionSet;
  [SectionTypes.READING_WRITING]: IFullQuestionSet;
  assignedTo: IUser[];
  attendedBy: IAttendedBy[];
}

const QuestionSetWithTimeLimitSchema = new Schema<IQuestionSetWithTime>(
  {
    questionSet: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "QuestionSet",
      autopopulate: true,
    },
    timeLimit: {
      type: Number,
    },
    breakTime: {
      type: Number,
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: false,
  }
);

const FullQuestionSetSchema = new Schema<IFullQuestionSet>(
  {
    [Difficulties.EASY]: {
      type: QuestionSetWithTimeLimitSchema,
      required: true,
    },
    [Difficulties.BASE]: {
      type: QuestionSetWithTimeLimitSchema,
      required: true,
    },
    [Difficulties.HARD]: {
      type: QuestionSetWithTimeLimitSchema,
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: false,
  }
);

const AttendedBySchema = new Schema<IAttendedBy>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      autopopulate: true,
    },
    result: {
      type: Schema.Types.ObjectId,
      ref: "ExamResult",
      autopopulate: true,
    },
  },
  {
    _id: false,
    timestamps: true,
    versionKey: false,
  }
);

const ExamSchema = new Schema<IExam>(
  {
    title: {
      type: String,
      required: true,
    },

    [SectionTypes.MATH]: {
      type: FullQuestionSetSchema,
      required: true,
      autopopulate: true,
    },

    [SectionTypes.READING_WRITING]: {
      type: FullQuestionSetSchema,
      required: true,
      autopopulate: true,
    },

    assignedTo: [
      { type: Schema.Types.ObjectId, ref: "User", autopopulate: true },
    ],

    attendedBy: {
      type: [AttendedBySchema],
      default: [],
      autopopulate: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
ExamSchema.plugin(autopopulate);

const ExamModel: Model<IExam> = models.Exam || model<IExam>("Exam", ExamSchema);

export default ExamModel;
