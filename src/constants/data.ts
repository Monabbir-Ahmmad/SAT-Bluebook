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
