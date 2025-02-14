import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { FilmModule } from 'src/film/film.module';
import { CustomerModule } from 'src/customer/customer.module';
import { ScheduledTaskModule } from 'src/scheduled-task/scheduled-task.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental]),
    FilmModule,
    CustomerModule,
    ScheduledTaskModule,
  ],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService],
})
export class RentalModule {}
