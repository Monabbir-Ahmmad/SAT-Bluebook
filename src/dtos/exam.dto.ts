import { Difficulties, SectionTypes } from "@/constants/enums";
import {
  IExamQuestionAnswerResult,
  IExamResult,
  IExamSectionResult,
} from "@/lib/server/models/exam-result.model";

import { IExam } from "@/lib/server/models/exam.model";
import { IQuestionSet } from "@/lib/server/models/question-set.model";
import { QuestionDto } from "./question.dto";
import { QuestionSetDto } from "./question-set.dto";
import { UserDto } from "./user.dto";

export interface ExamCreateReqDto {
  title: string;
  [SectionTypes.MATH]: {
    [Difficulties.EASY]: string;
    [Difficulties.BASE]: string;
    [Difficulties.HARD]: string;
  };
  [SectionTypes.READING_WRITING]: {
    [Difficulties.EASY]: string;
    [Difficulties.BASE]: string;
    [Difficulties.HARD]: string;
  };
}

export interface ExamAssignReqDto {
  examId: string;
  userIds: string[];
}

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
  timeTaken?: number = 0;

  constructor(data: IQuestionSet) {
    this.id = data._id;
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

export class ExamQuestionAnswerSubmitDto {
  questionId: string;
  selectedOption?: number;
  textAnswer?: string;
}

export class ExamSectionSubmitDto {
  id: string;
  timeTaken: number;
  questionAnswers: ExamQuestionAnswerSubmitDto[];
}

export interface ExamQuestionVerifiedAnswerDto
  extends ExamQuestionAnswerSubmitDto {
  isCorrect: boolean;
}

export class ExamSectionVerifiedResultDto {
  questionSetId: string;
  score: number;
  timeTaken: number;
  verifiedAnswers: ExamQuestionVerifiedAnswerDto[];

  constructor(
    questionSetId: string,
    score: number = 0,
    timeTaken: number,
    verifiedAnswers: ExamQuestionVerifiedAnswerDto[]
  ) {
    this.questionSetId = questionSetId;
    this.score = score;
    this.timeTaken = timeTaken;
    this.verifiedAnswers = verifiedAnswers;
  }
}

export class ExamQuestionAnswerResultDto extends QuestionDto {
  isCorrect: boolean;
  selectedOption?: number;
  textAnswer?: string;

  constructor(data: IExamQuestionAnswerResult) {
    super(data.question);
    this.isCorrect = data.isCorrect;
    this.selectedOption = data.selectedOption;
    this.textAnswer = data.textAnswer;
  }
}

export class ExamSectionResultDto extends QuestionSetDto {
  score: number;
  timeTaken: number;
  questions: ExamQuestionAnswerResultDto[];

  constructor(examSectionResult: IExamSectionResult) {
    super(examSectionResult.questionSet);
    this.score = examSectionResult.score;
    this.timeTaken = examSectionResult.timeTaken;
    this.questions = examSectionResult.questionAnswerResults.map(
      (result) => new ExamQuestionAnswerResultDto(result)
    );
  }
}

export class ExamResultDto {
  id: string;
  user: UserDto;
  createdAt: Date;
  updatedAt: Date;
  sectionResults: ExamSectionResultDto[];

  constructor(data: IExamResult) {
    this.id = data._id;
    this.user = new UserDto(data.user);
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.sectionResults = data.sectionResults.map(
      (result) => new ExamSectionResultDto(result)
    );
  }
}

export class ExamDto {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  [SectionTypes.MATH]: {
    [Difficulties.EASY]: QuestionSetDto;
    [Difficulties.BASE]: QuestionSetDto;
    [Difficulties.HARD]: QuestionSetDto;
  };

  [SectionTypes.READING_WRITING]: {
    [Difficulties.EASY]: QuestionSetDto;
    [Difficulties.BASE]: QuestionSetDto;
    [Difficulties.HARD]: QuestionSetDto;
  };
  assignedTo: UserDto[];
  attendedBy: Array<{
    user: UserDto;
    result?: ExamResultDto;
  }>;

  constructor(data: IExam) {
    this.id = data._id;
    this.title = data.title;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this[SectionTypes.MATH] = {
      [Difficulties.EASY]: new QuestionSetDto(
        data[SectionTypes.MATH][Difficulties.EASY]
      ),
      [Difficulties.BASE]: new QuestionSetDto(
        data[SectionTypes.MATH][Difficulties.BASE]
      ),
      [Difficulties.HARD]: new QuestionSetDto(
        data[SectionTypes.MATH][Difficulties.HARD]
      ),
    };

    this[SectionTypes.READING_WRITING] = {
      [Difficulties.EASY]: new QuestionSetDto(
        data[SectionTypes.READING_WRITING][Difficulties.EASY]
      ),
      [Difficulties.BASE]: new QuestionSetDto(
        data[SectionTypes.READING_WRITING][Difficulties.BASE]
      ),
      [Difficulties.HARD]: new QuestionSetDto(
        data[SectionTypes.READING_WRITING][Difficulties.HARD]
      ),
    };

    this.assignedTo = data.assignedTo.map((user) => new UserDto(user));

    this.attendedBy = data.attendedBy.map((d) => ({
      user: new UserDto(d.user),
      result: d.result ? new ExamResultDto(d.result) : undefined,
    }));
  }
}
