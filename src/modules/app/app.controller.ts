import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../common/guards/local_auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any): any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
