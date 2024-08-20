import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [UsersModule, AuthModule, GroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
