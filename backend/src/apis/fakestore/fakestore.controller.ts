import { Controller, Get } from '@nestjs/common';
import { FakeStoreService } from './fakestore.service';

@Controller('fakestore')
export class FakeStoreController {
  constructor(private readonly fakeStoreService: FakeStoreService) {}

  @Get('products')
  async getProducts() {
    return this.fakeStoreService.getProducts();
  }
}
