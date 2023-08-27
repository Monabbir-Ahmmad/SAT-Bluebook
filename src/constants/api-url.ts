const apiUrl = {
  // Auth
  auth: {
    login: "/auth/signin",
    register: "/auth/signup",
  },
  // User
  user: {
    get: "/user",
    update: "/user",
  },
  // Question
  question: {
    create: "/admin/question",
    get: "/admin/question",
    update: "/admin/question",
    delete: "/admin/question",
  },
  // Question Set
  questionSet: {
    create: "/admin/question-set",
    get: "/admin/question-set",
    update: "/admin/question-set",
    delete: "/admin/question-set",
  },
  // Exam
  exam: {
    get: "/student/exam",
  },

  // User Management
  userManagement: {
    getList: "/admin/user-management",
  },
};

export default apiUrl;
