import { IUser } from "@/lib/server/models/user.model";

export class UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt: Date;

  constructor(user: IUser) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.password = user.password;
    this.createdAt = user.createdAt;

    Object.defineProperty(this, "password", {
      enumerable: false,
    });
  }
}
