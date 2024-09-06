import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'; // Para el hashing de contraseñas
import { CreateUserDto } from 'src/users/dtos/create.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user: User = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(user.password, pass))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest as User;
    }
    return null;
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = this.userService.createUser(createUserDto);
    return this.signIn(user);
  }

  async signIn(user: any) {
    const payload = { username: user.email };
    await this.validateUser(user.email, user.password);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
