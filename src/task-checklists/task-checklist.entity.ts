import { Tasks } from 'src/tasks/tasks.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskChecklists {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tasks, (task) => task.taskChecklists)
  task: Tasks;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  item: string;
}
