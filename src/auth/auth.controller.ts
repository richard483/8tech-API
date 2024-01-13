import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from './roles/role.decorator';
import { Role } from './roles/role.enum';
import { AuthenticateRequestDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { RoleGuard } from './roles/role.guard';
import { GoogleGuard } from './google/google.guard';
import { RegisterRequestDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Res() res, @Body() authenticateDto: AuthenticateRequestDto) {
    console.info('#AuthLogin request incoming with: ', authenticateDto);
    const response = await this.authService.login(authenticateDto, res);
    return response;
  }

  @Post('register')
  async signUp(@Res() res, @Body() request: RegisterRequestDto) {
    console.info('#AuthRegister request incoming with: ', request);
    const response = await this.authService.register(request);
    return response;
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
    const response = await this.authService.googleLogin(req, res);
    // TODO : redirect to frontend
    return response;
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('info')
  async getProfileInfo(@Request() req, @Res() res) {
    console.info('#AuthGetProfileInfo request incoming');
    return req.user;
  }
}
