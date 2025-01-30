import { TaskChecklists } from 'src/task-checklists/task-checklist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @OneToMany(() => TaskChecklists, (taskChecklists) => taskChecklists.task)
  taskChecklists: TaskChecklists[];
}
