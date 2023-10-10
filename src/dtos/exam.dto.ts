import { Difficulties, SectionTypes } from "@/constants/enums";
import {
  IAttendedBy,
  IExam,
  IFullQuestionSet,
  IQuestionSetWithTime,
} from "@/lib/server/models/exam.model";
import {
  IExamQuestionAnswerResult,
  IExamResult,
  IExamSectionResult,
} from "@/lib/server/models/exam-result.model";

import { EXAM_SECTION_DEFAULT_TIME } from "@/constants/data";
import { IQuestionSet } from "@/lib/server/models/question-set.model";
import { QuestionDto } from "./question.dto";
import { QuestionSetDto } from "./question-set.dto";
import { UserDto } from "./user.dto";

export interface ExamCreateReqDto {
  title: string;
  [SectionTypes.MATH]: {
    [Difficulties.EASY]: {
      questionSet: string;
      timeLimit?: number;
      breakTime?: number;
    };
    [Difficulties.BASE]: {
      questionSet: string;
      timeLimit?: number;
      breakTime?: number;
    };
    [Difficulties.HARD]: {
      questionSet: string;
      timeLimit?: number;
      breakTime?: number;
    };
  };
  [SectionTypes.READING_WRITING]: {
    [Difficulties.EASY]: {
      questionSet: string;
      timeLimit?: number;
      breakTime?: number;
    };
    [Difficulties.BASE]: {
      questionSet: string;
      timeLimit?: number;
      breakTime?: number;
    };
    [Difficulties.HARD]: {
      questionSet: string;
      timeLimit?: number;
      breakTime?: number;
    };
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
  timeLimit: number = 0;
  breakTime: number = 0;

  constructor(data: IQuestionSet, timeLimit?: number, breakTime?: number) {
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

    if (timeLimit) this.timeLimit = timeLimit;
    else this.timeLimit = EXAM_SECTION_DEFAULT_TIME[data.section];

    if (breakTime) this.breakTime = breakTime;
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
  timeLimit?: number;
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
  timeLimit?: number;
  verifiedAnswers: ExamQuestionVerifiedAnswerDto[];

  constructor(
    questionSetId: string,
    score: number = 0,
    timeTaken: number,
    verifiedAnswers: ExamQuestionVerifiedAnswerDto[],
    timeLimit?: number
  ) {
    this.questionSetId = questionSetId;
    this.score = score;
    this.timeTaken = timeTaken;
    this.verifiedAnswers = verifiedAnswers;
    this.timeLimit = timeLimit;
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
  timeLimit: number;
  questions: ExamQuestionAnswerResultDto[];

  constructor(examSectionResult: IExamSectionResult) {
    super(examSectionResult.questionSet);
    this.score = examSectionResult.score;
    this.timeTaken = examSectionResult.timeTaken;
    this.questions = examSectionResult.questionAnswerResults.map(
      (result) => new ExamQuestionAnswerResultDto(result)
    );

    if (examSectionResult.timeLimit)
      this.timeLimit = examSectionResult.timeLimit;
    else
      this.timeLimit =
        EXAM_SECTION_DEFAULT_TIME[examSectionResult.questionSet.section];
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

export class ExamAttendedByDto {
  user: UserDto;
  result?: ExamResultDto;

  constructor(data: IAttendedBy) {
    this.user = new UserDto(data.user);
    this.result = data.result ? new ExamResultDto(data.result) : undefined;
  }
}

export class QuestionSetWithTimeDto extends QuestionSetDto {
  timeLimit?: number;
  breakTime?: number;

  constructor(data: IQuestionSetWithTime) {
    super(data.questionSet);
    this.timeLimit = data.timeLimit;
    this.breakTime = data.breakTime;
  }
}

export class FullQuestionSetDto {
  [Difficulties.EASY]: QuestionSetWithTimeDto;
  [Difficulties.BASE]: QuestionSetWithTimeDto;
  [Difficulties.HARD]: QuestionSetWithTimeDto;

  constructor(data: IFullQuestionSet) {
    this[Difficulties.EASY] = new QuestionSetWithTimeDto(
      data[Difficulties.EASY]
    );
    this[Difficulties.BASE] = new QuestionSetWithTimeDto(
      data[Difficulties.BASE]
    );
    this[Difficulties.HARD] = new QuestionSetWithTimeDto(
      data[Difficulties.HARD]
    );
  }
}

export class ExamDto {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  [SectionTypes.MATH]: FullQuestionSetDto;
  [SectionTypes.READING_WRITING]: FullQuestionSetDto;
  assignedTo: UserDto[];
  attendedBy: Array<ExamAttendedByDto>;

  constructor(data: IExam) {
    this.id = data._id;
    this.title = data.title;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this[SectionTypes.MATH] = new FullQuestionSetDto(data[SectionTypes.MATH]);

    this[SectionTypes.READING_WRITING] = new FullQuestionSetDto(
      data[SectionTypes.READING_WRITING]
    );

    this.assignedTo = data.assignedTo.map((user) => new UserDto(user));

    this.attendedBy = data.attendedBy.map((d) => ({
      user: new UserDto(d.user),
      result: d.result ? new ExamResultDto(d.result) : undefined,
    }));
  }
}
