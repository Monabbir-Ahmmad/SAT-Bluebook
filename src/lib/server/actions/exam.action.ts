import { Difficulties, OptionTypes, SectionTypes } from "@/constants/enums";
import { Exam, ExamResult, QuestionSet } from "../models";
import {
  ExamAssignReqDto,
  ExamCreateReqDto,
  ExamDto,
  ExamResultDto,
  ExamSectionDto,
  ExamSectionResultDto,
  ExamSectionSubmitDto,
} from "@/dtos/exam.dto";

import { HttpError } from "../utils/httpError";
import { IQuestion } from "../models/question.model";
import { IQuestionSet } from "../models/question-set.model";
import { StatusCode } from "@/constants/status-code";
import { Types } from "mongoose";
import { questionSetSize } from "@/constants/data";

export default class ExamAction {
  async createExam(examCreateReq: ExamCreateReqDto) {
    const exam = await Exam.create(examCreateReq);

    await exam.populate([
      {
        path: `${SectionTypes.MATH}.${Difficulties.EASY}`,
      },
      { path: `${SectionTypes.MATH}.${Difficulties.BASE}` },
      { path: `${SectionTypes.MATH}.${Difficulties.HARD}` },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.EASY}`,
      },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.BASE}`,
      },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.HARD}`,
      },
    ]);

    return new ExamDto(exam);
  }

  async assignExam(examAssignReq: ExamAssignReqDto) {
    const exam = await Exam.findByIdAndUpdate(
      examAssignReq.examId,
      {
        $set: {
          assignedTo: examAssignReq.userIds,
        },
      },
      { new: true }
    );

    if (!exam) throw new HttpError(StatusCode.NOT_FOUND, "Exam not found");

    await exam.populate([
      {
        path: `${SectionTypes.MATH}.${Difficulties.EASY}`,
      },
      { path: `${SectionTypes.MATH}.${Difficulties.BASE}` },
      { path: `${SectionTypes.MATH}.${Difficulties.HARD}` },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.EASY}`,
      },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.BASE}`,
      },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.HARD}`,
      },
    ]);

    return new ExamDto(exam);
  }

  async getExamById(examId: string) {
    if (!Types.ObjectId.isValid(examId))
      throw new HttpError(StatusCode.NOT_FOUND, "Exam not found.");

    const exam = await Exam.findById(examId).populate([
      {
        path: `${SectionTypes.MATH}.${Difficulties.EASY}`,
      },
      { path: `${SectionTypes.MATH}.${Difficulties.BASE}` },
      { path: `${SectionTypes.MATH}.${Difficulties.HARD}` },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.EASY}`,
      },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.BASE}`,
      },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.HARD}`,
      },
    ]);

    if (!exam) throw new HttpError(StatusCode.NOT_FOUND, "Exam not found.");

    return new ExamDto(exam);
  }

  async startExamById(examId: string, userId: string) {
    const exam = await this.getExamById(examId);

    if (exam.attendedBy.find((val) => val.user.id == userId))
      throw new HttpError(StatusCode.FORBIDDEN, "You already took this exam.");

    await Exam.findByIdAndUpdate(examId, {
      $addToSet: {
        attendedBy: [
          {
            user: new Types.ObjectId(userId),
          },
        ],
      },
    });

    return exam;
  }

  async getExamSectionByExamId(
    examId: string,
    section: SectionTypes,
    score?: number
  ) {
    const exam = await this.getExamById(examId);

    let difficulty;

    if (score === undefined) difficulty = Difficulties.BASE;
    else if (score / questionSetSize[section] > 0.6)
      difficulty = Difficulties.HARD;
    else difficulty = Difficulties.EASY;

    const questionSetId = exam[section][difficulty].id;

    const questionSet: IQuestionSet | null = await QuestionSet.findById(
      questionSetId
    ).populate({
      path: "questions",
      select: {
        answers: 0,
      },
    });

    if (!questionSet)
      throw new HttpError(StatusCode.NOT_FOUND, "Exam section not found.");

    return new ExamSectionDto(questionSet);
  }

  async getExamList() {
    const exams = await Exam.find().populate([
      {
        path: `${SectionTypes.MATH}.${Difficulties.EASY}`,
      },
      { path: `${SectionTypes.MATH}.${Difficulties.BASE}` },
      { path: `${SectionTypes.MATH}.${Difficulties.HARD}` },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.EASY}`,
      },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.BASE}`,
      },
      {
        path: `${SectionTypes.READING_WRITING}.${Difficulties.HARD}`,
      },
    ]);

    return exams.map((exam) => new ExamDto(exam));
  }

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
