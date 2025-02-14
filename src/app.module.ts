import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { FilmModule } from './film/film.module';
import { RentalModule } from './rental/rental.module';
import { ScheduledTaskModule } from './scheduled-task/scheduled-task.module';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'motdepasse', //to change later (bad practice to not use a .env)
      database: 'sakila',
      autoLoadEntities: true,
      synchronize: true, // to turn off in production
    }),
    CustomerModule,
    FilmModule,
    RentalModule,
    EmailModule,
    ScheduledTaskModule,
    ScheduleModule.forRoot(), // permet aux fonction cron de s'executer correctement
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
