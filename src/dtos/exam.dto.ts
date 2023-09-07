import { QuestionDto } from "./question.dto";
import { SectionTypes } from "@/constants/enums";
import { UserDto } from "./user.dto";
import { IExamResult } from "@/lib/server/models/exam-result.model";
import { IQuestionSet } from "@/lib/server/models/question-set.model";

export interface ExamQuestionDto extends QuestionDto {
  selectedOption?: number;
  textAnswer?: string;
  markedWrong?: number[];
  markedForReview?: boolean;
}

export class ExamSectionDto {
  id: string;
  title: string;
  section: SectionTypes;
  questions: ExamQuestionDto[];
  score?: number = 0;

  constructor(data: IQuestionSet) {
    this.id = data.id;
    this.title = data.title;
    this.section = data.section;
    this.questions = data.questions.map((question) => ({
      ...new QuestionDto(question),
      selectedOption: undefined,
      textAnswer: undefined,
      markedWrong: [],
      markedForReview: false,
    }));
  }
}

export class ExamQuestionSubmitDto {
  id: string;
  selectedOption?: number;
  textAnswer?: string;
}

export class ExamSectionSubmitDto {
  id: string;
  questions: ExamQuestionSubmitDto[];
}

export class ExamSectionResultDto {
  id: string;
  section: SectionTypes;
  score: number;

  constructor(id: string, section: SectionTypes, score: number = 0) {
    this.id = id;
    this.section = section;
    this.score = score;
  }
}

export class ExamResultDto {
  id: string;
  user: UserDto;
  results: ExamSectionResultDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: IExamResult) {
    this.id = data.id;
    this.user = new UserDto(data.user);
    this.results = data.results.map(
      (result) =>
        new ExamSectionResultDto(
          result.questionSet.id,
          result.questionSet.section,
          result.score
        )
    );
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
