import { Question } from "../models";
import { QuestionCreateReqDTO } from "@/dtos/question.dto";
import { mapper } from "../config/mapper";
import { storeBase64AsFile } from "../utils/file.util";
import { IQuestion } from "../models/question.model";

export default class QuestionAction {
  async create(data: QuestionCreateReqDTO) {
    if (data.questionImage)
      data.questionImage = await storeBase64AsFile(data.questionImage);

    for (let i = 0; i < data.options.length; i++) {
      if (data.options[i].image)
        data.options[i].image = await storeBase64AsFile(data.options[i].image!);
    }

    const question: IQuestion = await Question.create(data);

    return mapper.questionModel.to.questionDTO.map(question);
  }

  async getQuestionsBySection(section: string) {
    const questions: IQuestion[] = await Question.find({
      section,
    });

    return questions.map((question) =>
      mapper.questionModel.to.questionDTO.map(question)
    );
  }
}
