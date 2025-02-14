import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  rentalDuration: number;

  @UpdateDateColumn({ type: 'timestamp' })
  lastUpdate: Date;
}
