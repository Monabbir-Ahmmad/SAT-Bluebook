import AuthService from "./auth.service";
import ExamService from "./exam.service";
import QuestionService from "./question.service";
import QuestionSetService from "./question-set.service";
import UserManagementService from "./user-management.service";

export const authService = new AuthService();
export const questionService = new QuestionService();
export const questionSetService = new QuestionSetService();
export const examService = new ExamService();
export const userManagementService = new UserManagementService();
