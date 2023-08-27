import { QuestionCreateReqDto, QuestionDto } from "@/dtos/question.dto";

import { IQuestion } from "../models/question.model";
import { Question } from "../models";
import { storeBase64AsFile } from "../utils/file.util";

export default class QuestionAction {
  async create(data: QuestionCreateReqDto) {
    if (data.questionImage)
      data.questionImage = await storeBase64AsFile(data.questionImage);

    for (let i = 0; i < data.options.length; i++) {
      if (data.options[i].image)
        data.options[i].image = await storeBase64AsFile(data.options[i].image!);
    }

    const question: IQuestion = await Question.create(data);

    return new QuestionDto(question);
  }

  async getQuestions(section?: string | null) {
    const questions: IQuestion[] = await Question.find({
      section: section || { $exists: true },
    });

    return questions.map((question) => new QuestionDto(question));
  }
}
