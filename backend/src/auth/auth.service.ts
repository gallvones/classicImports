// src/modules/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../schemas/users/users.service';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async loginLocal(email: string, password: string) {
    const user = await this.users.validateLocalLogin(email, password);
    const token = await this.jwt.signAsync({ sub: (user as any)._id, email: user.email });
    return { token, user };
  }
}
