interface LoginReqDTO {
  email: string;
  password: string;
}

interface LoginResDTO {
  token: string;
}

interface RegisterReqDTO {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
}

interface RegisterResDTO {
  token: string;
}

interface OAuthLoginReqDTO {
  name: string;
  email: string;
}
