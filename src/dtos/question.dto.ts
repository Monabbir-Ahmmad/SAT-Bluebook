import { Difficulties, OptionTypes, SectionTypes } from "@/constants/enums";
import { IQuestion, IQuestionOption } from "@/lib/server/models/question.model";

export class QuestionOptionDto {
  text?: string;
  image?: string;

  constructor(option?: IQuestionOption) {
    this.text = option?.text;
    this.image = option?.image;
  }
}

export interface QuestionCreateReqDto {
  question: string;
  passage?: string;
  questionImage?: string;
  section: SectionTypes;
  difficulty: Difficulties;
  tags?: string[];
  optionType: OptionTypes;
  options: QuestionOptionDto[];
  answers: number[]; //Index of the correct answer
}

export class QuestionDto {
  id: string;
  question: string;
  passage?: string;
  questionImage?: string;
  section: SectionTypes;
  difficulty: Difficulties;
  tags?: string[];
  optionType: OptionTypes;
  options: QuestionOptionDto[];
  answers: number[];

  constructor(question: IQuestion) {
    this.id = question._id;
    this.question = question.question;
    this.passage = question.passage;
    this.questionImage = question.questionImage;
    this.section = question.section;
    this.difficulty = question.difficulty;
    this.tags = question.tags;
    this.optionType = question.optionType;
    this.options = question.options;
    this.answers = question.answers;
  }
}
