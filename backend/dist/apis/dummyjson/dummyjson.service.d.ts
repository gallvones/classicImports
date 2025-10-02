import { HttpService } from '@nestjs/axios';
export declare class DummyJsonService {
    private readonly http;
    private readonly baseUrl;
    constructor(http: HttpService);
    getProducts(): Promise<any>;
}
