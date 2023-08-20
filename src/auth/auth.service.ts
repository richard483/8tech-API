import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate, IGoogleUser } from './interface/authenticate.interface';
import { IUser } from '../users/interface/user.interface';
import { Role } from './roles/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authenticateDto: AuthenticateDto): Promise<IAuthenticate> {
    const user = await this.usersService.findOne(authenticateDto);
    if (!user) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    // remove password from user object
    const { password, ...userData } = user;
    const data = { user: userData };
    return data;
  }

  async login(authenitcateDto: AuthenticateDto, res): Promise<IAuthenticate> {
    const user = await this.validateUser(authenitcateDto);
    user.token = this.jwtService.sign(user);
    res.cookie('EToken', user.token);
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
}
