import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScheduledTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column()
  emailToNotify: string;

  @Column({ type: 'date' })
  dateToComplete: Date;

  @Column({ default: 'pending' }) // pending, completed, failed
  status: string;
}
