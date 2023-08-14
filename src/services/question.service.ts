import apiUrl from "@/constants/api-url";
import { httpClient } from "@/lib/http-client";

export default class QuestionService {
  async create(question: QuestionDTO) {
    const res = await httpClient.post<QuestionResDTO>(
      apiUrl.question.create,
      question
    );

    return res.data;
  }

  async get() {
    const res = await httpClient.get<QuestionResDTO[]>(apiUrl.question.get);

    return res.data;
  }
}
