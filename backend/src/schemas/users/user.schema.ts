
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop()
  password?: string; // apenas para usuários que utilizam o login padrão(sem google)

  @Prop({ enum: ['local', 'google'], default: 'local' })
  provider: 'local' | 'google';

  @Prop({ type: Number, default: 0, min: 0 })
  saldoK: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

