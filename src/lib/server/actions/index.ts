import AuthAction from "./auth.action";
import QuestionAction from "./question.action";
import UserAction from "./user.action";
import connectDB from "../config/connect-db";

connectDB();

export const authAction = new AuthAction();
export const userAction = new UserAction();
export const questionAction = new QuestionAction();
