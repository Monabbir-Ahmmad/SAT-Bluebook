import { Difficulties, OptionTypes, SectionTypes } from "./enums";

export const QUESTION_SET_SIZE = {
  [SectionTypes.MATH]: 22,
  [SectionTypes.READING_WRITING]: 27,
};

export const EXAM_SECTION_DEFAULT_TIME = {
  [SectionTypes.MATH]: 35 * 60,
  [SectionTypes.READING_WRITING]: 32 * 60,
};

export const DEFAULT_EXAM_BREAK_TIME = 5 * 60;

export const answerType: { value: OptionTypes; label: string }[] = [
  { value: OptionTypes.MCQ_TEXT, label: "Multiple Choice Text" },
  { value: OptionTypes.MCQ_IMAGE, label: "Multiple Choice Image" },
  { value: OptionTypes.GRID_IN, label: "Grid In" },
];

export const difficulties: { value: Difficulties; label: string }[] = [
  { value: Difficulties.EASY, label: "Easy" },
  { value: Difficulties.BASE, label: "Base" },
  { value: Difficulties.HARD, label: "Hard" },
];

export const sections: { value: SectionTypes; label: string }[] = [
  { value: SectionTypes.MATH, label: "Mathematics" },
  { value: SectionTypes.READING_WRITING, label: "Reading & Writing" },
];

export const adminDashboardOptions = [
  {
    id: "1",
    image: "https://img.icons8.com/clouds/256/000000/books.png",
    label: "Create Questions",
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
        href: "/admin/question-set/create/reading_writing",
        label: "Create Reading & Writing Question Set",
        description: "Create a question set for reading & writing section.",
        image: "https://img.icons8.com/clouds/256/000000/book-reading.png",
      },
    ],
  },
  {
    id: "3",
    image: "https://img.icons8.com/clouds/256/000000/documents.png",
    label: "Create Exams",
    description: "Create exams for the students.",
    content: [
      {
        id: "3.1",
        href: "/admin/exam/create",
        label: "Create Complete Exam",
        description:
          "Create a complete exam for the students with all sections.",
        image: "https://img.icons8.com/clouds/256/000000/document.png",
      },
    ],
  },
];

export const studentDashboardOptions = [
  {
    id: "1",
    image: "https://img.icons8.com/clouds/256/000000/survey.png",
    label: "Full-Length SAT",
    description: "Take a full-length test to simulate the real SAT exam.",
    content: [
      {
        id: "1.1",
        href: "/student/exam/dynamic-sat",
        label: "Dynamic SAT Exam",
        description:
          "Take a dynamic SAT exam that adjusts difficulty based on your performence.",
        image: "https://img.icons8.com/clouds/256/000000/glossary.png",
      },
      {
        id: "1.2",
        href: "/student/exam/predefined-sat",
        label: "Predefined SAT Exam",
        description: "Take a predefined SAT exam by using exam code or id",
        image: "https://img.icons8.com/clouds/256/000000/documents.png",
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
        href: "/student/exam/section/math",
        label: "Mathmatics",
        description: "Take a full-length mathmatics test.",
        image: "https://img.icons8.com/clouds/256/000000/calculator.png",
      },
      {
        id: "2.2",
        href: "/student/exam/section/reading_writing",
        label: "Reading & Writing",
        description: "Take a full-length reading & writing test.",
        image: "https://img.icons8.com/clouds/256/000000/book-reading.png",
      },
    ],
  },
];
