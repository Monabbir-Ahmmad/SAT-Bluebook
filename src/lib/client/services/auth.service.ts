import { LoginReqDto, RegisterReqDto } from "@/dtos/auth.dto";

import apiUrl from "@/constants/api-url";
import { httpClient } from "@/lib/client/http-client";

export default class AuthService {
  async login(data: LoginReqDto) {
    const res = await httpClient.post(apiUrl.auth.login, data);

    return res.data;
  }

  async register(data: RegisterReqDto) {
    const res = await httpClient.post(apiUrl.auth.register, data);

    return res.data;
  }
}
