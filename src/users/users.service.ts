import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserFilterRequestDto } from './dto/user-filter.dto';
import { UserHelper } from './user.helper';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private userHelper: UserHelper,
  ) {}

  async findOne(email: any): Promise<any | null> {
    return this.userRepository.findOnebyEmail(email);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOnebyEmail(email);
  }

  async create(user: any): Promise<User> {
    const existingUser = await this.userRepository.findOnebyEmail(user.email);
    if (existingUser !== null) {
      throw new HttpException('EMAIL_ALREADY_USED', HttpStatus.BAD_REQUEST);
    }
    const existingUsername = await this.userRepository.findOnebyUsername(
      user.username,
    );
    if (existingUsername !== null) {
      throw new HttpException(
        {
          username: 'USERNAME_ALREADY_USED',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userRepository.create(user);
  }

  async update(userData: any): Promise<any | null> {
    const { id, ...data } = userData;
    if (data.username) {
      const existingUser = await this.userRepository.findOnebyUsername(
        data.username,
      );
      if (existingUser !== null && existingUser.id !== id) {
        throw new HttpException(
          {
            username: 'ALREADY_USED',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const { password, ...user } = await this.userRepository.update(id, data);
    return user;
  }

  async findManyByList(data: UserFilterRequestDto): Promise<any | null> {
    return this.userRepository.findManyByFieldAndSortBy(data);
  }

  async findOneById(id: string): Promise<any | null> {
    const { password, ...user } = await this.userRepository.findOnebyId(id);
    return user;
  }

  async updateGoogleStatus(
    email: string,
    value: boolean,
  ): Promise<User | null> {
    return this.userRepository.updateUserGoogleStatus(email, value);
  }

  async uploadProfilePicture(
    image: Express.Multer.File,
    userId: string,
  ): Promise<any | null> {
    try {
      const imageData = await this.userHelper.uploadImageToStorage(
        image.buffer,
        userId
          ? userId + `.${image.originalname.split('.').pop()}`
          : image.originalname,
      );
      const { password, ...user } = await this.userRepository.update(userId, {
        profilePicture: imageData.url,
      });
      return user;
    } catch (error) {
      console.log('#uploadProfilePicture error', error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAppliedJob(
    userId: string,
    page: number,
    size: number,
  ): Promise<any | null> {
    return this.userRepository.getAppliedJob(userId, page, size);
  }
}
