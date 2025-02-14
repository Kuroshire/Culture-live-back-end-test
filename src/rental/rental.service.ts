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

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    private readonly filmService: FilmService,
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
    console.log(
      'Task planned for J-5: ',
      GetDateMinusDays(GetDayAtMidDay(returnDate), 5),
    );
    console.log(
      'Task planned for J-3: ',
      GetDateMinusDays(GetDayAtMidDay(returnDate), 3),
    );
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
