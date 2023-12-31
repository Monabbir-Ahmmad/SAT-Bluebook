import { LoginReqDto, OAuthLoginReqDto, RegisterReqDto } from "@/dtos/auth.dto";
import { hashPassword, varifyPassword } from "../utils/password.util";

import { HttpError } from "../utils/httpError";
import { StatusCode } from "@/constants/status-code";
import { User } from "../models";
import { UserDto } from "@/dtos/user.dto";
import { userAction } from "./";

export default class AuthAction {
  async register(data: RegisterReqDto) {
    if (await userAction.findByEmail(data.email))
      throw new HttpError(StatusCode.CONFLICT, "Email already exists.");

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: await hashPassword(data.password),
    });

    return new UserDto(user);
  }

  async login(data: LoginReqDto) {
    const user = await userAction.findByEmail(data.email);

    if (!user) throw new HttpError(StatusCode.NOT_FOUND, "Invalid email.");

    const isPasswordValid = await varifyPassword(data.password, user.password);

    if (!isPasswordValid)
      throw new HttpError(StatusCode.UNAUTHORIZED, "Invalid password.");

    return user;
  }

  async OAuthLogin(data: OAuthLoginReqDto) {
    let user = await User.findOne({
      "oauth.oauthId": data.oauth.oauthId,
      "oauth.provider": data.oauth.provider,
    });

    if (!user)
      user = await User.create({
        name: data.name,
        email: data.email,
        oauth: {
          oauthId: data.oauth.oauthId,
          provider: data.oauth.provider,
        },
      });

    if (!user)
      throw new HttpError(StatusCode.UNAUTHORIZED, "Invalid credentials.");

    return new UserDto(user);
  }
}
