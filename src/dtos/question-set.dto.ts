import { Difficulties, SectionTypes } from "@/constants/enums";

import { IQuestion } from "@/lib/server/models/question.model";
import { IQuestionSet } from "@/lib/server/models/question-set.model";
import { QuestionDto } from "./question.dto";

export interface QuestionSetCreateReqDto {
  title: string;
  section: SectionTypes;
  difficulty: Difficulties;
  questions: string[];
}

export class QuestionSetDto {
  id: string;
  title: string;
  section: SectionTypes;
  difficulty: Difficulties;
  questions: QuestionDto[];

  constructor(questionSet: IQuestionSet) {
    this.id = questionSet._id;
    this.title = questionSet.title;
    this.section = questionSet.section;
    this.difficulty = questionSet.difficulty;
    this.questions = questionSet.questions.map(
      (question) => new QuestionDto(question as IQuestion)
    );
  }
}
