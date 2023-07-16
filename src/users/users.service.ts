import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findOne(user: any): Promise<User | null> {
    return this.userRepository.findOneWithEmailPassword(user);
  }

  async create(user: any): Promise<User> {
    return this.userRepository.create(user);
  }
}
