import { JwtPayloadInterface } from '../interfaces/jwtPayload.interface';

export class JwtPayload implements JwtPayloadInterface {
  sub: number;
}
