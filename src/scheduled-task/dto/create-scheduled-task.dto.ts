import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduledTaskDto {
  @IsString()
  @IsNotEmpty()
  taskName: string;

  @IsEmail()
  @IsNotEmpty()
  emailToNotify: string;

  @IsDateString()
  dateToComplete: Date;
}
