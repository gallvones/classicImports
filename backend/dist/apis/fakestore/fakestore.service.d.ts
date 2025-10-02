import { HttpService } from '@nestjs/axios';
export declare class FakeStoreService {
    private readonly http;
    private readonly baseUrl;
    constructor(http: HttpService);
    getProducts(): Promise<any>;
}
