import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    let exceptionMessage = 'UNKNOWN_EXCEPTION';
    if (err || !user) {
      if (info && info.name == 'TokenExpiredError') {
        exceptionMessage = 'token expired';
      } else if (info == 'Error: No auth token') {
        exceptionMessage = 'UNAUTHORIZED';
      }
      throw (
        err ||
        new HttpException(
          {
            status: true,
            statusCode: HttpStatus.UNAUTHORIZED,
            data: {
              access: exceptionMessage,
            },
          },
          HttpStatus.UNAUTHORIZED,
        )
      );
    }

    return user;
  }
}
