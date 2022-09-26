import { IsNotEmpty, IsString } from 'class-validator';
import { LoginRequestInterface } from '../interfaces/loginRequest.interface';

export class LoginRequest implements LoginRequestInterface {
  @IsString()
  @IsNotEmpty()
  readonly ci: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  constructor(partial: Partial<LoginRequest>) {
    Object.assign(this, partial);
  }
}
