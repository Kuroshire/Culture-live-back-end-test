import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Film } from 'src/film/entities/film.entity';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rentalDate: Date;

  @Column()
  returnDate: Date;

  @ManyToOne(() => Customer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  customerId: number;

  @ManyToOne(() => Film, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  filmId: number;
}
