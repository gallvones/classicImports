import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FakeStoreService {
  private readonly baseUrl = 'https://fakestoreapi.com/products';

  constructor(private readonly http: HttpService) {}

  async getProducts() {
    const { data } = await firstValueFrom(this.http.get(this.baseUrl));
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      img: item.image,
    }));
  }
}
