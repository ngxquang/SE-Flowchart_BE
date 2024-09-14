import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { Group } from 'src/entities/group.entity';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    const queryRunner = this.dataSource.createQueryRunner('master');
    await queryRunner.connect();

    try {
      const result = await queryRunner.query(
        `SELECT COUNT(*) as count FROM user`,
      );

      console.log('Check du lieu', result);
      const count = parseInt(result[0].count, 10);

      if (count === 0) {
        console.log('result[0].count: ', count);
        console.log('Bang chua co du lieu tien hanh insert du lieu moi: ');
        const sql = readFileSync(
          join('/src/app/src', 'dump', 'dump.sql'),
          'utf8',
        );
        const statements = sql.split(';').filter((stmt) => stmt.trim() !== '');

        for (const statement of statements) {
          await queryRunner.query(statement);
        }
      }
    } catch (error) {
      console.error('Error executing seed SQL:', error);
    } finally {
      await queryRunner.release();
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
