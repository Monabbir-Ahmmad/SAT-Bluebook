import { UserDto } from "@/dtos/user.dto";
import apiUrl from "@/constants/api-url";
import { httpClient } from "../http-client";

export default class UserManagementService {
  async getUsers() {
    const res = await httpClient.get<UserDto[]>(apiUrl.userManagement.getList);
    return res.data;
  }

  async updateAdminRole(userId: string) {
    const res = await httpClient.patch<UserDto>(
      apiUrl.userManagement.updateAdminRole + "/" + userId
    );
    return res.data;
  }
}
