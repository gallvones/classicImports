import { Controller, Get } from '@nestjs/common';
import { DummyJsonService } from './dummyjson.service';

@Controller('dummyjson')
export class DummyJsonController {
  constructor(private readonly dummyJsonService: DummyJsonService) {}

  @Get('products')
  async getProducts() {
    return this.dummyJsonService.getProducts();
  }
}
