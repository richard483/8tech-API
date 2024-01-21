import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.USER, Role.RECRUITER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('uploadCompanyProfilePicture')
  async uploadCompanyProfilePicture(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('#uploadCompanyProfilePicture user', req.user);
    const response = await this.userService.uploadProfilePicture(
      file,
      req.user.companyId,
      true,
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

  @ApiBearerAuth()
  @ApiResponse({
    schema: {
      example: {
        status: true,
        statusCode: 200,
        data: {
          data: [
            {
              id: 'fc808550-b179-4657-a999-40795b0903d1',
              title: 'This is job1 title',
              description: 'This is job1 description',
              createdAt: '2024-01-03T14:56:04.019Z',
              updatedAt: '2024-01-03T14:56:04.019Z',
              companyId: '5fbe70c2-16be-49d1-a529-79ff3a5b443f',
            },
            {
              id: '9be63e1e-d57d-4491-bcc9-3eda8e5f2061',
              title: 'adsasdasd',
              description: 'asdasdasdasd',
              createdAt: '2024-01-15T18:30:12.441Z',
              updatedAt: '2024-01-15T18:30:12.441Z',
              companyId: 'a3329765-cd33-46e5-a929-43fdad43bd93',
            },
          ],
          hasPrevious: false,
          hasNext: false,
          totalPages: 1,
          isLast: true,
          isFirst: true,
        },
      },
    },
  })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBody({ type: Object })
  @Post('applied')
  async appliedJob(@Request() req, @Body() data: any) {
    const response = await this.userService.getAppliedJob(
      req.user.id,
      data?.page,
      data?.size,
    );
    return response;
  }

  @ApiBearerAuth()
  @ApiCookieAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('info/:id')
  async getUserById(@Request() req, @Param() params) {
    console.info('#UserGetProfileInfoById request incoming');
    return await this.userService.findOneById(params.id);
  }
}
