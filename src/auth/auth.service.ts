import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    const isPasswordMatch = await compare(
      authenticateRequest.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
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

  async register(registerRequest: RegisterRequest): Promise<IUser> {
    const { repeatPassword, ...userCreate } = registerRequest;

    if (userCreate.password !== repeatPassword) {
      throw new BadRequestException('PASSWORD_NOT_MATCH');
    }

    userCreate.password = this.hashPassword(userCreate.password);
    const user = await this.usersService.create({
      ...userCreate,
    });
    return user;
  }

  async googleLogin(req, res): Promise<IAuthenticate> {
    const user: IGoogleUser = req.user;

    if (!user) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    let userDb: IUser = await this.usersService.findOneByEmail(user.email);

    if (!userDb) {
      await this.usersService.create({
        email: user.email,
        userName: user.firstName + ' ' + user.lastName,
        roles: [Role.USER],
        hasGoogleAccount: true,
      });
      userDb = await this.usersService.findOneByEmail(user.email);
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
}
