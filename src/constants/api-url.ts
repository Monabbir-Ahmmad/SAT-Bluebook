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
    create: "/question",
    get: "/question",
    update: "/question",
    delete: "/question",
  },
};

export default apiUrl;
