export interface ILoginResult {
  token: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  id: number;
  username?: string;
  email: string;
  password: string;
  token: string;
}
