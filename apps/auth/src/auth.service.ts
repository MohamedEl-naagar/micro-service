import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/reservation.schema';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: UserDocument, response: Response) {
    const tokenPayload = {
      userId: user._id.toHexString(),
    };
    
    const token = this.jwtService.sign(tokenPayload);
    
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); 

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: expires,
    });
    
    return response.send({ message: 'Login successful' });
  }
}
