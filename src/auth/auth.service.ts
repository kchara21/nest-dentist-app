import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthConfig } from 'src/config/auth.config';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly config: AuthConfig =
    this.configService.get<AuthConfig>('auth');

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
    };
    return { accesToken: this.jwtService.sign(payload), user };
  }

  async validateCredentials(ci: string, pass: string): Promise<any> | null {
    const user = await this.usersService.findByCi(ci);

    if (!user) {
      return null;
    }

    const passwordMatch = await compare(pass, user.password);
    if (!passwordMatch) {
      this.logger.warn('Invalid credentials');
      return null;
    }
    this.logger.log('Valid credentials');
    const { password, create_at, update_at, ...result } = user;
    return result;
  }
}
