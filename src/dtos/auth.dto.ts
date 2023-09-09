import { OAuthProviders } from "@/constants/enums";

export interface LoginReqDto {
  email: string;
  password: string;
}

export interface RegisterReqDto {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
}

export interface OAuthLoginReqDto {
  name: string;
  email: string;
  oauth: {
    oauthId: string;
    provider: OAuthProviders;
  };
}
