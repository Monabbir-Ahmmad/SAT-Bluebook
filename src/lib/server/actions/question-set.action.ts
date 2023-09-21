import {
  QuestionSetCreateReqDto,
  QuestionSetDto,
} from "@/dtos/question-set.dto";

import { QuestionSet } from "../models";

export default class QuestionSetAction {
  async create(data: QuestionSetCreateReqDto) {
    const questionSet = await QuestionSet.create(data);

    return new QuestionSetDto(questionSet);
  }

  async getQuestionSetBySection(section: string) {
    const questionSets = await QuestionSet.find({ section });

    return questionSets.map((questionSet) => new QuestionSetDto(questionSet));
  }

  async getQuestionSetList(
    section?: string | null,
    difficulty?: string | null
  ) {
    const questionSets = await QuestionSet.find({
      section: section || { $exists: true },
      difficulty: difficulty || { $exists: true },
    }).populate({
      path: "questions",
    });

    return questionSets.map((questionSet) => new QuestionSetDto(questionSet));
  }
}
