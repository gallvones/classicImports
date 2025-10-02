import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EscuelajsController } from './escuelajs.controller';
import { EscuelajsService } from './escuelajs.service';

@Module({
  imports: [HttpModule],
  controllers: [EscuelajsController],
  providers: [EscuelajsService],
})
export class EscuelajsModule {}
