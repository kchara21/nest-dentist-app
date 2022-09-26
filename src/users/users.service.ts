import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../auth/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const { name, password, ci, role: roleName } = user;
    const passwordSalt = await genSalt();
    const passwordHash = await hash(password, passwordSalt);
    const role: Role = roleName ? roleName : Role.User;
    const userExist = await this.userRepo.findOneBy({ ci });

    if (userExist) {
      throw new ConflictException(
        `The user ${name} with ci ${ci}, already exist`,
      );
    }
    const newUser = await this.userRepo.save({
      ...user,
      role,
      password: passwordHash,
    });

    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByCi(ci: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ ci });
    if (!user) throw new NotFoundException(`User with ci "${ci}" not found`);
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
