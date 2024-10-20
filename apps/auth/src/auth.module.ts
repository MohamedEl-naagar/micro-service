import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule, LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LocalStategy } from './strategies/local.strategies';
import { JwtStrategy } from './strategies/jwt-strategies';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    LoggerModule,
    // JwtModule.registerAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: `${configService.get('JWT_EXPIRATION')}s` },
    //   }),
    //   inject: [ConfigService],
    // }),
    JwtModule.register({ secret: 'ay 7aga', signOptions: { expiresIn: 3600 } }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStategy, JwtStrategy],
})
export class AuthModule {}
