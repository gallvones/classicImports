import { FakeStoreService } from './fakestore.service';
export declare class FakeStoreController {
    private readonly fakeStoreService;
    constructor(fakeStoreService: FakeStoreService);
    getProducts(): Promise<any>;
}
