import { Role } from '../../auth/roles/role.enum';

export interface IUser {
  id: string;
  email: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
  roles: string[] | Role[];
}
