import { Module } from '@nestjs/common';
import { TaskChecklistsController } from './task-checklists.controller';
import { TaskChecklistsService } from './providers/task-checklists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskChecklists } from './task-checklist.entity';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  controllers: [TaskChecklistsController],
  providers: [TaskChecklistsService],
  imports: [TypeOrmModule.forFeature([TaskChecklists]), TasksModule],
})
export class TaskChecklistsModule {}
