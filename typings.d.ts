type OptionType = "mcq-text" | "mcq-image" | "grid-in";

type SubjectType = "math" | "reading" | "writing";

interface QuestionCreateReqDTO {
  question: string;
  passage?: string;
  questionImage?: string;
  subject: SubjectType;
  difficulty: number; // Higher is harder
  tags: string[];
  optionType: OptionType;
  options: QuestionOptionDTO[];
  answers: number[]; //Index of the correct answer
}

interface QuestionResDTO {
  id: string;
  question: string;
  passage?: string;
  questionImage?: string;
  subject: SubjectType;
  difficulty: number; // Higher is harder
  tags: string[];
  optionType: OptionType;
  options: QuestionOptionDTO[];
  answers: number[]; //Index of the correct answer
}

interface QuestionOptionDTO {
  text?: string;
  image?: string;
}

interface ExamQuestionResDTO extends QuestionResDTO {
  selectedOption?: number;
  textAnswer?: string;
  markedWrong?: number[];
  markedForReview?: boolean;
}
