import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Lesson } from './lesson.entity';
  import { Topic } from './topic.entity';
  
  @Entity()
  export class LessonGroup {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    name: string;
  
    @ManyToOne(() => Topic, (topic) => topic.lessonGroups, { createForeignKeyConstraints: false })
    @JoinColumn()
    topic: Topic;
  
    @OneToMany(() => Lesson, (lesson) => lesson.lessonGroup, { cascade: true, createForeignKeyConstraints: false })
    lessons: Lesson[];
  }
  