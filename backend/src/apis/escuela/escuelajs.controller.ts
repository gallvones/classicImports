import { Controller, Get } from '@nestjs/common';
import { EscuelajsService } from './escuelajs.service';

@Controller('escuelajs')
export class EscuelajsController {
  constructor(private readonly escuelajsService: EscuelajsService) {}

  @Get('products')
  async getProducts() {
    return this.escuelajsService.getProducts();
  }
}
