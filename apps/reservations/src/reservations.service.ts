import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Types } from 'mongoose';
// import { UpdateReservationDto } from './reservations/dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationsRepository) {}
  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123',
    });
  }

  findAll() {
    return this.reservationRepository.find({});
  }

  findOne(_id: any) {
    return this.reservationRepository.findOne({ _id: new Types.ObjectId(_id) });
  }

  update(_id: string, updateReservationDto: any) {
    return this.reservationRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      { $set: updateReservationDto },
    );
  }

  remove(_id: string) {
    console.log('from Dele', _id);

    return this.reservationRepository.findOneAndDelete({
      _id: new Types.ObjectId(_id),
    });
  }
}
