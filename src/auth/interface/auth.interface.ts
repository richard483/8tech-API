import { IUser } from '../../users/interface/user.interface';

export interface IAuthenticate {
  user: IUser;
  token?: string;
}

export interface IGoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  _accessToken: string;
}
