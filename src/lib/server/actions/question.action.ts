import { Question } from "../models";
import { QuestionCreateReqDTO } from "@/dtos/question.dto";
import { storeBase64AsFile } from "../utils/file.util";

export default class QuestionAction {
  async create(data: QuestionCreateReqDTO) {
    if (data.questionImage)
      data.questionImage = await storeBase64AsFile(data.questionImage);

    for (let i = 0; i < data.options.length; i++) {
      if (data.options[i].image)
        data.options[i].image = await storeBase64AsFile(data.options[i].image!);
    }

    const question = await Question.create(data);

    return question;
  }
}
