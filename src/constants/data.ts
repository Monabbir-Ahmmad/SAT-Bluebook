export const answerType: { value: OptionType; label: string }[] = [
  { value: "mcq-text", label: "Multiple Choice Text" },
  { value: "mcq-image", label: "Multiple Choice Image" },
  { value: "grid-in", label: "Grid In" },
];

export const difficulties: { value: string; label: string }[] = [
  { value: "0", label: "Easy" },
  { value: "1", label: "Medium" },
  { value: "2", label: "Hard" },
];

export const subjects: { value: string; label: string }[] = [
  { value: "math", label: "Mathematics" },
  { value: "english", label: "English" },
  { value: "science", label: "Science" },
  { value: "history", label: "History" },
];

export const questions: QuestionResDTO[] = [
  {
    id: "1",
    question: "What is the capital of France?",
    subject: "Social Studies",
    difficulty: 2,
    tags: ["Geography", "World Capitals"],
    optionType: "mcq-text",
    options: [
      { text: "London" },
      { text: "Paris" },
      { text: "Berlin" },
      { text: "Rome" },
    ],
    answers: [1],
  },
  {
    id: "2",
    question: "Which planet is known as the 'Red Planet'?",
    subject: "Science",
    difficulty: 2,
    tags: ["Astronomy", "Planets"],
    optionType: "mcq-text",
    options: [
      { text: "Venus" },
      { text: "Mars" },
      { text: "Jupiter" },
      { text: "Saturn" },
    ],
    answers: [1],
  },
  {
    id: "3",
    question: "Solve: 5 + 7 * 2",
    subject: "Math",
    difficulty: 1,
    tags: ["Arithmetic", "Order of Operations"],
    optionType: "grid-in",
    options: [{ text: "24" }],
    answers: [0],
  },
  {
    id: "4",
    question: "Which famous scientist formulated the theory of relativity?",
    subject: "Science",
    difficulty: 2,
    tags: ["Physics", "Famous Scientists"],
    optionType: "mcq-text",
    options: [
      { text: "Isaac Newton" },
      { text: "Albert Einstein" },
      { text: "Galileo Galilei" },
      { text: "Marie Curie" },
    ],
    answers: [1],
  },
  {
    id: "5",
    question: "Which of the following is a primary color?",
    subject: "Art",
    difficulty: 2,
    tags: ["Color Theory", "Art Basics"],
    optionType: "mcq-text",
    options: [
      { text: "Red" },
      { text: "Green" },
      { text: "Black" },
      { text: "Purple" },
    ],
    answers: [0],
  },
];
