import { DummyJsonService } from './dummyjson.service';
export declare class DummyJsonController {
    private readonly dummyJsonService;
    constructor(dummyJsonService: DummyJsonService);
    getProducts(): Promise<any>;
}
