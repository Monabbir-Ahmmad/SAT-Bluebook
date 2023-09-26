import {
  ExamAssignReqDto,
  ExamCreateReqDto,
  ExamDto,
  ExamResultDto,
  ExamSectionDto,
  ExamSectionResultDto,
  ExamSectionSubmitDto,
} from "@/dtos/exam.dto";

import { SectionTypes } from "@/constants/enums";
import apiUrl from "@/constants/api-url";
import { httpClient } from "../http-client";

export default class ExamService {
  async assignExam(data: ExamAssignReqDto) {
    const res = await httpClient.post<ExamDto>(apiUrl.exam.assignExam, data);
    return res.data;
  }

  async createExam(data: ExamCreateReqDto) {
    const res = await httpClient.post<ExamDto>(apiUrl.exam.createExam, data);
    return res.data;
  }

  async getAssignedExams() {
    const res = await httpClient.get<ExamDto[]>(apiUrl.exam.getAssignedExams);
    return res.data;
  }

  async getDynamicExamSection(section: SectionTypes, score?: number) {
    const res = await httpClient.get<ExamSectionDto>(
      apiUrl.exam.getDynamicExamSection + `/${section}`,
      {
        params: {
          score,
        },
      }
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

  async getExamSection(section: SectionTypes) {
    const res = await httpClient.get<ExamSectionDto>(
      apiUrl.exam.getExamSection + `/${section}`
    );
    return res.data;
  }

  async getExamSectionByExamId(
    examId: string,
    section: SectionTypes,
    score?: number
  ) {
    const res = await httpClient.get<ExamSectionDto>(
      apiUrl.exam.getExamSectionByExamId + `/${examId}/${section}`,
      {
        params: {
          score,
        },
      }
    );
    return res.data;
  }

  async getList() {
    const res = await httpClient.get<ExamDto[]>(apiUrl.exam.getExamList);
    return res.data;
  }

  async startExamById(examId: string) {
    const res = await httpClient.post<ExamDto>(
      apiUrl.exam.startExamById + "/" + examId
    );
    return res.data;
  }

  async submitExamResult(data: ExamSectionResultDto[], examId?: string) {
    const res = await httpClient.post<ExamResultDto>(
      apiUrl.exam.submitExamResult,
      data,
      {
        params: {
          examId,
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
}
