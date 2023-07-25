import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  // create user, for dev only

  // @Post('create')
  // async create(@Res() res, @Body() user: UserCreateDto) {
  //   try {
  //     const response = await this.userService.create(user);
  //     return res.status(HttpStatus.OK).json({ response });
  //   } catch (error) {
  //     return res.status(error.status).json({ error: error.message });
  //   }
  // }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  async createAdmin(@Res() res, @Body() user: UserCreateDto) {
    try {
      const response = await this.userService.create(user);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }
}
