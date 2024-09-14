import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LessonType } from './lesson_type.entity';
import { LessonGroup } from './lesson_group.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ length: 1 })
  status: string;

  @Column({ type: 'text', nullable: true })
  urlMd: string;

  @Column({ type: 'text', nullable: true })
  flowChart: string;

  @Column({ length: 1 })
  statusFlowChart: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => LessonGroup, (lessonGroup) => lessonGroup.lessons, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  lessonGroup: LessonGroup;

  @ManyToOne(() => LessonType, (lessonType) => lessonType.lessons, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  lessonType: LessonType;
}
