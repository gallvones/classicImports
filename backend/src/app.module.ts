import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database.module';
import { UsersModule } from 'src/schemas/users/users.module';
import { AuthModule } from './auth/auth.module';
import { FakeStoreModule } from './apis/fakestore/fakestore.module';
import { DummyJsonModule } from './apis/dummyjson/dummyjson.module';
import { EscuelajsModule } from './apis/escuela/escuelajs.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule, 
    UsersModule,
    AuthModule,
    FakeStoreModule,
    DummyJsonModule,
    EscuelajsModule
    
  ],
})
export class AppModule {}

