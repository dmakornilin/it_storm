export interface UsrAuthType {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface LoginType {
  email: string;
  password: string;
  rememberMe: boolean | string;
}

export interface SignupType {
  name: string;
  email: string;
  password: string;
}

export interface UserInfoType {
  id: string;
  name: string;
  email: string;
}

