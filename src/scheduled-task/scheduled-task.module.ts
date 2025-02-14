import { Module } from '@nestjs/common';
import { ScheduledTaskService } from './scheduled-task.service';
import { ScheduledTaskController } from './scheduled-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledTask } from './entities/scheduled-task.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduledTask]), EmailModule],
  controllers: [ScheduledTaskController],
  providers: [ScheduledTaskService],
  exports: [ScheduledTaskService],
})
export class ScheduledTaskModule {}
