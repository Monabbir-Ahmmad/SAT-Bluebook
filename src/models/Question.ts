import { Schema } from "mongoose";

export interface IQuestion {
  question: string;
  questionImage?: string;
  subject: string;
  difficulty: number;
  tags: string[];
  optionType: OptionType;
  options: QuestionOptionDTO[];
  answers: number[];
}

export const QuestionSchema = new Schema<IQuestion>(
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
