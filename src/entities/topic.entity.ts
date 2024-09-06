import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Repo } from './repo.entity';
import { Lesson } from './lesson.entity';
import { LessonGroup } from './lesson_group.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Repo, (repo) => repo.topics)
  @JoinColumn()
  repo: Repo;

  @OneToMany(() => LessonGroup, (lessonGroup) => lessonGroup.topic)
  lessonGroups: LessonGroup[];
}
