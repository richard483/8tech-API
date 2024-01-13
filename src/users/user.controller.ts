import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';
import { UserCreateRequestDto } from './dto/user-create.dto';
import { UserFilterRequestDto } from './dto/user-filter.dto';
import {
  UserUpdateRequestDto,
  UserUpdateRequestMeDto,
} from './dto/user-update.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

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
  async createAdmin(@Res() res, @Body() user: UserCreateRequestDto) {
    const response = await this.userService.create(user);
    return response;
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update')
  async update(@Res() res, @Body() data: UserUpdateRequestDto) {
    const response = await this.userService.update(data);
    return response;
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update/me')
  async updateMe(@Request() req, @Body() data: UserUpdateRequestMeDto) {
    const response = await this.userService.update({
      ...data,
      id: req.user.id,
    });
    return response;
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('filter')
  async filterUser(@Res() res, @Body() body: UserFilterRequestDto) {
    const response = await this.userService.findManyByList(body);
    return response;
  }

  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('uploadProfilePicture')
  async uploadProfilePicture(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('#uploadProfilePicture user', req.user);
    const response = await this.userService.uploadProfilePicture(
      file,
      req.user.id,
    );
    return response;
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('info')
  async getProfileInfo(@Request() req, @Res() res) {
    console.info('#UserGetProfileInfo request incoming');
    return await this.userService.findOneById(req.user.id);
  }
}
