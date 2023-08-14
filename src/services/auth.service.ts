import apiUrl from "@/constants/api-url";
import { httpClient } from "@/lib/http-client";

export default class AuthService {
  async login(loginDTO: LoginReqDTO) {
    const res = await httpClient.post<LoginResDTO>(apiUrl.auth.login, loginDTO);

    return res.data;
  }

  async register(registerDTO: RegisterReqDTO) {
    const res = await httpClient.post<RegisterResDTO>(
      apiUrl.auth.register,
      registerDTO
    );

    return res.data;
  }
}