import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskChecklists } from '../task-checklist.entity';
import { Repository } from 'typeorm';
import { CreateTaskChecklistsDto } from '../dtos/create-taskchecklists.dto';
import { Tasks } from 'src/tasks/tasks.entity';
import { TasksService } from 'src/tasks/providers/tasks.service';

@Injectable()
export class TaskChecklistsService {
  constructor(
    /**
     * Injecting the task checklists repository
     */
    @InjectRepository(TaskChecklists)
    private readonly taskChecklistsRepo: Repository<TaskChecklists>,

    /**
     * Injecting task Service
     */
    private readonly tasksService: TasksService,
  ) {}

  public async createTaskChecklist(checklist: CreateTaskChecklistsDto) {
    let task: Tasks | null = null;
    let checklists: TaskChecklists | null = null;

    try {
      task = await this.tasksService.getOneById(checklist.taskId);
    } catch (error) {
      throw new RequestTimeoutException('Something went wrong', {
        cause: error,
      });
    }

    if (!task) {
      throw new BadRequestException('Task Does not exists');
    }

    try {
      checklists = await this.taskChecklistsRepo.findOneBy({
        item: checklist.item,
      });
    } catch (error) {
      throw new RequestTimeoutException('Something went wrong', {
        cause: error,
      });
    }

    if (checklists) {
      throw new BadRequestException('Task checklist already exists');
    }

    const newChecklist = this.taskChecklistsRepo.create({
      ...checklist,
      task: task,
    });
    try {
      await this.taskChecklistsRepo.save(newChecklist);
    } catch (error) {
      throw new RequestTimeoutException('Something went wrong', {
        cause: error,
      });
    }

    return newChecklist;
  }
}
