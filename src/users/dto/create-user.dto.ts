import {
  IsNotEmpty,
  IsEnum,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';
import { Role } from '../../auth/enums/role.enum';
import { generateValidationMessageByValues } from '../../shared/util';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  readonly ci: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  readonly phone: string;

  @IsOptional()
  @IsEnum(Role, {
    message: generateValidationMessageByValues('role', Object.values(Role)),
  })
  readonly role?: Role;
}
