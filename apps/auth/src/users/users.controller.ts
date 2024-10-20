import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CurrentUser } from '../current-user.decorators';
import { UserDocument } from './models/reservation.schema';
import { AuthGuard } from '@nestjs/passport';
import { JWTAuthGuard } from '../guards/jwt-auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JWTAuthGuard)
  @Get()
  async GetUsers(
    @CurrentUser()
    user: UserDocument,
  ) {
    return user;
  }

  @Post()
  async createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.Create(CreateUserDto);
  }
}
