import { EscuelajsService } from './escuelajs.service';
export declare class EscuelajsController {
    private readonly escuelajsService;
    constructor(escuelajsService: EscuelajsService);
    getProducts(): Promise<any>;
}
