import AuthAction from "./auth.action";
import ExamAction from "./exam.action";
import QuestionAction from "./question.action";
import QuestionSetAction from "./question-set.action";
import UserAction from "./user.action";
import connectDB from "../config/connect-db";

connectDB();

export const authAction = new AuthAction();
export const userAction = new UserAction();
export const questionAction = new QuestionAction();
export const questionSetAction = new QuestionSetAction();
export const examAction = new ExamAction();
