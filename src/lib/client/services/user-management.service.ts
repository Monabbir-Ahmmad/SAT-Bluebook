import { UserDto } from "@/dtos/user.dto";
import { httpClient } from "../http-client";
import apiUrl from "@/constants/api-url";

export default class UserManagementService {
  async getUsers() {
    const res = await httpClient.get<UserDto[]>(apiUrl.userManagement.getList);
    return res.data;
  }
}
