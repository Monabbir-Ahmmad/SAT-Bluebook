import { HttpError } from "../utils/httpError";
import { StatusCode } from "@/constants/status-code";
import { User } from "../models";
import { UserDto } from "@/dtos/user.dto";
import { UserRoles } from "@/constants/enums";

export default class UserAction {
  async findById(id: string) {
    const user = await User.findById(id);

    return user ? new UserDto(user) : null;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email });

    return user ? new UserDto(user) : null;
  }

  async findAll() {
    const users = await User.find();

    return users.map((user) => new UserDto(user));
  }

  async updateAdminRole(id: string) {
    const user = await User.findById(id);

    if (!user) throw new HttpError(StatusCode.NOT_FOUND, "User not found");

    if (user.role === UserRoles.ADMIN) user.role = UserRoles.USER;
    else user.role = UserRoles.ADMIN;

    await user.save();

    return new UserDto(user);
  }
}
