import { JwtService } from '@nestjs/jwt';
import { Rol } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private getTokens;
    register(nombre: string, email: string, password: string, rol: Rol): Promise<{
        nombre: string;
        email: string;
        rol: import(".prisma/client").$Enums.Rol;
        direccion: string | null;
        telefono: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(email: string, pass: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
