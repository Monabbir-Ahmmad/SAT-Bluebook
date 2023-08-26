import { Difficulties, OptionTypes, SectionTypes } from "@/constants/enums";
import { Document, Model, Schema, model, models } from "mongoose";

export interface IQuestion extends Document {
  question: string;
  questionImage?: string;
  passage?: string;
  section: SectionTypes;
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
    section: {
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
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const QuestionModel: Model<IQuestion> =
  models.Question || model<IQuestion>("Question", QuestionSchema);

export default QuestionModel;
