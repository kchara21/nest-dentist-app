import { UserReponse } from '../dto/response-user.dto';
import { User } from '../entities/user.entity';
export class UsersMapper {
  static toUserResponse(userResponse: User): UserReponse {
    return new UserReponse({
      id: userResponse.id,
      ci: userResponse.ci,
      name: userResponse.name,
      phone: userResponse.phone,
      role: userResponse.role,
    });
  }
}
