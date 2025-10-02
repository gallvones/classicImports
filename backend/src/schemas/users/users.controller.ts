
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // rota de compra
  @Post(':email/purchase')
  async purchase(
    @Param('email') email: string,
    @Body('amount') amount: number,
  ) {
   
    return this.usersService.updateSaldo(email, -Math.abs(amount));
  }
}
