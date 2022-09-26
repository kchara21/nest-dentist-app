import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfig } from 'src/config/auth.config';
import { UsersService } from '../../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtPayloadInterface } from '../interfaces/jwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    const secretKey = configService.get<AuthConfig>('auth');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey.jwt.secretKey,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    const userLogged = await this.usersService.findOneById(payload.sub);
    if (!userLogged) {
      console.log('asdsadsa');
      throw new InternalServerErrorException(
        'An error has ocurred. Could not get user owner of the access token.',
      );
    }
    return userLogged;
  }
}
