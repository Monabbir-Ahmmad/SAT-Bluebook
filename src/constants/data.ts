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

export const subjects: { value: SubjectType; label: string }[] = [
  { value: "math", label: "Mathematics" },
  { value: "reading", label: "Reading" },
  { value: "writing", label: "Writing" },
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
        label: "SAT Ramdom Difficulty",
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
    image: "https://img.icons8.com/clouds/256/000000/menu.png",
    label: "Section Tests",
    description: "Take a section test to focus on a specific section.",
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
  {
    id: "3",
    image: "https://img.icons8.com/clouds/256/000000/books.png",
    label: "Question Sets",
    description: "Take a question set to focus on a specific topic.",
    content: [
      {
        id: "3.1",
        href: "/student/section/math",
        label: "Mathmatics",
        description: "Focus on a specific mathmatics topic.",
        image: "https://img.icons8.com/clouds/256/000000/math-book.png",
      },
      {
        id: "3.2",
        href: "/student/section/reading",
        label: "Reading",
        description: "Focus on a specific reading topic.",
        image: "https://img.icons8.com/clouds/256/000000/literature.png",
      },
      {
        id: "3.3",
        href: "/student/section/writing",
        label: "Writing",
        description: "Focus on a specific writing topic.",
        image: "https://img.icons8.com/clouds/256/000000/goodnotes.png",
      },
    ],
  },
];

