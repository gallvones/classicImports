
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createFromGoogle(email: string, name?: string): Promise<User> {
    const existing = await this.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email já cadastrado. Use login por e-mail e senha.');
    }
    return this.userModel.create({
      email,
      provider: 'google',
      name,
    });
  }

  async validateLocalLogin(email: string, plainPassword: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).select('+password').exec();
    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
  
    const ok = await bcrypt.compare(plainPassword, user.password);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas.');
  
    return user; 
  }

 
  async updateSaldo(email: string, amount: number): Promise<User | null> {
    // Arredonda o valor a ser incrementado para 2 casas decimais
    const roundedAmount = Number(amount.toFixed(2));

    const user = await this.userModel.findOneAndUpdate(
      { email },
      { $inc: { saldoK: roundedAmount } },
      { new: true }
    ).exec();

    if (user) {
      // Força arredondamento no saldo final
      user.saldoK = Number(user.saldoK.toFixed(2));
      await user.save();
    }

    return user;
  }
}
