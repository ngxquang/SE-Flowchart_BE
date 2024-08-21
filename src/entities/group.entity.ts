import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;

  @OneToMany(() => User, (user) => user.group)
  users: User[];

  // @ManyToMany(() => Role, (role) => role.groups)
  // @JoinTable({ name: 'Role_Group' })
  // roles: Role[];
}
