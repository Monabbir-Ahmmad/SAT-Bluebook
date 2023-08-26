import { HttpError } from "../utils/httpError";
import { IQuestionSet } from "../models/question-set.model";
import { QuestionSet } from "../models";
import { StatusCode } from "@/constants/status-code";
import { mapper } from "../config/mapper";

export default class ExamAction {
  async getQuestionSet() {
    const count = await QuestionSet.countDocuments();

    const random = Math.floor(Math.random() * count);

    const questionSet: IQuestionSet | null = await QuestionSet.findOne()
      .skip(random)
      .populate({
        path: "questions",
        select: {
          answers: 0,
        },
      });

    if (!questionSet)
      throw new HttpError(StatusCode.NOT_FOUND, "Question set not found.");

    return mapper.questionSetModel.to.questionSetDTO.map(questionSet);
  }
}
