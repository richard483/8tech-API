import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post('create')
  async create(@Res() res, @Body() user: any) {
    try {
      const response = await this.userService.create(user);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }
}
