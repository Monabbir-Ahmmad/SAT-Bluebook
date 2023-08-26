import { QuestionResDTO } from "./question.dto";

export interface ExamQuestionResDTO extends QuestionResDTO {
  selectedOption?: number;
  textAnswer?: string;
  markedWrong?: number[];
  markedForReview?: boolean;
}

export interface ExamResDTO {
  id: string;
  title: string;
  section: string;
  questions: ExamQuestionResDTO[];
}
