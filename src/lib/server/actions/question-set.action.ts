import { QuestionSet } from "../models";
import {
  QuestionSetCreateReqDto,
  QuestionSetDto,
} from "@/dtos/question-set.dto";

export default class QuestionSetAction {
  async create(data: QuestionSetCreateReqDto) {
    const questionSet = await QuestionSet.create(data);

    return new QuestionSetDto(questionSet);
  }

  async getQuestionSetBySection(section: string) {
    const questionSets = await QuestionSet.find({ section });

    return questionSets.map((questionSet) => new QuestionSetDto(questionSet));
  }

  async getQuestionSetList() {
    const questionSets = await QuestionSet.find().populate({
      path: "questions",
    });

    return questionSets.map((questionSet) => new QuestionSetDto(questionSet));
  }
}
