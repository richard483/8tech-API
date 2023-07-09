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

  // async signIn(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }

  //   const payload = { sub: user.userId, username: user.username };

  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   throw new UnauthorizedException();
  // }

  async validateUser(authenticateDto: AuthenticateDto): Promise<IAuthenticate> {
    const user = await this.usersService.findOne(authenticateDto);
    if (!user) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    const { password, ...result } = user;
    return result;
  }

  async login(authenitcateDto: AuthenticateDto) {
    const user = await this.validateUser(authenitcateDto);
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
