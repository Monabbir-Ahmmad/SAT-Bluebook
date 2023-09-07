import { Difficulties, OptionTypes, SectionTypes } from "./enums";

export const questionSetSize = {
  [SectionTypes.MATH]: 44,
  [SectionTypes.READING]: 3,
  [SectionTypes.WRITING]: 27,
};

export const examSectionTime = {
  [SectionTypes.MATH]: 5,
  [SectionTypes.READING]: 5,
  [SectionTypes.WRITING]: 5,
};

export const answerType: { value: OptionTypes; label: string }[] = [
  { value: OptionTypes.MCQ_TEXT, label: "Multiple Choice Text" },
  { value: OptionTypes.MCQ_IMAGE, label: "Multiple Choice Image" },
  { value: OptionTypes.GRID_IN, label: "Grid In" },
];

export const difficulties: { value: Difficulties; label: string }[] = [
  { value: Difficulties.EASY, label: "Easy" },
  { value: Difficulties.MEDIUM, label: "Medium" },
  { value: Difficulties.HARD, label: "Hard" },
];

export const sections: { value: SectionTypes; label: string }[] = [
  { value: SectionTypes.MATH, label: "Mathematics" },
  { value: SectionTypes.READING, label: "Reading" },
  { value: SectionTypes.WRITING, label: "Writing" },
];

export const adminDashboardItems = [
  {
    id: "1",
    image: "https://img.icons8.com/clouds/256/000000/books.png",
    label: "Add Questions",
    description: "Add questions to the question bank.",
    content: [
      {
        id: "1.1",
        href: "/admin/question/create",
        label: "Create Question",
        description: "Create a question for the question bank.",
        image: "https://img.icons8.com/clouds/256/000000/question-mark.png",
      },
    ],
  },
  {
    id: "2",
    image: "https://img.icons8.com/clouds/256/000000/survey.png",
    label: "Create Question Sets",
    description: "Create question sets for the students.",
    content: [
      {
        id: "2.1",
        href: "/admin/question-set/create/math",
        label: "Create Math Question Set",
        description: "Create a question set for mathmatics section.",
        image: "https://img.icons8.com/clouds/256/000000/calculator.png",
      },
      {
        id: "2.2",
        href: "/admin/question-set/create/reading",
        label: "Create Reading Question Set",
        description: "Create a question set for reading section.",
        image: "https://img.icons8.com/clouds/256/000000/book-reading.png",
      },

      {
        id: "2.3",
        href: "/admin/question-set/create/writing",
        label: "Create Writing Question Set",
        description: "Create a question set for writing section.",
        image: "https://img.icons8.com/clouds/256/000000/hand-with-pen.png",
      },
    ],
  },
];

export const studentDashboardItems = [
  {
    id: "1",
    image: "https://img.icons8.com/clouds/256/000000/survey.png",
    label: "Full-Length SAT",
    description: "Take a full-length test to simulate the real SAT exam.",
    content: [
      {
        id: "1.1",
        href: "/student/exam",
        label: "SAT Random Difficulty",
        description: "Take a full-length SAT exam with random difficulty.",
        image: "https://img.icons8.com/clouds/256/000000/learning.png",
      },
      {
        id: "1.2",
        href: "/student/exam",
        label: "SAT In Order Difficulty",
        description:
          "Take a full-length SAT exam with increasing difficulty based on your performance.",
        image: "https://img.icons8.com/clouds/256/000000/glossary.png",
      },
    ],
  },
  {
    id: "2",
    image: "https://img.icons8.com/clouds/256/000000/books.png",
    label: "Section Tests",
    description: "Take a test to focus on a specific topic.",
    content: [
      {
        id: "2.1",
        href: "/student/section/math",
        label: "Mathmatics",
        description: "Take a full-length mathmatics test.",
        image: "https://img.icons8.com/clouds/256/000000/calculator.png",
      },
      {
        id: "2.2",
        href: "/student/section/reading",
        label: "Reading",
        description: "Take a full-length reading test.",
        image: "https://img.icons8.com/clouds/256/000000/book-reading.png",
      },
      {
        id: "2.3",
        href: "/student/section/writing",
        label: "Writing",
        description: "Take a full-length writing test.",
        image: "https://img.icons8.com/clouds/256/000000/hand-with-pen.png",
      },
    ],
  },
];
