import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Rental } from './entities/rental.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DaysBetweenDates,
  GetDateMinusDays,
  GetDayAtMidDay,
} from 'src/utils/date.utils';
import { FilmService } from 'src/film/film.service';
import { ScheduledTaskService } from 'src/scheduled-task/scheduled-task.service';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    private readonly customerService: CustomerService,
    private readonly filmService: FilmService,
    private readonly scheduledTaskService: ScheduledTaskService,
  ) {}

  async create(createRentalDto: CreateRentalDto): Promise<Rental> {
    console.log(createRentalDto);
    const rentalDate: Date = new Date(createRentalDto.rentalDate);
    const returnDate: Date = new Date(createRentalDto.returnDate);
    if (rentalDate >= returnDate) {
      throw new Error('Return date must be after rental date');
    }
    //NOTE: we need to check if the film is available for the rental period

    //Check if the rental duration is long enough for the film requirements.
    const lengthOfRental = DaysBetweenDates(rentalDate, returnDate);
    const film = await this.filmService.findOne(createRentalDto.filmId);
    if (lengthOfRental < film.rentalDuration) {
      throw new Error('Rental duration is too short');
    }

    //create the rental object
    const rental = this.rentalRepository.create(createRentalDto);

    //add planified tasks for J-5 & J-3
    const customer = await this.customerService.findOne(
      createRentalDto.customerId,
    );
    const returnJMinus5 = GetDateMinusDays(returnDate, 5);
    const returnJMinus3 = GetDateMinusDays(returnDate, 3);

    //on ne veut pas faire de cron si le J-5 se trouve avant la date de début d'emprunt
    if (rentalDate < returnJMinus5) {
      await this.scheduledTaskService.create({
        taskName: 'SendReminderJMinus5',
        emailToNotify: customer.email,
        dateToComplete: GetDayAtMidDay(returnJMinus5),
      });
    }

    //idem, on ne veut pas faire de cron si le J-3 se trouve avant la date de début d'emprunt
    if (rentalDate < returnJMinus3) {
      await this.scheduledTaskService.create({
        taskName: 'SendReminderJMinus3',
        emailToNotify: customer.email,
        dateToComplete: GetDayAtMidDay(returnJMinus3),
      });
    }

    return this.rentalRepository.save(rental);
  }

  findAll(): Promise<Rental[]> {
    return this.rentalRepository.find();
  }

  findAllByCustomerId(customerId: number): Promise<Rental[]> {
    return this.rentalRepository.find({ where: { customerId } });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.rentalRepository.delete(id);
  }

  removeAll(): Promise<DeleteResult> {
    return this.rentalRepository.delete({});
  }
}
