import { Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }
}
