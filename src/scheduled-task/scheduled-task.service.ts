import { Injectable } from '@nestjs/common';
import { CreateScheduledTaskDto } from './dto/create-scheduled-task.dto';
import { ScheduledTask } from './entities/scheduled-task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ScheduledTaskService {
  constructor(
    @InjectRepository(ScheduledTask)
    private readonly scheduledTaskRepository: Repository<ScheduledTask>,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  handleCron() {
    console.log('checking all tasks to see if they are due');

    const now = new Date();
    this.scheduledTaskRepository
      .find({
        where: {
          dateToComplete: LessThanOrEqual(now),
          status: 'pending',
        },
      })
      .then((tasks) => {
        tasks.forEach((task) => {
          console.log('task is due:', task);
          this.emailService.sendEmail({
            to: task.emailToNotify,
            subject: 'Task Reminder',
            text: `This is a reminder for the task: ${task.taskName}`,
          });
          this.completed(task.id);
        });
      });
  }

  create(
    createScheduledTaskDto: CreateScheduledTaskDto,
  ): Promise<ScheduledTask> {
    const scheduledTask = this.scheduledTaskRepository.create(
      createScheduledTaskDto,
    );
    return this.scheduledTaskRepository.save(scheduledTask);
  }

  findAllPending(): Promise<ScheduledTask[]> {
    return this.scheduledTaskRepository.find({ where: { status: 'pending' } });
  }

  findOne(id: number): Promise<ScheduledTask> {
    return this.scheduledTaskRepository.findOne({ where: { id } });
  }

  //this will force the cron to execute this task next time it runs.
  forceStart(id: number) {
    return this.scheduledTaskRepository.update(id, {
      dateToComplete: new Date(),
    });
  }

  completed(id: number) {
    return this.scheduledTaskRepository.update(id, { status: 'completed' });
  }
}
