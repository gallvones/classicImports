import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DummyJsonService {
  private readonly baseUrl = 'https://dummyjson.com/products';

  constructor(private readonly http: HttpService) {}

  async getProducts() {
    const { data } = await firstValueFrom(this.http.get(this.baseUrl));
    return data.products.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      img: item.thumbnail,
    }));
  }
}
