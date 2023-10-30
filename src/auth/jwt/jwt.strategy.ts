import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJwtFromCookie(req) {
    let token = null;
    // TODO: need fix here to return unauthorized if no cookie or token
    // the bug can be reproduced by sending request without login first (tried on createjob)
    req.headers.cookie.split(';').forEach((element) => {
      element = element.split('=');
      element[0].trim() === 'EToken' ? (token = element[1].trim()) : null;
    });
    return token;
  }

  validate(payload: any) {
    return {
      id: payload.user.id,
      userName: payload.user.userName,
      roles: payload.user.roles,
    };
  }
}
