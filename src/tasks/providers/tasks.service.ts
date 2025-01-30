import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from '../tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    /**
     * Injecting task repository
     */
    @InjectRepository(Tasks)
    private readonly tasksRepo: Repository<Tasks>,
  ) {}

  public async createTask(task: CreateTaskDto): Promise<CreateTaskDto> {
    let newTask: CreateTaskDto | null = null;
    try {
      newTask = await this.tasksRepo.findOneBy({ title: task.title });
    } catch (error) {
      throw new RequestTimeoutException('Something went wrong', {
        cause: error,
      });
    }

    if (newTask) {
      throw new BadRequestException('Task already exists');
    }

    newTask = this.tasksRepo.create(task);
    try {
      await this.tasksRepo.save(newTask);
    } catch {
      throw new BadRequestException('Task already exists');
    }

    return newTask;
  }

  public async getOneById(id: number): Promise<Tasks> {
    let task: Tasks | null = null;
    try {
      task = await this.tasksRepo.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException('Something went wrong', {
        cause: error,
      });
    }

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    return task;
  }

  public async getAll(): Promise<Tasks[]> {
    let tasks: Tasks[] = [];
    try {
      tasks = await this.tasksRepo.find({
        relations: {
          taskChecklists: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('Something went wrong', {
        cause: error,
      });
    }

    return tasks;
  }
}
