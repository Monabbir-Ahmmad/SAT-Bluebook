import { Document, Model, Schema, model, models } from "mongoose";
import { OAuthProviders, UserRoles } from "@/constants/enums";

export interface IOAuth extends Document {
  oauthId: string;
  provider: OAuthProviders;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  oauth: IOAuth;
}

const OAuthSchema = new Schema<IOAuth>(
  {
    oauthId: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
    _id: false,
  }
);

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: UserRoles.USER,
    },
    oauth: {
      type: OAuthSchema,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default UserModel;
