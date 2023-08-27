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
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from './roles/role.decorator';
import { Role } from './roles/role.enum';
import { AuthenticateRequest } from './requests/authenticate.request';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { RoleGuard } from './roles/role.guard';
import { GoogleGuard } from './google/google.guard';
import { RegisterRequest } from './requests/register.request';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Res() res, @Body() authenticateDto: AuthenticateRequest) {
    console.info('#AuthLogin request incoming with: ', authenticateDto);
    try {
      const response = await this.authService.login(authenticateDto, res);
      return res.status(HttpStatus.OK).json({ ...response });
    } catch (error) {
      console.error('#AuthLogin error caused by: ', error);
      return res.status(error.status).json({ error: error.message });
    }
  }

  @Post('register')
  async signUp(@Res() res, @Body() request: RegisterRequest) {
    console.info('#AuthRegister request incoming with: ', request);
    try {
      const response = await this.authService.register(request);
      return res.status(HttpStatus.OK).json({ ...response });
    } catch (error) {
      console.error('#AuthRegister error caused by: ', error);
      return res.status(error.status).json({ error: error.message });
    }
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  // this end point is needed for google authentication
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Request() req, @Res() res) {
    console.info('#AuthGoogleAuthRedirect google auth request incoming');
    try {
      const response = await this.authService.googleLogin(req, res);
      // TODO : redirect to frontend
      return res.status(HttpStatus.OK).json({ ...response });
    } catch (error) {
      console.error('#AutGoogleAuthRedirect error caused by: ', error);
      return res.status(error.status).json({ error: error.message });
    }
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('info')
  async getProfileInfo(@Request() req, @Res() res) {
    return res.status(HttpStatus.OK).json({ ...req.user });
  }
}
