import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findBy({ email });
      return user.shift();
    } catch (error) {
      console.log(error);
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      email: username,
      password: hashedPassword,
    } as User;
    try {
      const user = await this.userRepository.save(newUser);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
