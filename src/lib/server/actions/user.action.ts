import { User } from "../models";
import { UserDto } from "@/dtos/user.dto";

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
}
