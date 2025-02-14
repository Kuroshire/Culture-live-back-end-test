import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  create(createFilmDto: CreateFilmDto): Promise<Film> {
    const film = this.filmRepository.create(createFilmDto);
    return this.filmRepository.save(film);
  }

  findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  findOne(id: number): Promise<Film> {
    return this.filmRepository.findOne({ where: { id } });
  }

  update(id: number, updateFilmDto: UpdateFilmDto): Promise<UpdateResult> {
    return this.filmRepository.update(id, updateFilmDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.filmRepository.delete(id);
  }
}
