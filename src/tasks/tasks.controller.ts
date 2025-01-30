import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './providers/tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    /**
     * Injecting task service
     */
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  public async createTask(@Body() task: CreateTaskDto) {
    return await this.tasksService.createTask(task);
  }

  @Get()
  public async getAllTasks() {
    return await this.tasksService.getAll();
  }
}
