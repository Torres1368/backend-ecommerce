import { Rol } from '@prisma/client';
import { RefreshDto } from './refresh.dto';
import { LoginDto } from './login.dto';
import { AuthService } from '../auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(nombre: string, email: string, password: string, rol: Rol): Promise<{
        id: string;
        nombre: string;
        email: string;
        rol: import(".prisma/client").$Enums.Rol;
        direccion: string | null;
        telefono: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(dto: RefreshDto): Promise<{
        accessToken: string;
    }>;
}
