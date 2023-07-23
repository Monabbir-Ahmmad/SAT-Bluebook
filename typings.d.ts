type Difficulty = "easy" | "medium" | "hard";

type OptionType = "mcq-text" | "mcq-image" | "grid-in";

type QuestionDTO = {
  question: string;
  questionImage?: string;
  subject: string;
  difficulty: Difficulty;
  tags: string[];
  optionType: OptionType;
  options: QuestionOptionDTO[];
  answers: any[];
};

type QuestionOptionDTO = {
  text?: string;
  image?: string;
};
