export const answerType: { value: OptionType; label: string }[] = [
  { value: "mcq-text", label: "Multiple Choice Text" },
  { value: "mcq-image", label: "Multiple Choice Image" },
  { value: "grid-in", label: "Grid In" },
];

export const difficulties: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export const subjects: { value: string; label: string }[] = [
  { value: "math", label: "Mathematics" },
  { value: "english", label: "English" },
  { value: "science", label: "Science" },
  { value: "history", label: "History" },
];

export const questions: QuestionDTO[] = [
  {
    question: "What is the capital of India?",
    optionType: "mcq-text",
    difficulty: "easy",
    subject: "history",
    tags: ["india", "capital"],
    answers: [0],
    options: [
      { text: "Delhi" },
      { text: "Mumbai" },
      { text: "Kolkata" },
      { text: "Chennai" },
    ],
  },
  {
    question: "What is the capital of India?",
    questionImage: "https://i.imgur.com/3t4iY9v.jpeg",
    optionType: "mcq-text",
    difficulty: "easy",
    subject: "history",
    tags: ["india", "capital"],
    answers: [0],
    options: [
      { text: "Delhi" },
      { text: "Mumbai" },
      { text: "Kolkata" },
      { text: "Chennai" },
    ],
  },
  {
    question: "What does this symbol mean in this image?",
    questionImage: "https://i.imgur.com/3t4iY9v.jpeg",
    optionType: "mcq-image",
    difficulty: "easy",
    subject: "science",
    tags: ["symbol", "image"],
    answers: [0],
    options: [
      {
        image: "https://i.imgur.com/3t4iY9v.jpeg",
      },
      {
        image: "https://i.imgur.com/3t4iY9v.jpeg",
      },
      {
        image: "https://i.imgur.com/3t4iY9v.jpeg",
      },
      {
        image: "https://i.imgur.com/3t4iY9v.jpeg",
      },
    ],
  },

  {
    question: "What is the this equations value? 2x + 3 = 7",
    optionType: "grid-in",
    difficulty: "easy",
    subject: "math",
    tags: ["equation", "math"],
    answers: [2],
    options: [{ text: "2" }],
  },
];
