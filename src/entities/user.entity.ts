import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Repo } from './repo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ length: 1 })
  status: string;

  @Column()
  name: string;

  @Column({ length: 1 })
  sex: string;

  @Column({ length: 10, unique: true })
  phone: string;

  @Column()
  address: string;

  @Column()
  birthDate: Date;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Group, (group) => group.users)
  @JoinColumn()
  group: Group;

  @OneToMany(() => Repo, (repo) => repo.user)
  repos: Repo[];
}
