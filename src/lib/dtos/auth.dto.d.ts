interface LoginReqDTO {
  email: string;
  password: string;
}

interface LoginResDTO {
  token: string;
}

interface RegisterReqDTO {
  email: string;
  password: string;
  name: string;
}

interface RegisterResDTO {
  token: string;
}
