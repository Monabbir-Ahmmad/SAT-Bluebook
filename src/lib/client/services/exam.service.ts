import apiUrl from "@/constants/api-url";
import { httpClient } from "../http-client";

export default class ExamService {
  async get() {
    const res = await httpClient.get(apiUrl.exam.get);
    return res.data;
  }
}
