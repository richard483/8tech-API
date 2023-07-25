import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return String.prototype.concat('8T-Auth');
  }
}
