import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateFilmDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  rentalDuration: number; // in days
}
