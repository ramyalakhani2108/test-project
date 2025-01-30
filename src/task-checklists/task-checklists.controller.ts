import { Body, Controller, Post } from '@nestjs/common';
import { TaskChecklistsService } from './providers/task-checklists.service';
import { CreateTaskChecklistsDto } from './dtos/create-taskchecklists.dto';

@Controller('task-checklists')
export class TaskChecklistsController {
  constructor(
    /**
     * Injcting task checklist service
     */
    private readonly taskChecklistsService: TaskChecklistsService,
  ) {}

  @Post()
  public async createTaskChecklist(@Body() checklist: CreateTaskChecklistsDto) {
    return await this.taskChecklistsService.createTaskChecklist(checklist);
  }
}
