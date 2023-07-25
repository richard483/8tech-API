import { Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class AppService {
  getHello(): string {
    return String.prototype.concat(
      '8T-Auth v.',
      process.env.npm_package_version.toString(),
    );
  }
}
