import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    createFromGoogle(email: string, name?: string): Promise<User>;
    validateLocalLogin(email: string, plainPassword: string): Promise<User>;
    updateSaldo(email: string, amount: number): Promise<User | null>;
}
