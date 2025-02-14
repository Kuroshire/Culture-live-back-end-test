import { Injectable } from '@nestjs/common';
import {
  IsDateString,
  MinDate,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Customer } from 'src/customer/entities/customer.entity';
import { Film } from 'src/film/entities/film.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCustomerExistsConstraint
  implements ValidatorConstraintInterface
{
  constructor(private customerRepository: Repository<Customer>) {}

  async validate(id: number) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    return !!customer;
  }

  defaultMessage(args: ValidationArguments) {
    return `Customer with ID ${args.value} doesn't exist`;
  }
}

@ValidatorConstraint({ async: true })
@Injectable()
export class IsFilmExistsConstraint implements ValidatorConstraintInterface {
  constructor(private filmRepository: Repository<Film>) {}

  async validate(id: number) {
    const film = await this.filmRepository.findOne({ where: { id } });
    return !!film;
  }

  defaultMessage(args: ValidationArguments) {
    return `Film with ID ${args.value} doesn't exist`;
  }
}

export class CreateRentalDto {
  @IsDateString() // check format: YYYY-MM-DDThh:mm:ss.sssZ
  @MinDate(new Date(), { message: 'Rental date cannot be in the past' })
  rentalDate: string;

  @IsDateString()
  @MinDate(new Date(), { message: 'Return date cannot be in the past' })
  returnDate: Date;

  @Validate(IsCustomerExistsConstraint)
  customerId: number;

  @Validate(IsFilmExistsConstraint)
  filmId: number;
}
