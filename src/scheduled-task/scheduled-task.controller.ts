import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ScheduledTaskService } from './scheduled-task.service';
import { CreateScheduledTaskDto } from './dto/create-scheduled-task.dto';

@Controller('scheduled-task')
export class ScheduledTaskController {
  constructor(private readonly scheduledTaskService: ScheduledTaskService) {}

  @Post()
  create(@Body() createScheduledTaskDto: CreateScheduledTaskDto) {
    return this.scheduledTaskService.create(createScheduledTaskDto);
  }

  @Get()
  findAllPending() {
    return this.scheduledTaskService.findAllPending();
  }

  @Get('/run-manual/:id')
  runManual(@Param('id') id: string) {
    return this.scheduledTaskService.forceStart(+id);
  }

  @Get(':id')
  checkState(@Param('id') id: string) {
    return this.scheduledTaskService.findOne(+id);
  }
}
