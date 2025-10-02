import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./user.schema").User[]>;
    findOne(email: string): Promise<import("./user.schema").User | null>;
    purchase(email: string, amount: number): Promise<import("./user.schema").User | null>;
}
