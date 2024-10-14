import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async GetUsers() {
    return this.usersService.GetUsers();
  }

  @Post()
  async createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.Create(CreateUserDto);
  }
}
