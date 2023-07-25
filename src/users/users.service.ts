import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUser } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findOne(user: any): Promise<any | null> {
    return this.userRepository.findOnebyEmailPassword(
      user.email,
      user.password,
    );
  }

  async create(user: any): Promise<IUser> {
    const existingUser = await this.userRepository.findOneByEmail(user.email);
    if (existingUser !== null) {
      throw new HttpException('EMAIL_ALREADY_USED', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.create(user);
  }
}
