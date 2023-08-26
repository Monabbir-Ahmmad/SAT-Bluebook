import { Question, QuestionSet } from "../models";

import { QuestionSetCreateReqDTO } from "@/dtos/question-set.dto";
import { mapper } from "../config/mapper";

export default class QuestionSetAction {
  async create(data: QuestionSetCreateReqDTO) {
    const questionSet = await QuestionSet.create(data);

    return mapper.questionSetModel.to.questionSetDTO.map(questionSet);
  }

  async getQuestionSetBySection(section: string) {
    const questions = await Question.find({
      section,
    });

    return questions.map((question) =>
      mapper.questionModel.to.questionDTO.map(question)
    );
  }
}
