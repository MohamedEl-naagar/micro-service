import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async GetUsers() {
    return this.userRepository.find({});
  }

  async Create(document) {
    let data = await this.userRepository.create({
      ...document,
      password: await bcrypt.hash(document.password, 10),
    });
    return data;
  }

  async validate(email, password) {
    let user = await this.userRepository.findOne({
      email,
    });

    const passIsValid = await bcrypt.compare(password, user.password);

    if (!passIsValid) {
      throw new UnauthorizedException('not valid login');
    }
    return user;
  }
}
