import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from './topic.entity';
import { LessonType } from './lesson_type';

export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ length: 1 })
  image: string;

  @Column()
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

  @ManyToOne(() => Topic, (topic) => topic.lessons)
  @JoinColumn()
  topic: Topic;

  @ManyToOne(() => LessonType, (lessonType) => lessonType.lessons)
  @JoinColumn()
  lessonType: LessonType;
}
