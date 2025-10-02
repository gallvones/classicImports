
import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class AppController {
  @Get()
  getHello() {
    return { message: 'Backend está rodando!' };
  }
}
