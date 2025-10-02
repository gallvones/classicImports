import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../schemas/users/users.service';
export declare class AuthService {
    private users;
    private jwt;
    constructor(users: UsersService, jwt: JwtService);
    loginLocal(email: string, password: string): Promise<{
        token: string;
        user: import("../schemas/users/user.schema").User;
    }>;
}
