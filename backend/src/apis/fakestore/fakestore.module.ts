import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FakeStoreController } from './fakestore.controller';
import { FakeStoreService } from './fakestore.service';

@Module({
  imports: [HttpModule],
  controllers: [FakeStoreController],
  providers: [FakeStoreService],
})
export class FakeStoreModule {}
