import { Difficulties, SectionTypes } from "@/constants/enums";
import { Document, Model, Schema, model, models } from "mongoose";

import { IExamResult } from "./exam-result.model";
import { IQuestionSet } from "./question-set.model";
import { ITimeStamps } from "./base.model";
import { IUser } from "./user.model";

interface IFullQuestionSet {
  [Difficulties.EASY]: IQuestionSet;
  [Difficulties.BASE]: IQuestionSet;
  [Difficulties.HARD]: IQuestionSet;
}

interface IAttendedBy extends ITimeStamps {
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

const FullQuestionSetSchema = new Schema<IFullQuestionSet>(
  {
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
    },
    result: {
      type: Schema.Types.ObjectId,
      ref: "ExamResult",
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
    },

    [SectionTypes.READING_WRITING]: {
      type: FullQuestionSetSchema,
      required: true,
    },

    assignedTo: [{ type: Schema.Types.ObjectId, ref: "User" }],

    attendedBy: {
      type: [AttendedBySchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ExamModel: Model<IExam> = models.Exam || model<IExam>("Exam", ExamSchema);

export default ExamModel;
