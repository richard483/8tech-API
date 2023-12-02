import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUser } from './interface/user.interface';
import { UserFilterRequest } from './requests/user-filter.request';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findOne(email: any): Promise<any | null> {
    return this.userRepository.findOnebyEmail(email);
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.findOnebyEmail(email);
  }

  async create(user: any): Promise<IUser> {
    const existingUser = await this.userRepository.findOnebyEmail(user.email);
    if (existingUser !== null) {
      throw new HttpException('EMAIL_ALREADY_USED', HttpStatus.BAD_REQUEST);
    }
    return this.userRepository.create(user);
  }

  async update(userData: any): Promise<IUser | null> {
    const { id, ...data } = userData;
    return this.userRepository.update(id, data);
  }

  async findManyByList(data: UserFilterRequest): Promise<IUser[] | null> {
    return this.userRepository.findManyByFieldAndSortBy(data);
  }

  async updateGoogleStatus(
    email: string,
    value: boolean,
  ): Promise<IUser | null> {
    return this.userRepository.updateUserGoogleStatus(email, value);
  }
}
