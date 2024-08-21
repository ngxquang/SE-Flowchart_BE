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

  @ManyToOne(() => User, (user) => user.repos)
  @JoinColumn()
  user: number;

  @OneToMany(() => Topic, (topic) => topic.repo)
  topics: Topic[];
}
