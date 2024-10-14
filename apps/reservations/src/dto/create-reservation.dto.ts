import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;
  @IsString()
  @IsNotEmpty()
  placeId: string;
  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
