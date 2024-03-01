import { IUser } from './user';

export interface IStatusResponse {
  status: number;
  message: string;
}

export interface ILoginResponse extends IStatusResponse {
  user: null | IUser;
}
