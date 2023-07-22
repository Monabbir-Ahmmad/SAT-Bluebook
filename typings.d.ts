interface QuestionDTO {
  question: string;
  questionImage?: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  optionType: "text" | "image";
  options: QuestionOptionDTO[];
  answers: any[];
}

interface QuestionOptionDTO {
  text?: string;
  image?: string;
}
