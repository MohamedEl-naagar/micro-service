import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsModule } from 'apps/payments/src/payments.module';

@Module({
  imports: [
    ClientsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/sleepr'),
    MongooseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: 'auth',
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: 'auth',
            port: 3002,
          },
        }),
      },
      {
        name: 'payments',
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: 'payments',
            port: 3003,
          },
        }),
      },
      PaymentsModule,
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
