import { Role } from '../../auth/roles/role.enum';

export interface IUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  roles: string[] | Role[];
  description: string;
  previousWorkplace?: any;
  ratings?: any;
  companyId?: string;
  hasGoogleAccount: boolean;
}
