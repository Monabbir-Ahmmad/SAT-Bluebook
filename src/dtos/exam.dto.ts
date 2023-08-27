import { QuestionDto } from "./question.dto";

export interface ExamQuestionDto extends QuestionDto {
  selectedOption?: number;
  textAnswer?: string;
  markedWrong?: number[];
  markedForReview?: boolean;
}

export class ExamDto {
  id: string;
  title: string;
  section: string;
  questions: ExamQuestionDto[];
}
