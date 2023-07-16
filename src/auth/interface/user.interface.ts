import { Role } from '../roles/role.enum';

export interface IUser {
  id: string;
  userName: string;
  email: string;
  roles: Role[];
}

export interface IAuthenticate {
  user: IUser;
  token: string;
}
