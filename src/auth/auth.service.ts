import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate } from './interface/user.interface';

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

    const { password, ...result } = user;
    return result;
  }

  async login(authenitcateDto: AuthenticateDto) {
    const user: IAuthenticate = await this.validateUser(authenitcateDto);
    user.token = this.jwtService.sign(user);
    return {
      // access_token: this.jwtService.sign(user),
      user,
    };
  }
}
