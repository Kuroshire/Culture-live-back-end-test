import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { FilmModule } from './film/film.module';
import { RentalModule } from './rental/rental.module';

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
      synchronize: true, // À désactiver en production
    }),
    CustomerModule,
    FilmModule,
    RentalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
