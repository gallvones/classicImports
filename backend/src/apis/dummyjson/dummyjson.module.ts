import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DummyJsonController } from './dummyjson.controller';
import { DummyJsonService } from './dummyjson.service';

@Module({
  imports: [HttpModule],
  controllers: [DummyJsonController],
  providers: [DummyJsonService],
})
export class DummyJsonModule {}
