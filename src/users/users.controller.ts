import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { chatDto } from './interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('chat')
  async usersChat(@Body() body: chatDto) {
    return this.usersService.getOpenAiData(body);
  }
}
