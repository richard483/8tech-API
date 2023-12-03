import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      if (info && info.name == 'TokenExpiredError') {
        throw new HttpException(
          { access: 'token expired' },
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw (
        err ||
        new HttpException(
          { access: 'UNKNOWN_EXCEPTION' },
          HttpStatus.UNAUTHORIZED,
        )
      );
    }

    return user;
  }
}
