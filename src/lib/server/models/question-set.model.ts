import { Difficulties, OptionTypes, SectionTypes } from "@/constants/enums";
import { Document, Model, PopulatedDoc, Schema, model, models } from "mongoose";

import { IQuestion } from "./question.model";
import { Types } from "mongoose";

export interface IQuestionSet extends Document {
  title: string;
  section: SectionTypes;
  difficulty: Difficulties;
  questions: Types.Array<IQuestion | Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
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
        required: true,
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