export const questions: QuestionResDTO[] = [
  {
    id: "1",
    question: "What is the capital city of Australia?",
    passage:
      "Australia is a country and continent surrounded by the Indian and Pacific oceans. Its major cities – Sydney, Brisbane, Melbourne, Perth, Adelaide – are coastal. Its capital, Canberra, is inland. The country is known for its Sydney Opera House, the Great Barrier Reef, a vast interior desert wilderness called the Outback, and unique animal species like kangaroos and duck-billed platypuses.",
    subject: "reading",
    questionImage: "https://img.icons8.com/clouds/256/000000/reading.png",
    difficulty: 0,
    tags: ["geography"],
    optionType: "mcq-text",
    options: [
      { text: "Sydney" },
      { text: "Melbourne" },
      { text: "Canberra" },
      { text: "Perth" },
    ],
    answers: [2],
  },
  {
    id: "2",
    question: "Which of the following is a prime number?",
    subject: "math",
    difficulty: 1,
    tags: ["number-theory"],
    optionType: "mcq-text",
    options: [{ text: "15" }, { text: "9" }, { text: "11" }, { text: "12" }],
    answers: [2],
  },
  {
    id: "3",
    question: "What is the chemical symbol for gold?",
    subject: "reading",
    difficulty: 0,
    tags: ["chemistry"],
    optionType: "mcq-text",
    options: [{ text: "Au" }, { text: "Ag" }, { text: "Fe" }, { text: "Cu" }],
    answers: [0],
  },
  {
    id: "4",
    question: "Which author wrote the novel 'To Kill a Mockingbird'?",
    subject: "reading",
    difficulty: 1,
    tags: ["literature"],
    optionType: "mcq-text",
    options: [
      { text: "Ernest Hemingway" },
      { text: "Harper Lee" },
      { text: "J.K. Rowling" },
      { text: "Mark Twain" },
    ],
    answers: [1],
  },
  {
    id: "5",
    question: "Solve for x: 2x + 5 = 15",
    subject: "math",
    difficulty: 2,
    tags: ["algebra"],
    optionType: "grid-in",
    options: [{ text: "5" }],
    answers: [0],
  },
  {
    id: "6",
    question: "Which of the following is a greenhouse gas?",
    subject: "reading",
    difficulty: 0,
    tags: ["environmental-science"],
    optionType: "mcq-text",
    options: [
      { text: "Oxygen (O2)" },
      { text: "Nitrogen (N2)" },
      { text: "Carbon dioxide (CO2)" },
      { text: "Helium (He)" },
    ],
    answers: [2],
  },
  {
    id: "7",
    question: "In which year did the French Revolution begin?",
    subject: "reading",
    difficulty: 1,
    tags: ["history"],
    optionType: "mcq-text",
    options: [
      { text: "1789" },
      { text: "1776" },
      { text: "1804" },
      { text: "1832" },
    ],
    answers: [0],
  },
  {
    id: "8",
    question: "What is the derivative of x^2 with respect to x?",
    subject: "math",
    difficulty: 2,
    tags: ["calculus"],
    optionType: "grid-in",
    options: [{ text: "2x" }],
    answers: [0],
  },
  {
    id: "9",
    question: "Which of the following is a transitive verb?",
    subject: "reading",
    difficulty: 0,
    tags: ["grammar"],
    optionType: "mcq-text",
    options: [
      { text: "Run" },
      { text: "Eat" },
      { text: "Become" },
      { text: "Swim" },
    ],
    answers: [1],
  },
  {
    id: "10",
    question: "What is the chemical formula for water?",
    subject: "reading",
    difficulty: 1,
    tags: ["chemistry"],
    optionType: "mcq-text",
    options: [
      { text: "H2O" },
      { text: "CO2" },
      { text: "N2O" },
      { text: "CH4" },
    ],
    answers: [0],
  },
  {
    id: "11",
    question: "Solve the equation: 4(x - 3) = 20",
    subject: "math",
    difficulty: 0,
    tags: ["algebra"],
    optionType: "grid-in",
    options: [{ text: "8" }],
    answers: [0],
  },
  {
    id: "12",
    question: "Who is credited with the discovery of electricity?",
    subject: "reading",
    difficulty: 2,
    tags: ["physics"],
    optionType: "mcq-text",
    options: [
      { text: "Isaac Newton" },
      { text: "Thomas Edison" },
      { text: "Michael Faraday" },
      { text: "Nikola Tesla" },
    ],
    answers: [2],
  },
  {
    id: "13",
    question: "What is the meaning of the word 'ubiquitous'?",
    subject: "reading",
    difficulty: 1,
    tags: ["vocabulary"],
    optionType: "mcq-text",
    options: [
      { text: "Rare" },
      { text: "Common" },
      { text: "Obsolete" },
      { text: "Unique" },
    ],
    answers: [1],
  },
  {
    id: "14",
    question: "Which of the following is an acute angle?",
    subject: "math",
    difficulty: 0,
    tags: ["geometry"],
    optionType: "mcq-text",
    options: [
      { text: "90 degrees" },
      { text: "180 degrees" },
      { text: "45 degrees" },
      { text: "30 degrees" },
    ],
    answers: [3],
  },
  {
    id: "15",
    question: "What is the capital city of Brazil?",
    subject: "reading",
    difficulty: 2,
    tags: ["geography"],
    optionType: "mcq-text",
    options: [
      { text: "Buenos Aires" },
      { text: "Brasilia" },
      { text: "Rio de Janeiro" },
      { text: "Sao Paulo" },
    ],
    answers: [1],
  },
  {
    id: "16",
    question: "Choose the correct antonym for the word 'benevolent'.",
    subject: "reading",
    difficulty: 1,
    tags: ["vocabulary"],
    optionType: "mcq-text",
    options: [
      { text: "Malevolent" },
      { text: "Generous" },
      { text: "Kind" },
      { text: "Compassionate" },
    ],
    answers: [0],
  },
  {
    id: "17",
    question: "What is the value of π (pi) to two decimal places?",
    subject: "math",
    difficulty: 0,
    tags: ["geometry"],
    optionType: "grid-in",
    options: [{ text: "3.14" }],
    answers: [0],
  },
  {
    id: "18",
    question: "Which of the following is a renewable energy source?",
    subject: "reading",
    difficulty: 1,
    tags: ["environmental-science"],
    optionType: "mcq-text",
    options: [
      { text: "Coal" },
      { text: "Natural Gas" },
      { text: "Solar Power" },
      { text: "Nuclear Power" },
    ],
    answers: [2],
  },
  {
    id: "19",
    question: "In which Shakespearean play does the character Hamlet appear?",
    subject: "reading",
    difficulty: 0,
    tags: ["literature"],
    optionType: "mcq-text",
    options: [
      { text: "Macbeth" },
      { text: "Romeo and Juliet" },
      { text: "Hamlet" },
      { text: "Othello" },
    ],
    answers: [2],
  },
  {
    id: "20",
    question: "Which gas is essential for photosynthesis?",
    subject: "reading",
    difficulty: 2,
    tags: ["biology", "chemistry"],
    optionType: "mcq-text",
    options: [
      { text: "Oxygen (O2)" },
      { text: "Nitrogen (N2)" },
      { text: "Carbon dioxide (CO2)" },
      { text: "Hydrogen (H2)" },
    ],
    answers: [2],
  },
];
