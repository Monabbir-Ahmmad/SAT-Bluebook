interface QuestionDTO {
  question: string;
  questionImage?: File;
  subject: string;
  difficulty: number;
  tags: string[];
  optionType: "text" | "image";
  options: {
    data: string | File;
    isAnswer?: boolean;
  }[];
}
