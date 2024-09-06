import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from './topic.entity';
import { LessonType } from './lesson_type.entity';
import { LessonGroup } from './lesson_group.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ length: 1 })
  status: string;

  @Column({ type: 'text' })
  urlMd: string;

  @Column({ type: 'text' })
  flowChart: string;

  @Column({ length: 1 })
  statusFlowChart: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => LessonGroup, (lessonGroup) => lessonGroup.lessons)
  @JoinColumn()
  lessonGroup: LessonGroup;

  @ManyToOne(() => LessonType, (lessonType) => lessonType.lessons)
  @JoinColumn()
  lessonType: LessonType;
}
