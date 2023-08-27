import { QuestionSetCreateReqDto } from "@/dtos/question-set.dto";
import apiUrl from "@/constants/api-url";
import { httpClient } from "../http-client";

export default class QuestionSetService {
  async create(data: QuestionSetCreateReqDto) {
    const res = await httpClient.post(apiUrl.questionSet.create, data);
    return res.data;
  }

  async get() {
    const res = await httpClient.get(apiUrl.questionSet.get);
    return res.data;
  }
}
