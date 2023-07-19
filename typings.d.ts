interface QuestionDTO {
  question: string;
  questionImage?: File;
  subject: string;
  difficulty: number;
  tags: string[];
  optionType: "text" | "image";
  options: {
    text?: string;
    image?: File;
    isAnswer?: boolean;
  }[];
}
