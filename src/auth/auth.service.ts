import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate } from './interface/authenticate.interface';

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
    const { password, ...result } = user;
    const res = { user: result };
    return res;
  }

  async login(authenitcateDto: AuthenticateDto): Promise<IAuthenticate> {
    const user = await this.validateUser(authenitcateDto);
    user.token = this.jwtService.sign(user);
    return user;
  }
}
