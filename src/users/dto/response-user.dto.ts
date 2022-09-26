import { UserInterface } from '../interfaces/user.interface';
import { Role } from '../../auth/enums/role.enum';

export class UserReponse implements UserInterface {
  readonly id: number;
  readonly ci: string;
  readonly name: string;
  readonly phone: string;
  readonly role: string;

  constructor(dto: UserReponse) {
    Object.assign(this, dto);
  }
}
