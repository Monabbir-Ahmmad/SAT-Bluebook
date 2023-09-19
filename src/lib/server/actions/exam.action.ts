import { Difficulties, OptionTypes, SectionTypes } from "@/constants/enums";
import { ExamResult, QuestionSet } from "../models";
import {
  ExamResultDto,
  ExamSectionDto,
  ExamSectionResultDto,
  ExamSectionSubmitDto,
} from "@/dtos/exam.dto";

import { HttpError } from "../utils/httpError";
import { IQuestion } from "../models/question.model";
import { IQuestionSet } from "../models/question-set.model";
import { StatusCode } from "@/constants/status-code";
import { questionSetSize } from "@/constants/data";

export default class ExamAction {
  async getExamSection(section: SectionTypes) {
    const count = await QuestionSet.countDocuments({
      section,
    });

    const random = Math.floor(Math.random() * count);

    const questionSet: IQuestionSet | null = await QuestionSet.findOne({
      section,
    })
      .skip(random)
      .populate({
        path: "questions",
        select: {
          answers: 0,
        },
      });

    if (!questionSet)
      throw new HttpError(StatusCode.NOT_FOUND, "Exam section not found.");

    return new ExamSectionDto(questionSet);
  }

  async getDynamicExamSection(section: SectionTypes, score?: number) {
    let difficulty;

    if (score === undefined) difficulty = Difficulties.BASE;
    else if (score / questionSetSize[section] > 0.6)
      difficulty = Difficulties.HARD;
    else difficulty = Difficulties.EASY;

    const count = await QuestionSet.countDocuments({
      section,
      difficulty,
    });

    const random = Math.floor(Math.random() * count);

    const questionSet: IQuestionSet | null = await QuestionSet.findOne({
      section,
      difficulty,
    })
      .skip(random)
      .populate({
        path: "questions",
        select: {
          answers: 0,
        },
      });

    if (!questionSet)
      throw new HttpError(StatusCode.NOT_FOUND, "Exam section not found.");

    return new ExamSectionDto(questionSet);
  }

  async verifyExamSection(data: ExamSectionSubmitDto) {
    const questionSet = await QuestionSet.findById(data.id).populate({
      path: "questions",
    });

    if (!questionSet)
      throw new HttpError(StatusCode.NOT_FOUND, "Question set not found.");

    let score = 0;

    const questions = questionSet.questions as IQuestion[];

    questions.forEach((question: IQuestion) => {
      const submittedAns = data.questions.find((q) => q.id === question.id);

      if (
        question.optionType === OptionTypes.GRID_IN &&
        question.options[0] === submittedAns?.textAnswer
      )
        score += 1;
      else if (
        submittedAns?.selectedOption !== undefined &&
        question.answers.includes(submittedAns.selectedOption)
      ) {
        score += 1;
      }
    });

    return new ExamSectionResultDto(
      questionSet.id,
      questionSet.section,
      score,
      data.timeTaken
    );
  }

  async submitExamResult(userId: string, data: ExamSectionResultDto[]) {
    data = data.sort((a, b) => {
      if (a.section < b.section) return -1;
      else if (a.section > b.section) return 1;
      else return 0;
    });

    let examResult = await ExamResult.create({
      user: userId,
      results: data.map((d) => ({
        questionSet: d.id,
        score: d.score,
        timeTaken: d.timeTaken,
      })),
    });

    examResult = await examResult.populate([
      {
        path: "results.questionSet",
      },
      {
        path: "user",
      },
    ]);

    return new ExamResultDto(examResult);
  }

  async getExamResult(examId: string) {
    const examResult = await ExamResult.findById(examId).populate([
      {
        path: "results.questionSet",
      },
      {
        path: "user",
      },
    ]);

    if (!examResult)
      throw new HttpError(StatusCode.NOT_FOUND, "Exam result not found.");

    return new ExamResultDto(examResult);
  }

  async getExamResults(userId: string) {
    const examResults = await ExamResult.find({ user: userId }).populate([
      {
        path: "results.questionSet",
      },
      {
        path: "user",
      },
    ]);

    return examResults.map((examResult) => new ExamResultDto(examResult));
  }
}
