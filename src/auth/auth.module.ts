import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfig } from '../config/auth.config';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const authConfig = configService.get<AuthConfig>('auth');
        return {
          secret: authConfig.jwt.secretKey,
          signOptions: {
            expiresIn: authConfig.jwt.expirationTime,
          },
        };
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
