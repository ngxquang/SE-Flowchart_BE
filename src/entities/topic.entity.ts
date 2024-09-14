import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Repo } from './repo.entity';
import { LessonGroup } from './lesson_group.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Repo, (repo) => repo.topics, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  repo: Repo;

  @OneToMany(() => LessonGroup, (lessonGroup) => lessonGroup.topic, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  lessonGroups: LessonGroup[];
}
