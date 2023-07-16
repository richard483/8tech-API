import { IUser } from '../../users/interface/user.interface';

export interface IAuthenticate {
  user: IUser;
  token?: string;
}
