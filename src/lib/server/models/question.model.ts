import { Difficulties, OptionTypes } from "@/constants/enums";
import { Document, Schema, model, models } from "mongoose";

export interface IQuestion extends Document {
  question: string;
  questionImage?: string;
  passage?: string;
  subject: string;
  difficulty: Difficulties;
  tags: string[];
  optionType: OptionTypes;
  options: IQuestionOption[];
  answers: number[];
}

export interface IQuestionOption extends Document {
  text?: string;
  image?: string;
}

const QuestionOptionSchema = new Schema<IQuestionOption>(
  {
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: false,
    versionKey: false,
    _id: false,
  }
);

const QuestionSchema = new Schema<IQuestion>(
  {
    question: {
      type: String,
      required: true,
    },
    questionImage: {
      type: String,
    },
    passage: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    optionType: {
      type: String,
      required: true,
    },
    options: {
      type: [QuestionOptionSchema],
      required: true,
    },
    answers: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const QuestionModel =
  models.Question || model<IQuestion>("Question", QuestionSchema);

export default QuestionModel;
