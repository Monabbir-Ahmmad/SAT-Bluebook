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
    getList: "/admin/question-set",
    update: "/admin/question-set",
    delete: "/admin/question-set",
  },
  // Exam
  exam: {
    getExamSection: "/student/exam",
    getDynamicExamSection: "/student/exam/full-sat",
    verifySection: "/student/exam",
    submitExamResult: "/student/exam/result",
    getExamResult: "/student/exam/result",
    getExamResults: "/student/exam/result",
  },

  // User Management
  userManagement: {
    getList: "/admin/user-management",
    updateAdminRole: "/admin/user-management",
  },
};

export default apiUrl;
