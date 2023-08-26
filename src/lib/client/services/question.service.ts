import { QuestionCreateReqDTO, QuestionResDTO } from "@/dtos/question.dto";

import apiUrl from "@/constants/api-url";
import { httpClient } from "@/lib/client/http-client";

export default class QuestionService {
  async create(question: QuestionCreateReqDTO) {
    const res = await httpClient.post<QuestionResDTO>(
      apiUrl.question.create,
      question
    );

    return res.data;
  }

  async getListBySection(section: string) {
    const res = await httpClient.get<QuestionResDTO[]>(
      apiUrl.question.get + "?section=" + section
    );

    return res.data;
  }
}
