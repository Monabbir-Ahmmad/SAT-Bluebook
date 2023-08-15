import connectDB from "../config/connect-db";
import AuthAction from "./auth.action";
import UserAction from "./user.action";

connectDB();

export const authAction = new AuthAction();
export const userAction = new UserAction();
