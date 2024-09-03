import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Topic } from './topic.entity';

@Entity()
export class Repo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.repos, { createForeignKeyConstraints: false })
  @JoinColumn()
  user: User;

  @OneToMany(() => Topic, (topic) => topic.repo, { cascade: true, createForeignKeyConstraints: false })
  topics: Topic[];
}
