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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from './roles/role.decorator';
import { Role } from './roles/role.enum';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { RoleGuard } from './roles/role.guard';
import { GoogleGuard } from './google/google.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Res() res, @Body() authenticateDto: AuthenticateDto) {
    try {
      const response = await this.authService.login(authenticateDto, res);
      return res.status(HttpStatus.OK).json({ ...response });
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Request() req, @Res() res) {
    try {
      const response = await this.authService.googleLogin(req, res);
      return res.status(HttpStatus.OK).json({ ...response });
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('info')
  async getProfileInfo(@Request() req) {
    return req.user;
  }
}
