import { Module } from '@nestjs/common';
import { LoggerModule as pino } from 'nestjs-pino';

@Module({
  imports: [
    pino.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
