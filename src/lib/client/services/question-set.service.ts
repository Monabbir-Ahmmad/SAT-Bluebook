import { QuestionSetCreateReqDTO } from "@/dtos/question-set.dto";
import apiUrl from "@/constants/api-url";
import { httpClient } from "../http-client";

export default class QuestionSetService {
  async create(questionSet: QuestionSetCreateReqDTO) {
    const res = await httpClient.post(apiUrl.questionSet.create, questionSet);
    return res.data;
  }

  async get() {
    const res = await httpClient.get(apiUrl.questionSet.get);
    return res.data;
  }
}
