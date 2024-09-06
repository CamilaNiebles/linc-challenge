import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { CreateUserDto } from './dtos/create.user.dto';
import { OpenAiData } from './datasources/openAi.data';
import { chatDto } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly openAiData: OpenAiData,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async getOpenAiData(data: chatDto) {
    return this.openAiData.makeRequest(data);
  }
}
