type OptionType = "mcq-text" | "mcq-image" | "grid-in";

type QuestionDTO = {
  question: string;
  questionImage?: string;
  subject: string;
  difficulty: number; // Higher is harder
  tags: string[];
  optionType: OptionType;
  options: QuestionOptionDTO[];
  answers: number[]; //Index of the correct answer
};

type QuestionResDTO = {
  id: string;
  question: string;
  questionImage?: string;
  subject: string;
  difficulty: number; // Higher is harder
  tags: string[];
  optionType: OptionType;
  options: QuestionOptionDTO[];
  answers: number[]; //Index of the correct answer
};

type QuestionOptionDTO = {
  text?: string;
  image?: string;
};
