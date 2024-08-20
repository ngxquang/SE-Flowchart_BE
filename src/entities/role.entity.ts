import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';

export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  url: string;

  @Column({ length: 45 })
  description: string;

  @ManyToMany(() => Group, (group) => group.roles)
  groups: Group[];
}
