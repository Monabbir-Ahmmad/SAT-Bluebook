import { User } from "../models";

export default class UserAction {
  async findById(id: string) {
    return await User.findById(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({ email });
  }
}
