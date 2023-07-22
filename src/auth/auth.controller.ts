import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from './roles/role.decorator';
import { Role } from './roles/role.enum';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { RoleGuard } from './roles/role.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Res() res, @Body() authenticateDto: AuthenticateDto) {
    try {
      const response = await this.authService.login(authenticateDto);
      return res.status(HttpStatus.OK).json({ ...response });
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('info')
  async getProfileInfo(@Request() req) {
    return req.user;
  }
}
