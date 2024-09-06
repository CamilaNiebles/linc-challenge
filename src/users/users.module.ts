import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersRepository } from './user.repository';
import { OpenAiData } from './datasources/openAi.data';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersRepository, OpenAiData],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
