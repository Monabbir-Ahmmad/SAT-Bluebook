import { OAuthProviders } from "@/constants/enums";

export interface LoginReqDTO {
  email: string;
  password: string;
}

export interface LoginResDTO {
  token: string;
}

export interface RegisterReqDTO {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
}

export interface RegisterResDTO {
  token: string;
}

export interface OAuthLoginReqDTO {
  name: string;
  email: string;
  oauth: {
    oauthId: string;
    provider: OAuthProviders;
  };
}
