import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Role } from '../auth/roles/role.enum';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: faker.datatype.uuid(),
      userName: 'John',
      password: 'changeme',
      role: Role.Admin,
    },
    {
      userId: faker.datatype.uuid(),
      userName: 'Maria',
      password: 'guess',
      role: Role.User,
    },
  ];

  // async findOne(userName: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.userName === userName);
  // }

  async findOne(user: any): Promise<User | undefined> {
    return this.users.find(
      (u) => u.userName === user.userName && u.password === user.password,
    );
  }
}
