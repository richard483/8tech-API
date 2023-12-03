import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthenticateRequest } from './requests/authenticate.request';
import { IAuthenticate, IGoogleUser } from './interface/auth.interface';
import { IUser } from '../users/interface/user.interface';
import { Role } from './roles/role.enum';
import { compare, genSaltSync, hashSync } from 'bcrypt';
import { RegisterRequest } from './requests/register.request';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    authenticateRequest: AuthenticateRequest,
  ): Promise<IAuthenticate> {
    const user = await this.usersService.findOne(authenticateRequest.email);
    if (!user) {
      throw new HttpException({ user: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);
    }

    const isPasswordMatch = await compare(
      authenticateRequest.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException(
        { password: 'NOT_MATCH' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // remove password from user object
    const { password, ...userData } = user;
    const data = { user: userData };
    return data;
  }

  async login(
    authenticateRequest: AuthenticateRequest,
    res,
  ): Promise<IAuthenticate> {
    const user = await this.validateUser(authenticateRequest);
    user.token = this.jwtService.sign(user);
    res.cookie('EToken', user.token);
    return user;
  }

  async register(userCreate: RegisterRequest): Promise<IUser> {
    if (!this.passwordValidation(userCreate.password)) {
      throw new HttpException(
        { password: 'INVALID_PASSWORD' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.create({
      ...userCreate,
      password: this.hashPassword(userCreate.password),
    });
    return user;
  }

  async googleLogin(req, res): Promise<IAuthenticate> {
    const user: IGoogleUser = req.user;

    if (!user) {
      throw new HttpException(
        { google: 'INVALID_CREDENTIALS' },
        HttpStatus.BAD_REQUEST,
      );
    }

    let userDb: IUser = await this.usersService.findOneByEmail(user.email);

    if (!userDb) {
      await this.usersService.create({
        email: user.email,
        username: user.firstName + ' ' + user.lastName,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: [Role.USER],
        hasGoogleAccount: true,
      });
      userDb = await this.usersService.findOneByEmail(user.email);
    } else if (!userDb.hasGoogleAccount) {
      await this.usersService.updateGoogleStatus(user.email, true);
    }
    const userData: IAuthenticate = { user: userDb };
    userData.token = this.jwtService.sign(userData);

    res.cookie('EToken', userData.token);

    return userData;
  }

  private hashPassword(password: string): string {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  }

  private passwordValidation(password: string): boolean {
    const passwordWithNumberAndAlphabetRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordWithNumberAndAlphabetRegex.test(password);
  }
}
