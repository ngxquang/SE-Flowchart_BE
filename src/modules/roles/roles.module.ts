import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Group } from 'src/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Group])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
