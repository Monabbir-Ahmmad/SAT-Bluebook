import { StatusCode } from "@/constants/status-code";
import { User } from "../models";
import { HttpError } from "../utils/httpError";
import { hashPassword } from "../utils/password.util";
import { userAction } from "./";

export default class AuthAction {
  async register(data: RegisterReqDTO) {
    if (await userAction.findByEmail(data.email))
      throw new HttpError(StatusCode.CONFLICT, "Email already exists");

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: await hashPassword(data.password),
      role: "user",
    });

    return user;
  }
}
