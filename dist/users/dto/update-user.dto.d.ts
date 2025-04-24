import { Rol } from '@prisma/client';
export declare class UpdateUserDto {
    readonly nombre?: string;
    readonly email?: string;
    readonly password?: string;
    rol: Rol;
    readonly direccion?: string;
    readonly telefono?: string;
}
