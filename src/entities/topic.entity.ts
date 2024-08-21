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

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Repo, (repo) => repo.topics)
  @JoinColumn()
  repo: Repo;

  @OneToMany(() => Lesson, (lesson) => lesson.topic)
  lessons: Lesson[];
}
