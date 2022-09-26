import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { validateOrReject } from 'class-validator';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginRequest } from '../dto/login-request.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'ci' });
  }

  async validate(ci: string, password: string): Promise<any> {
    const loginRequest = new LoginRequest({ ci, password });
    await validateOrReject(loginRequest);

    //credentials validation
    const user = await this.authService.validateCredentials(ci, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
