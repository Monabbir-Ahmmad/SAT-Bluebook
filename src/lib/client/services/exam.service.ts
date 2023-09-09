import {
  ExamResultDto,
  ExamSectionDto,
  ExamSectionResultDto,
  ExamSectionSubmitDto,
} from "@/dtos/exam.dto";

import { SectionTypes } from "@/constants/enums";
import apiUrl from "@/constants/api-url";
import { httpClient } from "../http-client";

export default class ExamService {
  async getExamSection(section: SectionTypes, score?: number) {
    const res = await httpClient.get<ExamSectionDto>(
      apiUrl.exam.getExamSection + `/${section}`,
      {
        params: {
          score,
        },
      }
    );
    return res.data;
  }

  async submitExamSection(data: ExamSectionSubmitDto) {
    const res = await httpClient.post<ExamSectionResultDto>(
      apiUrl.exam.verifySection,
      data
    );
    return res.data;
  }

  async submitExamResult(data: ExamSectionResultDto[]) {
    const res = await httpClient.post<ExamResultDto>(
      apiUrl.exam.submitExamResult,
      data
    );
    return res.data;
  }

  async getExamResult(examId: string) {
    const res = await httpClient.get<ExamResultDto>(
      apiUrl.exam.getExamResult + `/${examId}`
    );
    return res.data;
  }

  async getExamResults() {
    const res = await httpClient.get<ExamResultDto[]>(
      apiUrl.exam.getExamResults
    );
    return res.data;
  }
}
