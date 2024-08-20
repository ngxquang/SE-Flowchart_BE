import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Parameter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  dataType: string;
}
