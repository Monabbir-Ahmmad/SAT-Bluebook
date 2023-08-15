import { Document, Schema, model, models } from "mongoose";

export interface IQuestion extends Document {
  question: string;
  questionImage?: string;
  subject: string;
  difficulty: number;
  tags: string[];
  optionType: string;
  options: {
    text: string;
    image?: string;
  }[];
  answers: number[];
}

const QuestionSchema = new Schema<IQuestion>(
  {
    question: {
      type: String,
      required: true,
    },
    questionImage: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
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
      type: [
        {
          text: String,
          image: String,
        },
      ],
      required: true,
    },
    answers: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const QuestionModel =
  models.Question || model<IQuestion>("Question", QuestionSchema);

export default QuestionModel;
