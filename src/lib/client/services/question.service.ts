import { QuestionCreateReqDto, QuestionDto } from "@/dtos/question.dto";

import apiUrl from "@/constants/api-url";
import { httpClient } from "@/lib/client/http-client";

export default class QuestionService {
  async create(data: QuestionCreateReqDto) {
    const res = await httpClient.post<QuestionDto>(
      apiUrl.question.create,
      data
    );

    return res.data;
  }

  async getList(section?: string) {
    const res = await httpClient.get<QuestionDto[]>(apiUrl.question.get, {
      params: {
        section,
      },
    });

    return res.data;
  }
}
