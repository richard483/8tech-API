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
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';
import { UserCreateRequest } from './requests/user-create.request';
import { UserFilterRequest } from './requests/user-filter.request';
import { UserUpdateRequest } from './requests/user-update.request';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  // TODO: add log for each controller

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
  async createAdmin(@Res() res, @Body() user: UserCreateRequest) {
    try {
      const response = await this.userService.create(user);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update')
  async update(@Res() res, @Body() data: UserUpdateRequest) {
    try {
      const response = await this.userService.update(data);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('filter')
  async filterUser(@Res() res, @Body() body: UserFilterRequest) {
    try {
      const response = await this.userService.findManyByList(body);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }
}
