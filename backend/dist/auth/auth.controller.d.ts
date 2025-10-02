import { UsersService } from '../schemas/users/users.service';
export declare class AuthController {
    private readonly users;
    constructor(users: UsersService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        user: any;
    }>;
    loginGoogle(body: {
        email: string;
        name?: string;
    }): Promise<{
        user: any;
    }>;
}
