import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      if (info && info.name == 'TokenExpiredError') {
        throw new UnauthorizedException('token expired');
      }
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
