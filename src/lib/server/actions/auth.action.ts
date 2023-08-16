import { hashPassword, varifyPassword } from "../utils/password.util";

import { HttpError } from "../utils/httpError";
import { StatusCode } from "@/constants/status-code";
import { User } from "../models";
import { userAction } from "./";

export default class AuthAction {
  async register(data: RegisterReqDTO) {
    if (await userAction.findByEmail(data.email))
      throw new HttpError(StatusCode.CONFLICT, "Email already exists.");

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: await hashPassword(data.password),
    });

    return user;
  }

  async login(data: LoginReqDTO) {
    const user = await userAction.findByEmail(data.email);

    if (!user) throw new HttpError(StatusCode.NOT_FOUND, "Invalid email.");

    const isPasswordValid = await varifyPassword(data.password, user.password);

    if (!isPasswordValid)
      throw new HttpError(StatusCode.UNAUTHORIZED, "Invalid password.");

    return user;
  }

  async OAuthLogin(data: OAuthLoginReqDTO) {
    let user = await userAction.findByEmail(data.email);

    if (!user)
      user = await User.create({
        name: data.name,
        email: data.email,
      });

    if (!user)
      throw new HttpError(StatusCode.UNAUTHORIZED, "Invalid credentials.");

    return user;
  }
}
