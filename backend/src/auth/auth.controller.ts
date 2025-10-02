import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { UsersService } from '../schemas/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly users: UsersService) {}

  // Login local com email/senha 
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.users.validateLocalLogin(body.email, body.password);
    // Remova senha antes de devolver
    const { password, ...safeUser } = user as any;
    return { user: safeUser };
  }

  // Fluxo Google: cria o usuário se ainda não existe. Se já existir, erro 409.
  @Post('google')
  async loginGoogle(@Body() body: { email: string; name?: string }) {
    try {
      const created = await this.users.createFromGoogle(body.email, body.name);
      const { password, ...safeUser } = (created as any).toObject();
     return { user: safeUser };

    } catch (e: any) {
      if (e?.status === 409 || e?.code === 11000) {
        throw new ConflictException('Email já cadastrado. Use login por e-mail e senha.');
      }
      throw e;
    }
  }
}
