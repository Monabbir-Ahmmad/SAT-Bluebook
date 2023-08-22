import { Difficulties, OptionTypes, SubjectTypes } from "@/constants/enums";

export interface QuestionOptionDTO {
  text?: string;
  image?: string;
}

export interface QuestionCreateReqDTO {
  question: string;
  passage?: string;
  questionImage?: string;
  subject: SubjectTypes;
  difficulty: Difficulties;
  tags: string[];
  optionType: OptionTypes;
  options: QuestionOptionDTO[];
  answers: number[]; //Index of the correct answer
}

export interface QuestionResDTO {
  id: string;
  question: string;
  passage?: string;
  questionImage?: string;
  subject: SubjectTypes;
  difficulty: Difficulties;
  tags: string[];
  optionType: OptionTypes;
  options: QuestionOptionDTO[];
  answers: number[]; //Index of the correct answer
}
