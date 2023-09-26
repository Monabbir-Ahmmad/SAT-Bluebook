import { Difficulties, SectionTypes } from "@/constants/enums";
import { Document, Model, Schema, model, models } from "mongoose";

import { IQuestion } from "./question.model";
import { ITimeStamps } from "./base.model";

export interface IQuestionSet extends Document, ITimeStamps {
  title: string;
  section: SectionTypes;
  difficulty: Difficulties;
  questions: IQuestion[];
}

const QuestionSetSchema = new Schema<IQuestionSet>(
  {
    title: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const QuestionSetModel: Model<IQuestionSet> =
  models.QuestionSet || model<IQuestionSet>("QuestionSet", QuestionSetSchema);

export default QuestionSetModel;
