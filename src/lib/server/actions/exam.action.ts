import { Difficulties, OptionTypes, SectionTypes } from "@/constants/enums";
import { Exam, ExamResult, QuestionSet } from "../models";
import {
  ExamAssignReqDto,
  ExamCreateReqDto,
  ExamDto,
  ExamQuestionAnswerStatusDto,
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

    return new ExamDto(exam);
  }

  async createExam(examCreateReq: ExamCreateReqDto) {
    const exam = await Exam.create(examCreateReq);

    return new ExamDto(exam);
  }

  async getAssignedExams(userId: string) {
    const exams = await Exam.find({
      $and: [
        { assignedTo: userId },
        {
          "attendedBy.user": {
            $ne: userId,
          },
        },
      ],
    });

    return exams.map((exam) => new ExamDto(exam));
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

  async getExamById(examId: string) {
    if (!Types.ObjectId.isValid(examId))
      throw new HttpError(StatusCode.NOT_FOUND, "Exam not found.");

    const exam = await Exam.findById(examId);

    if (!exam) throw new HttpError(StatusCode.NOT_FOUND, "Exam not found.");

    return new ExamDto(exam);
  }

  async getExamList() {
    const exams = await Exam.find();

    return exams.map((exam) => new ExamDto(exam));
  }

  async getExamResult(examId: string) {
    const examResult = await ExamResult.findById(examId);

    if (!examResult)
      throw new HttpError(StatusCode.NOT_FOUND, "Exam result not found.");

    return new ExamResultDto(examResult);
  }

  async getExamResults(userId: string) {
    const examResults = await ExamResult.find({ user: userId });

    return examResults.map((examResult) => new ExamResultDto(examResult));
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

  async startExamById(examId: string, userId: string) {
    const exam = await this.getExamById(examId);

    if (exam.attendedBy.find((val) => val.user.id == userId))
      throw new HttpError(StatusCode.FORBIDDEN, "You already took this exam.");

    await Exam.findByIdAndUpdate(examId, {
      $addToSet: {
        attendedBy: [{ user: userId, createdAt: new Date() }],
      },
    });

    return exam;
  }

  async submitExamResult(
    userId: string,
    data: ExamSectionResultDto[],
    examId: string | null
  ) {
    const examResult = await ExamResult.create({
      user: userId,
      results: data.map((d) => ({
        questionSet: d.questionSetId,
        score: d.score,
        timeTaken: d.timeTaken,
        questionAnswerStatus: d.questionAnswerStatus.map((q) => ({
          question: q.questionId,
          isCorrect: q.isCorrect,
        })),
      })),
    });

    if (examId && Types.ObjectId.isValid(examId)) {
      await this.addExamResultToExam(examId, examResult.id, userId);
    }

    return new ExamResultDto(examResult);
  }

  async addExamResultToExam(
    examId: string,
    examResultId: string,
    userId: string
  ) {
    const exam = await Exam.findOneAndUpdate(
      {
        _id: examId,
        "attendedBy.user": userId,
      },
      {
        $set: {
          "attendedBy.$.result": examResultId,
        },
      }
    );

    if (!exam) throw new HttpError(StatusCode.NOT_FOUND, "Exam not found.");

    return new ExamDto(exam);
  }

  async verifyExamSection(data: ExamSectionSubmitDto) {
    const questionSet = await QuestionSet.findById(data.id).populate({
      path: "questions",
    });

    if (!questionSet)
      throw new HttpError(StatusCode.NOT_FOUND, "Question set not found.");

    let score = 0;

    const questions = questionSet.questions as IQuestion[];

    const questionAnswerStatus: ExamQuestionAnswerStatusDto[] = [];

    questions.forEach((question: IQuestion) => {
      const submittedAns = data.questions.find((q) => q.id === question.id);

      if (
        question.optionType === OptionTypes.GRID_IN &&
        question.options[0] === submittedAns?.textAnswer
      ) {
        score += 1;
        questionAnswerStatus.push(
          new ExamQuestionAnswerStatusDto(question.id, true)
        );
      } else if (
        submittedAns?.selectedOption !== undefined &&
        question.answers.includes(submittedAns.selectedOption)
      ) {
        score += 1;
        questionAnswerStatus.push(
          new ExamQuestionAnswerStatusDto(question.id, true)
        );
      } else {
        questionAnswerStatus.push(
          new ExamQuestionAnswerStatusDto(question.id, false)
        );
      }
    });

    return new ExamSectionResultDto(
      questionSet.id,
      questionSet.section,
      score,
      data.timeTaken,
      questionAnswerStatus
    );
  }
}
