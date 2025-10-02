import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EscuelajsService {
  // Limite ajustável; dá pra paginar via offset/limit
  private readonly baseUrl = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=20';

  constructor(private readonly http: HttpService) {}

  async getProducts() {
    const { data } = await firstValueFrom(this.http.get(this.baseUrl));

    // Normaliza para seu CardProduct1 (title, price, img, img2)
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      img: Array.isArray(item.images) && item.images.length ? item.images[0] : null,
      img2:
        Array.isArray(item.images) && item.images.length > 1
          ? item.images[1]
          : (Array.isArray(item.images) && item.images.length ? item.images[0] : null),
      permalink: `https://api.escuelajs.co/api/v1/products/${item.id}`, // opcional
    }));
  }
}
