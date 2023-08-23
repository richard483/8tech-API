import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUser } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findOne(email: any): Promise<any | null> {
    return this.userRepository.findOneByEmail(email);
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findOneByEmail(email);
  }

  async create(user: any): Promise<IUser> {
    const existingUser = await this.userRepository.findOneByEmail(user.email);
    if (existingUser !== null) {
      throw new HttpException('EMAIL_ALREADY_USED', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.create(user);
  }
}
