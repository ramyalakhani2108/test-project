import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './providers/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([Tasks])],
  exports: [TasksService],
})
export class TasksModule {}
