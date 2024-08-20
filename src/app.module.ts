import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TopicsModule } from './topics/topics.module';
import { RolesModule } from './roles/roles.module';
import { ReposModule } from './repos/repos.module';
import { LessonsModule } from './lessons/lessons.module';
import { LessonTypesModule } from './lesson_types/lesson_types.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    GroupsModule,
    LessonTypesModule,
    LessonsModule,
    ReposModule,
    RolesModule,
    TopicsModule,
    TopicsModule,
    RolesModule,
    ReposModule,
    LessonsModule,
    LessonTypesModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
